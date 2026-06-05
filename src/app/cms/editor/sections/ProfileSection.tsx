'use client';

import { useRef } from 'react';
import { Upload, X, User } from 'lucide-react';
import type { PortfolioData } from '@/lib/portfolio-types';

interface Props {
  data: Pick<PortfolioData, 'name' | 'role' | 'image' | 'bio'>;
  onChange: (updates: Partial<Pick<PortfolioData, 'name' | 'role' | 'image' | 'bio'>>) => void;
}

export default function ProfileSection({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onChange({ image: result });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
          Basic Profile
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Public identity — name, role, photo and biography.
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex items-start gap-6">
        <div className="shrink-0">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-28 h-28 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-700 hover:border-[#3A9B9B] overflow-hidden cursor-pointer transition-colors bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center group relative"
          >
            {data.image ? (
              <>
                <img src={data.image} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <User className="w-8 h-8" />
                <span className="text-xs font-medium">Upload</span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          {data.image && (
            <button
              onClick={() => onChange({ image: null })}
              className="mt-2 w-full text-xs text-red-500 font-medium flex items-center justify-center gap-1 hover:text-red-700 transition-colors"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Profile Photo</p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Recommended: square image, at least 400×400px.<br />
            Will be uploaded to Cloudinary on save.
          </p>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Dr. Jane Smith"
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          Role / Title
        </label>
        <input
          type="text"
          value={data.role}
          onChange={(e) => onChange({ role: e.target.value })}
          placeholder="Ph.D. (IIT Patna) · Assistant Professor"
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors"
        />
      </div>

      {/* Biography */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Biography *
          </label>
          <span className="text-xs text-zinc-400 font-medium">{data.bio.length} chars</span>
        </div>
        <textarea
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={10}
          placeholder="Write the director's biography here. Use double line breaks for paragraphs."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#3A9B9B] transition-colors resize-y leading-relaxed"
        />
        <p className="text-xs text-zinc-400 mt-1.5">
          Tip: Use double line breaks (blank line) to create separate paragraphs.
        </p>
      </div>
    </div>
  );
}
