'use client';

import { useState } from 'react';
import { Plus, Trash2, ExternalLink, Phone, Mail } from 'lucide-react';
import type { PortfolioData, AcademicProfile } from '@/lib/portfolio-types';

interface Props {
  contact: PortfolioData['contact'];
  onChange: (contact: PortfolioData['contact']) => void;
}

type ProfileFormat = 'A' | 'B';

const PLATFORM_PRESETS = [
  { name: 'Google Scholar', link: 'https://scholar.google.com/' },
  { name: 'Scopus', link: 'https://www.scopus.com/' },
  { name: 'ORCID', link: 'https://orcid.org/' },
  { name: 'ResearchGate', link: 'https://www.researchgate.net/' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/' },
  { name: 'Web of Science', link: 'https://www.webofscience.com/' },
];

function ProfileRow({
  profile,
  onUpdate,
  onDelete,
}: {
  profile: AcademicProfile;
  onUpdate: (p: AcademicProfile) => void;
  onDelete: () => void;
}) {
  const isFormatA = 'name' in profile;
  const [format, setFormat] = useState<ProfileFormat>(isFormatA ? 'A' : 'B');

  function toggle() {
    if (format === 'A' && 'name' in profile) {
      onUpdate({ platform: profile.name, url: profile.link });
      setFormat('B');
    } else if (format === 'B' && 'platform' in profile) {
      onUpdate({ name: profile.platform, link: profile.url });
      setFormat('A');
    }
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-3 py-2">
      <button
        onClick={toggle}
        title="Toggle format A/B"
        className="shrink-0 text-[10px] font-black text-zinc-400 hover:text-[#3A9B9B] bg-zinc-100 dark:bg-zinc-800 rounded-lg px-1.5 py-0.5 transition-colors"
      >
        {format}
      </button>

      {format === 'A' && 'name' in profile ? (
        <>
          <input
            value={profile.name}
            onChange={(e) => onUpdate({ ...profile, name: e.target.value })}
            placeholder="Platform name"
            className="input text-xs flex-1"
          />
          <input
            value={profile.link}
            onChange={(e) => onUpdate({ ...profile, link: e.target.value })}
            placeholder="https://..."
            className="input text-xs flex-1"
          />
        </>
      ) : 'platform' in profile ? (
        <>
          <input
            value={profile.platform}
            onChange={(e) => onUpdate({ ...profile, platform: e.target.value })}
            placeholder="Platform"
            className="input text-xs flex-1"
          />
          <input
            value={profile.url}
            onChange={(e) => onUpdate({ ...profile, url: e.target.value })}
            placeholder="https://..."
            className="input text-xs flex-1"
          />
        </>
      ) : null}

      {(() => {
        const href = 'link' in profile ? profile.link : profile.url;
        return href ? (
          <a href={href} target="_blank" rel="noopener" className="text-[#3A9B9B] shrink-0">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null;
      })()}

      <button onClick={onDelete} className="text-zinc-400 hover:text-red-500 transition-colors shrink-0">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ContactSection({ contact, onChange }: Props) {
  const [newPhone, setNewPhone] = useState('');

  function addPhone() {
    if (!newPhone.trim()) return;
    onChange({ ...contact, phone: [...contact.phone, newPhone.trim()] });
    setNewPhone('');
  }

  function removePhone(idx: number) {
    onChange({ ...contact, phone: contact.phone.filter((_, i) => i !== idx) });
  }

  function updateProfile(idx: number, profile: AcademicProfile) {
    const profiles = [...contact.profiles];
    profiles[idx] = profile;
    onChange({ ...contact, profiles });
  }

  function removeProfile(idx: number) {
    onChange({ ...contact, profiles: contact.profiles.filter((_, i) => i !== idx) });
  }

  function addPreset(preset: { name: string; link: string }) {
    // Avoid duplicates
    const exists = contact.profiles.some(
      (p) => ('name' in p ? p.name : p.platform) === preset.name
    );
    if (exists) return;
    onChange({ ...contact, profiles: [...contact.profiles, { name: preset.name, link: preset.link }] });
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">Contact</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Email, phone numbers, and academic profiles.</p>
      </div>

      {/* Email */}
      <div>
        <label className="label flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#3A9B9B]" /> Email Address *
        </label>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => onChange({ ...contact, email: e.target.value })}
          placeholder="director@institution.ac.in"
          className="input"
        />
      </div>

      {/* Phone Numbers */}
      <div>
        <label className="label flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#3A9B9B]" /> Phone Numbers
        </label>
        <div className="flex gap-2 mb-3">
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPhone())}
            placeholder="+91 99340 44777"
            className="input text-sm flex-1"
          />
          <button onClick={addPhone} className="btn-teal px-4 rounded-xl text-sm">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {contact.phone.map((num, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-4 py-2.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">{num}</span>
              <button onClick={() => removePhone(idx)} className="text-zinc-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Profiles */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label">Academic Profiles</label>
          <button
            onClick={() => onChange({ ...contact, profiles: [...contact.profiles, { name: '', link: '' }] })}
            className="btn-teal text-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom
          </button>
        </div>

        {/* Quick-add presets */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PLATFORM_PRESETS.map((preset) => {
            const exists = contact.profiles.some(
              (p) => ('name' in p ? p.name : p.platform) === preset.name
            );
            return (
              <button
                key={preset.name}
                onClick={() => addPreset(preset)}
                disabled={exists}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${exists ? 'border-[#3A9B9B] bg-teal-50 dark:bg-teal-900/20 text-[#3A9B9B] cursor-default' : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-[#3A9B9B] hover:text-[#3A9B9B]'}`}
              >
                {exists ? '✓ ' : '+ '}{preset.name}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {contact.profiles.map((profile, idx) => (
            <ProfileRow
              key={idx}
              profile={profile}
              onUpdate={(p) => updateProfile(idx, p)}
              onDelete={() => removeProfile(idx)}
            />
          ))}
        </div>
        {contact.profiles.length > 0 && (
          <p className="text-xs text-zinc-400 mt-2">
            Click the format badge (A/B) to switch between name/link and platform/url formats.
          </p>
        )}
      </div>
    </div>
  );
}
