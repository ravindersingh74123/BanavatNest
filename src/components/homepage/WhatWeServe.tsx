"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import React from "react";

// ── Premium SVG Illustrations with Animations ──

const StudentIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-student" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
      <filter id="glow-student-orb">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Backdrop Glassy Circle */}
    <circle cx="50" cy="50" r="35" fill="url(#grad-student)" />

    {/* Orbital Path with Moving Dot */}
    <circle
      cx="50"
      cy="50"
      r="42"
      stroke={color}
      strokeWidth="0.5"
      strokeDasharray="4 8"
      opacity="0.3"
    />
    <motion.circle
      cx="50"
      cy="8"
      r="3"
      fill={color}
      filter="url(#glow-student-orb)"
      animate={{
        cx: [50, 92, 50, 8, 50],
        cy: [8, 50, 92, 50, 8],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />

    {/* Laptop Base (Glassmorphic) */}
    <rect
      x="25"
      y="45"
      width="50"
      height="32"
      rx="4"
      fill="white"
      fillOpacity="0.05"
      stroke={color}
      strokeWidth="1.5"
      className="backdrop-blur-sm"
    />
    <rect
      x="30"
      y="50"
      width="40"
      height="22"
      rx="2"
      fill="white"
      className="dark:fill-zinc-900"
      opacity="0.8"
    />
    <path
      d="M22 77H78"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Graduation Cap (Animated Floating) */}
    <motion.g
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M35 40L50 32L65 40L50 48L35 40Z" fill={color} />
      <path
        d="M42 44V50C42 50 45 52 50 52C55 52 58 50 58 50V44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M65 40V48"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);

const FacultyIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-faculty" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Backdrop Glassy Circle */}
    <circle cx="45" cy="45" r="35" fill="url(#grad-faculty)" />

    {/* Book Pages Layered */}
    <rect
      x="20"
      y="30"
      width="30"
      height="40"
      rx="3"
      fill="white"
      className="dark:fill-zinc-900"
      stroke={color}
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />
    <rect
      x="50"
      y="30"
      width="30"
      height="40"
      rx="3"
      fill="white"
      className="dark:fill-zinc-900"
      stroke={color}
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />
    <path
      d="M25 40H40M25 48H45M25 56H40"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.3"
    />

    {/* Rotating Gear */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ originX: "65px", originY: "60px" }}
    >
      <circle
        cx="65"
        cy="60"
        r="12"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        cx="65"
        cy="60"
        r="4"
        fill="white"
        className="dark:fill-background"
        stroke={color}
        strokeWidth="1.5"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d={`M65 45V48`}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 65 60)`}
        />
      ))}
    </motion.g>

    {/* Network Nodes (Pulsing) */}
    <g>
      <motion.circle
        cx="70"
        cy="25"
        r="3"
        fill={color}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="85"
        cy="40"
        r="3"
        fill={color}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path
        d="M70 25L85 40"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.6"
      />
    </g>
  </svg>
);

const IndustryIllustration = ({ color }: { color: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-xl overflow-visible"
  >
    <defs>
      <linearGradient id="grad-industry" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Backdrop Glassy Circle */}
    <circle cx="55" cy="45" r="35" fill="url(#grad-industry)" />

    {/* Factory Silhouette (Tech-styled) */}
    <path
      d="M20 65V35L30 45V35L40 45V35L60 45V65H20Z"
      fill="white"
      className="dark:fill-zinc-900"
      fillOpacity="0.8"
      stroke={color}
      strokeWidth="1.5"
    />
    <rect x="22" y="30" width="10" height="5" fill={color} opacity="0.4" />
    <motion.path
      d="M27 30V20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ strokeDashoffset: [0, -10] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      strokeDasharray="4 4"
    />

    {/* Circuit Paths with Animating Dots */}
    <g>
      <path
        d="M60 45H85"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <motion.circle
        cx="60"
        cy="45"
        r="2"
        fill={color}
        animate={{ cx: [60, 85] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <circle cx="85" cy="45" r="3" stroke={color} strokeWidth="1" />

      <path
        d="M60 55H75"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <motion.circle
        cx="60"
        cy="55"
        r="2"
        fill={color}
        animate={{ cx: [60, 75] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <circle cx="75" cy="55" r="3" stroke={color} strokeWidth="1" />

      <path
        d="M60 35H80"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <motion.circle
        cx="60"
        cy="35"
        r="2"
        fill={color}
        animate={{ cx: [60, 80] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.2,
        }}
      />
      <circle cx="80" cy="35" r="3" stroke={color} strokeWidth="1" />
    </g>

    {/* Technical Grid Overlay */}
    <path
      d="M45 25H65M45 35H65M45 45H65"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.2"
    />
    <path
      d="M50 20V50M60 20V50"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.2"
    />
  </svg>
);

// ── Content Data ──

const serveData = [
  {
    key: "students",
    href: "/bridge/opportunities",
    emoji: "🎓",
    illustration: StudentIllustration,
    color: "#2D3561",
    bg: "bg-[#EAECF5] dark:bg-[#1a1e35]",
  },
  {
    key: "faculty",
    href: "/bridge/faculty",
    emoji: "👩‍🏫",
    illustration: FacultyIllustration,
    color: "#3A9B9B",
    bg: "bg-[#E8F7F7] dark:bg-[#0d2a2a]",
  },
  {
    key: "industry",
    href: "/bridge/partnerships",
    emoji: "🏭",
    illustration: IndustryIllustration,
    color: "#5BBD4A",
    bg: "bg-[#EAF8EA] dark:bg-[#142614]",
  },
];

export default function WhatWeServe() {
  const t = useTranslations("home");
  // Per-card independent indices (each card cycles its own content)
  const [cardIndices, setCardIndices] = useState([0, 0, 0]);

  useEffect(() => {
    const timers = serveData.map((_, cardIdx) => {
      // Stagger start so cards don't all flip at the same time
      return setTimeout(() => {
        const interval = setInterval(() => {
          setCardIndices((prev) => {
            const next = [...prev];
            next[cardIdx] = (next[cardIdx] + 1) % 4;
            return next;
          });
        }, 3500);
        // Store interval id on the timeout callback scope so we can clear it
        return interval;
      }, cardIdx * 1200);
    });

    // Clean-up: clear all timeouts (intervals are inside timeouts so they clean up on unmount via the closure)
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section
      id="what-we-serve"
      className="pt-16 bg-white dark:bg-zinc-900 overflow-hidden grid-bg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1] mb-5">
            {t("whatWeServe.title")}{" "}
            <span className="text-[#3A9B9B]">
              {t("whatWeServe.titleHighlight")}
            </span>
          </h2>
          {/* <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-5xl mx-auto leading-relaxed">
            {t("whatWeServe.description")}
          </p> */}
        </motion.div>

        {/* ── Served Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {serveData.map((card, idx) => {
            const Illustration = card.illustration;

            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="group relative h-[620px]"
              >
                <div className="h-full">
                  <Link href={card.href} className="block h-full">
                    <motion.div
                      whileHover={{
                        boxShadow: `0 40px 80px -16px ${card.color}50`,
                        y: -12,
                        borderColor: `${card.color}`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        borderTopColor: card.color,
                        boxShadow: `0 20px 40px -12px ${card.color}30`,
                        borderColor: `${card.color}`,
                      }}
                      className={`relative rounded-[2.5rem] ${card.bg} border border-t-8 p-10 h-full overflow-hidden flex flex-col items-center text-center backdrop-blur-sm`}
                    >
                      {/* Dark mode glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden dark:block"
                        style={{
                          background: `radial-gradient(circle at top, ${card.color}22, transparent 70%)`,
                        }}
                      />

                      {/* Header: Label with Emoji */}
                      <div className="relative z-10 flex flex-col items-center mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[2.2rem]">{card.emoji}</span>
                          <span className="text-base font-black uppercase tracking-[0.3em] text-zinc-900/80 dark:text-zinc-100/60">
                            {t(`whatWeServe.${card.key}.label`)}
                          </span>
                        </div>

                        {/* Illustration Container */}
                        <motion.div
                          key={`illustration-${card.key}`}
                          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-35 h-35 mb-4 transition-transform duration-700 group-hover:scale-110"
                        >
                          <Illustration color={card.color} />
                        </motion.div>
                      </div>

                      {/* Content with Animation */}
                      <div className="relative z-10 flex-grow w-full">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${card.key}-${cardIndices[idx]}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                          >
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 min-h-[64px] flex items-center justify-center">
                              {t(
                                `whatWeServe.${card.key}.items.${cardIndices[idx]}.heading`,
                              )}
                            </h3>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-[1.6]">
                              {t(
                                `whatWeServe.${card.key}.items.${cardIndices[idx]}.desc`,
                              )}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Explore More CTA */}
                      <div className="relative z-10 mt-8 mb-6 flex items-center justify-center gap-3 group/cta">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900/80 dark:text-zinc-100/60 transition-colors group-hover/cta:text-zinc-900 dark:group-hover/cta:text-white">
                          {t("whatWeServe.exploreMore")}
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/cta:translate-x-1"
                          style={{
                            backgroundColor: `${card.color}20`,
                            color: card.color,
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Bottom Progress Indicator Dots */}
                      <div className="relative z-10 flex justify-center gap-2 mb-4">
                        {[0, 1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"
                            animate={{
                              width: dot === cardIndices[idx] ? 24 : 6,
                              backgroundColor:
                                dot === cardIndices[idx]
                                  ? card.color
                                  : undefined,
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        ))}
                      </div>

                      {/* Bottom accent bar animate on hover */}
                      <div
                        className="absolute bottom-0 left-12 right-12 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
                        style={{ backgroundColor: card.color }}
                      />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
