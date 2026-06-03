'use client';

import { Plus, Trash2, Layout } from 'lucide-react';
import type { BoardPreview } from '@/lib/portfolio-types';

interface Props {
  data: BoardPreview;
  onChange: (updates: BoardPreview) => void;
}

export default function BoardPreviewSection({ data, onChange }: Props) {
  function updateField<K extends keyof BoardPreview>(key: K, value: BoardPreview[K]) {
    onChange({ ...data, [key]: value });
  }

  function updateAchievement(idx: number, value: string) {
    const updated = [...data.achievements];
    updated[idx] = value;
    onChange({ ...data, achievements: updated });
  }

  function addAchievement() {
    onChange({ ...data, achievements: [...data.achievements, ''] });
  }

  function removeAchievement(idx: number) {
    onChange({ ...data, achievements: data.achievements.filter((_, i) => i !== idx) });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
          Board Preview
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Content displayed on the public <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">/about/board</code> page card.
        </p>
      </div>

      {/* Preview hint */}
      <div className="flex items-start gap-3 bg-[#3A9B9B]/5 border border-[#3A9B9B]/20 rounded-2xl px-5 py-4">
        <Layout className="w-4 h-4 text-[#3A9B9B] shrink-0 mt-0.5" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
          This data is shown <strong>separately</strong> from your full biography. Keep the short bio to 2–3 sentences and add up to 5 key achievements.
        </p>
      </div>

      {/* Board Role */}
      <div>
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          Board Role Title
          <span className="ml-2 text-zinc-400 font-normal">(shown in teal on the board card)</span>
        </label>
        <input
          type="text"
          value={data.boardRole}
          onChange={(e) => updateField('boardRole', e.target.value)}
          placeholder="CO-FOUNDER & DIRECTOR (RESEARCH & STRATEGY)"
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
        />
      </div>

      {/* Short Bio */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Short Bio
            <span className="ml-2 text-zinc-400 font-normal">(2–3 sentences, shown on the board page)</span>
          </label>
          <span className="text-xs text-zinc-400 font-medium">{data.shortBio.length} chars</span>
        </div>
        <textarea
          value={data.shortBio}
          onChange={(e) => updateField('shortBio', e.target.value)}
          rows={4}
          placeholder="Experienced academic and researcher with over 8 years in higher education..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors resize-y leading-relaxed"
        />
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Achievement Bullets
            <span className="ml-2 text-zinc-400 font-normal">(key highlights shown as bullet points)</span>
          </label>
          <button
            type="button"
            onClick={addAchievement}
            disabled={data.achievements.length >= 5}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A9B9B] hover:text-[#2a7676] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="space-y-3">
          {data.achievements.map((ach, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {/* Circle dot indicator */}
              <div className="w-5 h-5 rounded-full border-2 border-[#3A9B9B] flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#3A9B9B]" />
              </div>
              <input
                type="text"
                value={ach}
                onChange={(e) => updateAchievement(idx, e.target.value)}
                placeholder={`Achievement ${idx + 1}`}
                className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
              />
              {data.achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAchievement(idx)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-2">Up to 5 achievements. These appear with ◎ bullet icons on the board page.</p>
      </div>

      {/* Live preview */}
      <div>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Live Preview</p>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 bg-white dark:bg-zinc-900/50">
          {data.boardRole && (
            <p className="text-[#3A9B9B] font-bold text-xs uppercase tracking-widest mb-3">{data.boardRole}</p>
          )}
          {data.shortBio ? (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">{data.shortBio}</p>
          ) : (
            <p className="text-zinc-300 dark:text-zinc-600 text-sm italic mb-4">Short bio will appear here…</p>
          )}
          {data.achievements.filter(Boolean).length > 0 && (
            <ul className="space-y-2">
              {data.achievements.filter(Boolean).map((ach, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-zinc-500 font-semibold">
                  <span className="w-4 h-4 rounded-full border-2 border-[#3A9B9B] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B]" />
                  </span>
                  {ach}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
