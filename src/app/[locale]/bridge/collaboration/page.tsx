"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link as LinkIcon,
  ArrowRight,
  GraduationCap,
  Factory,
  Rocket,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import React from "react";

// ── Animated SVG Illustrations ─────────────────────────────────────────────

const AcademicIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-acad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
      <filter id="glow-acad">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g transform="translate(0, -2)">
      {/* Glassy backdrop */}
      <circle cx="50" cy="50" r="36" fill={`url(#grad-acad)`} />

      {/* Orbital ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="4 8"
        opacity="0.3"
      />
      <motion.circle
        cx="50"
        cy="6"
        r="3"
        fill={color}
        filter="url(#glow-acad)"
        animate={{ cx: [50, 94, 50, 6, 50], cy: [6, 50, 94, 50, 6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Stack of books */}
      <rect
        x="28"
        y="55"
        width="28"
        height="6"
        rx="2"
        fill="white"
        className="dark:fill-zinc-900"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      <rect
        x="30"
        y="48"
        width="24"
        height="6"
        rx="2"
        fill="white"
        className="dark:fill-zinc-900"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <rect
        x="32"
        y="41"
        width="20"
        height="6"
        rx="2"
        fill="white"
        className="dark:fill-zinc-900"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.3"
      />

      {/* Floating graduation cap */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M35 35L50 27L65 35L50 43L35 35Z" fill={color} />
        <path
          d="M43 39V46C43 46 46 48 50 48C54 48 57 46 57 46V39"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M65 35V42"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="65" cy="43" r="1.5" fill={color} />
      </motion.g>

      {/* Pulsing knowledge nodes */}
      <motion.circle
        cx="22"
        cy="68"
        r="2.5"
        fill={color}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="76"
        cy="65"
        r="2.5"
        fill={color}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <path
        d="M22 68L76 65"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="3 4"
        opacity="0.4"
      />
    </g>
  </svg>
);

const IndustryCollabIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-ind" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
    </defs>

    <g transform="translate(0, -6)">
      {/* Glassy backdrop */}
      <circle cx="48" cy="50" r="36" fill="url(#grad-ind)" />

      {/* Factory silhouette */}
      <path
        d="M18 68V38L28 48V38L38 48V38L55 48V68H18Z"
        fill="white"
        className="dark:fill-zinc-900"
        fillOpacity="0.85"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="20" y="33" width="10" height="5" fill={color} opacity="0.35" />
      {/* Smokestack puffs */}
      <motion.path
        d="M25 33V22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        strokeDasharray="4 4"
      />

      {/* Rotating gear */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ originX: "73px", originY: "55px" }}
      >
        <circle
          cx="73"
          cy="55"
          r="13"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1.5"
        />
        <circle
          cx="73"
          cy="55"
          r="5"
          fill="white"
          className="dark:fill-zinc-900"
          stroke={color}
          strokeWidth="1.5"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M73 39V43"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 73 55)`}
          />
        ))}
      </motion.g>

      {/* Circuit paths */}
      <path
        d="M55 48H70"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <motion.circle
        cx="55"
        cy="48"
        r="2"
        fill={color}
        animate={{ cx: [55, 70] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <path
        d="M55 58H65"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <motion.circle
        cx="55"
        cy="58"
        r="2"
        fill={color}
        animate={{ cx: [55, 65] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.6,
        }}
      />
    </g>
  </svg>
);

const StartupIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-start" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
      <filter id="glow-start">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g transform="translate(0, 0)">
      {/* Glassy backdrop */}
      <circle cx="50" cy="50" r="36" fill="url(#grad-start)" />

      {/* Launch trajectory arc */}
      <path
        d="M25 80 Q50 30 78 18"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="4 5"
        opacity="0.3"
      />

      {/* Rocket — floats upward on arc */}
      <motion.g
        animate={{ x: [0, 14, 26], y: [0, -22, -38] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      >
        <path
          d="M38 72 L44 52 L50 46 L56 52 L62 72 L50 68 Z"
          fill="white"
          className="dark:fill-zinc-900"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M50 46 L50 34"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse cx="50" cy="34" rx="5" ry="7" fill={color} />
        {/* Wings */}
        <path
          d="M44 62 L38 70"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M56 62 L62 70"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Exhaust flame */}
        <motion.path
          d="M46 72 Q50 80 54 72"
          fill={color}
          fillOpacity="0.6"
          animate={{
            d: [
              "M46 72 Q50 80 54 72",
              "M46 72 Q50 85 54 72",
              "M46 72 Q50 80 54 72",
            ],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      </motion.g>

      {/* Stars / nodes */}
      {[
        [20, 25],
        [75, 30],
        [80, 70],
        [18, 68],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          fill={color}
          filter="url(#glow-start)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.8 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      <path
        d="M20 25L75 30M75 30L80 70M20 25L18 68"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.2"
      />
    </g>
  </svg>
);

import collaboration_logo from "@/../public/images/collabaration_logo.png";

// Illustration map keyed to collaboration track
const ILLUSTRATIONS: Record<string, React.FC<{ color: string }>> = {
  academic: AcademicIllustration,
  industry: IndustryCollabIllustration,
  startup: StartupIllustration,
};

export default function CollaborationPage() {
  const t = useTranslations("collaboration");
  const tCollab = useTranslations("collaborationPage");
  const tHome = useTranslations("home");
  const tName = useTranslations("aboutName");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const collaborationTracks = [
    {
      key: "academic",
      emoji: "🎓",
      icon: GraduationCap,
      color: "#2D3561",
      bg: "bg-[#E5E9F7] dark:bg-[#111936]",
      href: "/bridge/opportunities",
    },
    {
      key: "startup",
      emoji: "🚀",
      icon: Rocket,
      color: "#3A9B9B",
      bg: "bg-[#E8F7F7] dark:bg-[#0d2a2a]",
      href: "/bridge/faculty",
    },
    {
      key: "industry",
      emoji: "🏭",
      icon: Factory,
      color: "#5BBD4A",
      bg: "bg-[#EAF8EA] dark:bg-[#142614]",
      href: "/bridge/partnerships",
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors grid-bg">
        {/* Hero Section */}
        <div className="w-full pt-12">
          <div className="relative w-full">
            <Image
              src="/images/ourEcosystem.jpeg"
              alt="Our Ecosystem"
              width={1920}
              height={800}
              className="w-full pt-8 h-auto object-cover"
              priority
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10"
        >
          {/* Quote text */}
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-zinc-700 dark:text-zinc-200">
            {tCollab("heroQuote")}
          </p>

          {/* Bottom accent */}
          {/* <div className="mt-8 mx-auto w-20 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B]" /> */}
        </motion.div>

        {/* ── Original Hero (commented out) ──
        <header className="bg-white dark:bg-zinc-900/40 pt-32 pb-20 border-b border-gray-100 dark:border-zinc-800 grid-bg mb-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col text-left"
              >
                <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-zinc-100 mb-8 leading-tight tracking-tighter">
                  {t('title')} <span className="text-[#3A9B9B]">{t('titleHighlight')}</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                  {t('subtitle')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="absolute inset-0 bg-[#3A9B9B]/10 blur-[100px] rounded-full" />
                <Image
                  src={collaboration_logo}
                  alt="Collaboration"
                  width={550}
                  height={550}
                  className="relative z-10 transition-all duration-700 drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </header>
        ── End Original Hero ── */}

        {/* Who Can Collaborate Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-zinc-900 dark:text-zinc-100"
            >
              {tCollab("whoCanTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {tCollab("whoCanHighlight")}
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationTracks.map((track, idx) => {
              // Extract items from translations
              // Note: next-intl lists might be tricky if not defined as an array in json
              // But I defined them as objects in an array in en.json
              const items = t.raw(`${track.key}.items`) as {
                heading: string;
                desc: string;
              }[];
              const currentItem = items[activeIndex];
              const Icon = track.icon;

              return (
                <motion.div
                  key={track.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative h-[580px] md:h-[620px]"
                >
                  <Link
                    href={track.href}
                    className="block h-full cursor-pointer"
                  >
                    <motion.div
                      whileHover={{
                        boxShadow: `0 40px 80px -16px ${track.color}40`,
                        y: -8,
                        borderColor: `${track.color}`,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        borderTopColor: track.color,
                        boxShadow: `0 20px 40px -12px ${track.color}20`,
                        borderColor: `${track.color}`,
                      }}
                      className={`relative rounded-3xl md:rounded-[2.5rem] ${track.bg} border border-t-8 p-6 md:p-10 h-full overflow-hidden flex flex-col items-center text-center backdrop-blur-sm shadow-xl`}
                    >
                      {/* Background Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                        style={{
                          background: `radial-gradient(circle at top, ${track.color}15, transparent 70%)`,
                        }}
                      />

                      {/* Header */}
                      <div className="relative z-10 flex flex-col items-center mb-6 w-full">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 mb-4 h-4">
                          {t(`${track.key}.title`)}
                        </span>

                        {/* Animated SVG illustration */}
                        <div className="w-[120px] h-[120px] mb-2 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center -mt-2">
                          {(() => {
                            const Illus = ILLUSTRATIONS[track.key];
                            return Illus ? <Illus color={track.color} /> : null;
                          })()}
                        </div>
                      </div>

                      {/* Rotating Content */}
                      <div className="relative z-10 flex-grow w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${track.key}-${activeIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 min-h-[60px] flex items-center justify-center">
                              {currentItem.heading}
                            </h3>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                              {currentItem.desc}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Explore More CTA */}
                      <div className="relative z-10 mt-8 mb-6 flex items-center justify-center gap-3 group/cta">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 transition-colors group-hover/cta:text-zinc-900 dark:group-hover/cta:text-white">
                          {tHome("whatWeServe.exploreMore")}
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/cta:translate-x-1"
                          style={{
                            backgroundColor: `${track.color}20`,
                            color: track.color,
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Progress Dots */}
                      <div className="relative z-10 flex justify-center gap-2 mt-8">
                        {[0, 1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                            animate={{
                              width: dot === activeIndex ? 24 : 6,
                              backgroundColor:
                                dot === activeIndex ? track.color : undefined,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Innovation Journey Section ── */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Top Heading */}
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
            >
              {tCollab("journeyTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {tCollab("journeyHighlight")}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
          >
            {/* Decorative gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

            <div className="grid md:grid-cols-2 gap-0 items-start">
              {/* LEFT: Heading + Content */}
              <div className="px-6 md:px-14 py-10 md:py-20">
                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight
                                       bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]
                                       dark:from-white dark:via-[#3A9B9B] dark:to-white
                                       bg-clip-text text-transparent mb-4"
                >
                  {tName("sloganText")}
                </motion.h2>

                {/* Divider */}
                <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />

                {/* Philosophy text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-zinc-600 md:text-2xl md:text-justify dark:text-zinc-400 text-base leading-relaxed"
                >
                  {tName("closingStatement")}
                </motion.p>
              </div>

              {/* RIGHT: Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[600px]"
              >
                <Image
                  src="/images/Idea-Deploy.png"
                  alt="Innovation Journey — Idea to Deployment"
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Top Heading */}
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
            >
              {tCollab("approachTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {tCollab("approachHighlight")}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-6 md:p-16 rounded-3xl md:rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
          >
            {/* Decorative gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3A9B9B]/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#3A9B9B]/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Body paragraphs */}
              <div className="space-y-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                <p className="text-justify text-zinc-700 dark:text-zinc-100">
                  {tCollab("approachP1")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
