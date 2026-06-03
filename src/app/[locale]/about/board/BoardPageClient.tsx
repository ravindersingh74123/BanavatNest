'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CircleDot } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface BoardPreview {
  shortBio: string;
  boardRole: string;
  achievements: string[];
}

interface CMSDirector {
  id: string;
  username: string;
  fullName: string;
  role: string;
  image: string | null;
  bio: string;
  tag?: string;
  priorityValue?: number;
  boardPreview?: BoardPreview | null;
}

interface Props {
  directors: CMSDirector[];
  viewPortfolioLabel: string;
  sectionLabel?: string;
}

export default function BoardPageClient({ directors, viewPortfolioLabel, sectionLabel }: Props) {
  if (directors.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      {directors.map((director, idx) => {
        const bp = director.boardPreview;
        const displayBio = bp?.shortBio || director.bio;
        const boardRole = bp?.boardRole || sectionLabel || director.tag || 'Board of Directors';
        const achievements = bp?.achievements?.filter(Boolean) ?? [];

        return (
          <motion.div
            key={director.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white dark:bg-zinc-900/60 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30 transition-all duration-300"
          >
            {/* ── Top: Photo + Name/Edu/Role ── */}
            <div className="flex items-start gap-6 mb-7">
              {/* Photo */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-zinc-700 shrink-0">
                {director.image ? (
                  <img
                    src={director.image}
                    alt={director.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] flex items-center justify-center">
                    <span className="text-4xl font-black text-white">
                      {director.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name + Edu + Role */}
              <div className="flex-1 pt-1">
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-0.5">
                  {director.fullName}
                </h3>
                {director.role && (
                  <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm mb-2">
                    {director.role}
                  </p>
                )}
                <p className="text-[#3A9B9B] font-bold text-xs uppercase tracking-widest leading-snug">
                  {boardRole}
                </p>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />

            {/* ── Short Bio ── */}
            {displayBio && (
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed text-justify mb-6 font-medium">
                {displayBio.length > 280 ? `${displayBio.slice(0, 277)}…` : displayBio}
              </p>
            )}

            {/* ── Achievement Bullets ── */}
            {achievements.length > 0 && (
              <ul className="space-y-2.5 mb-7">
                {achievements.map((ach, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-500 font-semibold text-sm">
                    <CircleDot className="w-4 h-4 text-[#3A9B9B] shrink-0" />
                    {ach}
                  </li>
                ))}
              </ul>
            )}

            {/* ── View Portfolio ── */}
            <Link
              href={`/about/board/${director.username}`}
              className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-base hover:text-[#2a7676] transition-colors group"
            >
              {viewPortfolioLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
