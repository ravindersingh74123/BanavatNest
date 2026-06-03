'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, FlaskConical, GraduationCap, Phone,
  Save, Eye, Globe, CheckCircle, Clock, AlertCircle,
  LogOut, ChevronRight, Lock, LogIn, X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePortfolioEditor } from '../hooks/usePortfolioEditor';
import ProfileSection from '../sections/ProfileSection';
import JobSection from '../sections/JobSection';
import ResearchSection from '../sections/ResearchSection';
import EducationSection from '../sections/EducationSection';
import ContactSection from '../sections/ContactSection';
import BoardPreviewSection from '../sections/BoardPreviewSection';
import type { PortfolioData } from '@/lib/portfolio-types';

type SectionKey = 'profile' | 'job' | 'research' | 'education' | 'contact' | 'boardPreview';

const SECTIONS: { key: SectionKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'job', label: 'Job History', icon: Briefcase },
  { key: 'research', label: 'Research', icon: FlaskConical },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'contact', label: 'Contact', icon: Phone },
  { key: 'boardPreview', label: 'Board Preview', icon: Globe },
];

interface CurrentUser {
  id: string;
  fullName: string;
  username: string;
  role: string;
}

/* ── Password Gate Modal ── */
function PasswordGateModal({
  username,
  onSuccess,
}: {
  username: string;
  onSuccess: (user: CurrentUser) => void;
}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/cms/auth/director-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }
      onSuccess(data.user);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3A9B9B]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2D3561]/10 blur-[130px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2D3561] shadow-xl mb-6">
            <span className="text-2xl font-black text-white">B</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Banavat<span className="text-[#3A9B9B]">Nest</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-2">
            Director Editor — Enter your password to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl p-8 md:p-10">
          {/* Director badge */}
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium">Signing in as</p>
              <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">@{username}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="director-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-12 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#2D3561] dark:bg-[#3A9B9B] text-white rounded-full font-black py-3.5 text-sm shadow-xl hover:bg-[#1f2545] dark:hover:bg-[#2a7676] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Access Editor
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-8">
          BanavatNest CMS · Internal use only
        </p>
      </motion.div>
    </div>
  );
}

