'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PortfolioData } from '@/lib/portfolio-types';
import { emptyPortfolio } from '@/lib/portfolio-types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UsePortfolioEditorReturn {
  portfolio: PortfolioData;
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioData>>;
  updateSection: <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => void;
  isDirty: boolean;
  saveStatus: SaveStatus;
  portfolioStatus: 'draft' | 'published';
  currentVersion: number;
  userId: string;
  saveDraft: () => Promise<void>;
  publishPortfolio: () => Promise<{ success: boolean; errors?: string[] }>;
  loading: boolean;
}

export function usePortfolioEditor(userId: string): UsePortfolioEditorReturn {
  const [portfolio, setPortfolio] = useState<PortfolioData>(emptyPortfolio(userId));
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [portfolioStatus, setPortfolioStatus] = useState<'draft' | 'published'>('draft');
  const [currentVersion, setCurrentVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  // Load portfolio on mount
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/cms/directors/${userId}/portfolio`)
      .then((r) => r.json())
      .then((data) => {
        if (data.portfolioData) {
          setPortfolio(data.portfolioData);
          setPortfolioStatus(data.status || 'draft');
          setCurrentVersion(data.currentVersion || 0);
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        isFirstLoad.current = false;
      });
  }, [userId]);

  // Mark dirty when portfolio changes (skip first load)
  useEffect(() => {
    if (isFirstLoad.current) return;
    setIsDirty(true);
  }, [portfolio]);

  // Auto-save debounce (2 seconds after last change)
  useEffect(() => {
    if (!isDirty || loading) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveDraft();
    }, 2000);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio, isDirty]);

  const updateSection = useCallback(
    <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => {
      setPortfolio((prev) => ({ ...prev, [section]: value }));
    },
    []
  );

  const saveDraft = useCallback(async () => {
    if (!userId) return;
    setSaveStatus('saving');
    try {
      const res = await fetch(`/api/cms/directors/${userId}/portfolio`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioData: portfolio }),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setIsDirty(false);
        setPortfolioStatus('draft');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  }, [userId, portfolio]);

  const publishPortfolio = useCallback(async () => {
    if (!userId) return { success: false };
    setSaveStatus('saving');
    try {
      // Save draft first
      await fetch(`/api/cms/directors/${userId}/portfolio`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioData: portfolio }),
      });

      // Then publish
      const res = await fetch(`/api/cms/directors/${userId}/portfolio/publish`, {
        method: 'POST',
      });
      const data = await res.json();

      if (res.ok) {
        setSaveStatus('saved');
        setIsDirty(false);
        setPortfolioStatus('published');
        setCurrentVersion(data.versionNumber);
        setTimeout(() => setSaveStatus('idle'), 2500);
        return { success: true };
      } else {
        setSaveStatus('error');
        return { success: false, errors: data.errors };
      }
    } catch {
      setSaveStatus('error');
      return { success: false };
    }
  }, [userId, portfolio]);

  return {
    portfolio,
    setPortfolio,
    updateSection,
    isDirty,
    saveStatus,
    portfolioStatus,
    currentVersion,
    userId,
    saveDraft,
    publishPortfolio,
    loading,
  };
}
