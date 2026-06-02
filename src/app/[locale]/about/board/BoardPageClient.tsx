'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CircleDot } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface CMSDirector {
  id: string;
  username: string;
  fullName: string;
  role: string;
  image: string | null;
  bio: string;
}

interface Props {
  directors: CMSDirector[];
  viewPortfolioLabel: string;
}

export default function BoardPageClient({ directors, viewPortfolioLabel }: Props) {
  if (directors.length === 0) return null;

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {directors.map((director, idx) => (
        <motion.div
          key={director.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          whileHover={{ y: -10 }}
          className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30"
        >
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
              {director.image ? (
                <img
                  src={director.image}
                  alt={director.fullName}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] flex items-center justify-center">
                  <span className="text-5xl font-black text-white">
                    {director.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
                {director.fullName}
              </h3>
              <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-widest leading-tight">
                {director.role}
              </p>
            </div>
          </div>

          {director.bio && (
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed text-justify mb-6 font-medium">
              {director.bio.length > 300 ? `${director.bio.slice(0, 297)}…` : director.bio}
            </p>
          )}

          {/* Decorative teal accent */}
          <div className="flex items-center gap-2 mb-6">
            <CircleDot className="w-4 h-4 text-[#3A9B9B] shrink-0" />
            <span className="text-zinc-500 dark:text-zinc-500 font-bold text-sm">
              Board of Directors — BanavatNest
            </span>
          </div>

          <Link
            href={`/directors/${director.username}`}
            className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-lg hover:text-[#2a7676] transition-colors group"
          >
            {viewPortfolioLabel}{' '}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