/* ── Save Status Indicator ── */
function SaveStatusIndicator({ status }: { status: string }) {
  if (status === 'idle') return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
        status === 'saving' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' :
        status === 'saved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
        'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
      }`}
    >
      {status === 'saving' && <span className="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />}
      {status === 'saved' && <CheckCircle className="w-3 h-3" />}
      {status === 'error' && <AlertCircle className="w-3 h-3" />}
      {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : 'Save failed'}
    </motion.div>
  );
}

/* ── Publish Error Modal ── */
function PublishErrorModal({ errors, onClose }: { errors: string[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl p-8"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Cannot Publish</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
          Please fix these required fields before publishing:
        </p>
        <ul className="space-y-2">
          {errors.map((e, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" /> {e}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-6 w-full py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
          Got it
        </button>
      </motion.div>
    </div>
  );
}

/* ── Main Editor (same as /cms/editor but uses currentUser from props) ── */
function Editor({ currentUser, onLogout }: { currentUser: CurrentUser; onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<SectionKey>('profile');
  const [publishErrors, setPublishErrors] = useState<string[] | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const {
    portfolio,
    updateSection,
    isDirty,
    saveStatus,
    portfolioStatus,
    currentVersion,
    saveDraft,
    publishPortfolio,
    loading,
  } = usePortfolioEditor(currentUser.id);

  async function handlePublish() {
    const result = await publishPortfolio();
    if (result.success) {
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    } else if (result.errors) {
      setPublishErrors(result.errors);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-zinc-200 dark:border-zinc-700 border-t-[#3A9B9B] rounded-full animate-spin" />
          <p className="text-sm font-medium text-zinc-500">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex flex-col">
      {/* ── Top Navbar ── */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 h-16 flex items-center px-4 sm:px-6 gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#2D3561] flex items-center justify-center shrink-0">
            <span className="text-sm font-black text-white">B</span>
          </div>
          <span className="font-black text-zinc-900 dark:text-zinc-100 hidden sm:block">
            Banavat<span className="text-[#3A9B9B]">Nest</span>
            <span className="text-zinc-400 font-medium"> / Editor</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <AnimatePresence>
            <SaveStatusIndicator status={saveStatus} />
          </AnimatePresence>

          <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${portfolioStatus === 'published' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'}`}>
            {portfolioStatus === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            {portfolioStatus === 'published' ? `v${currentVersion} Published` : 'Draft'}
          </span>

          <a
            href={`/cms/preview/${currentUser.id}`}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-[#3A9B9B] hover:text-[#3A9B9B] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Preview</span>
          </a>

          <button
            onClick={saveDraft}
            disabled={!isDirty || saveStatus === 'saving'}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Save Draft</span>
          </button>

          <motion.button
            onClick={handlePublish}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-full text-white shadow-lg transition-colors ${publishSuccess ? 'bg-emerald-500' : 'bg-[#5BBD4A] dark:bg-[#3A9B9B] hover:bg-[#3a8a2c] dark:hover:bg-[#2a7676]'}`}
          >
            {publishSuccess ? <CheckCircle className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
            <span className="hidden sm:block">{publishSuccess ? 'Published!' : 'Publish'}</span>
          </motion.button>

          <div className="flex items-center gap-2 pl-2 border-l border-zinc-100 dark:border-zinc-800">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] flex items-center justify-center text-white text-xs font-black shrink-0">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <button onClick={onLogout} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* ── Sidebar ── */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeSection === section.key ? 'bg-[#3A9B9B]/10 text-[#3A9B9B]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
                {activeSection === section.key && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-zinc-100 dark:border-zinc-800">
            <a
              href={`/cms/preview/${currentUser.id}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#3A9B9B] transition-colors mb-2"
            >
              <Eye className="w-3.5 h-3.5" /> Preview Portfolio
            </a>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-4xl">
          {/* Mobile section tabs */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar pb-4 mb-6 md:hidden">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeSection === s.key ? 'bg-[#3A9B9B] text-white' : 'bg-white dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'}`}
              >
                <s.icon className="w-3 h-3" /> {s.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 sm:p-10"
            >
              {activeSection === 'profile' && (
                <ProfileSection
                  data={{ name: portfolio.name, role: portfolio.role, image: portfolio.image, bio: portfolio.bio }}
                  onChange={(updates) => {
                    Object.entries(updates).forEach(([k, v]) => {
                      updateSection(k as keyof PortfolioData, v as PortfolioData[keyof PortfolioData]);
                    });
                  }}
                />
              )}
              {activeSection === 'job' && (
                <JobSection job={portfolio.job} onChange={(job) => updateSection('job', job)} />
              )}
              {activeSection === 'research' && (
                <ResearchSection research={portfolio.research} onChange={(research) => updateSection('research', research)} />
              )}
              {activeSection === 'education' && (
                <EducationSection education={portfolio.education} onChange={(education) => updateSection('education', education)} />
              )}
              {activeSection === 'contact' && (
                <ContactSection contact={portfolio.contact} onChange={(contact) => updateSection('contact', contact)} />
              )}
              {activeSection === 'boardPreview' && (
                <BoardPreviewSection
                  data={portfolio.boardPreview ?? { shortBio: '', boardRole: '', achievements: ['', '', ''] }}
                  onChange={(boardPreview) => updateSection('boardPreview', boardPreview)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {publishErrors && (
          <PublishErrorModal errors={publishErrors} onClose={() => setPublishErrors(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page Entry Point ── */
export default function EditorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check if already authenticated as this director
  useEffect(() => {
    fetch('/api/cms/auth/me')
      .then((r) => r.json())
      .then((u) => {
        if (u.id && u.username === username) {
          // Already authenticated as this director
          setCurrentUser(u);
        }
        // If authenticated as a different user or super_admin impersonating — still allow
        else if (u.id && (u.role === 'super_admin' || u.impersonating)) {
          setCurrentUser(u);
        }
        // Not authenticated as this director — show password gate
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, [username]);

  async function handleLogout() {
    await fetch('/api/cms/auth/logout', { method: 'POST' });
    router.push('/cms/login');
  }

  // Still checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-zinc-200 dark:border-zinc-700 border-t-[#3A9B9B] rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated — show password gate
  if (!currentUser) {
    return (
      <PasswordGateModal
        username={username}
        onSuccess={(user) => setCurrentUser(user)}
      />
    );
  }

  // Authenticated — show editor
  return <Editor currentUser={currentUser} onLogout={handleLogout} />;
}
