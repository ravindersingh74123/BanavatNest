"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Tag,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export default function NewsEvents() {
  const t = useTranslations("newsEvents");

  const NEWS_EVENTS = [
    {
      id: 1,
      tag: t("post1Tag"),
      tagColor: "#3A9B9B",
      date: t("post1Date"),
      headline: t("post1Headline"),
      body: t("post1Body"),
      images: [
        {
          src: "/images/new%26event/post1/1.jpeg",
          alt: "Image 1",
          objectPosition: "object-top",
        },
        {
          src: "/images/new%26event/post1/2.jpeg",
          alt: "Image 2",
          objectPosition: "object-top",
        },
        {
          src: "/images/new%26event/post1/3.jpeg",
          alt: "Image 3",
          objectPosition: "object-top",
        },
      ],
      linkedinUrl:
        "https://www.linkedin.com/posts/banavatnest-pvt-ltd_roft-tiet-banavatnest-activity-7454384336398749696-fsg9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEkrQ8BAmFKR5_nCElptw3wEOI9e4H7p1g",
    },
    {
      id: 2,
      tag: t("post2Tag"),
      tagColor: "#2D3561",
      date: t("post2Date"),
      headline: t("post2Headline"),
      body: t("post2Body"),
      images: [
        {
          src: "/images/new%26event/post3/fishfeeder.jpeg",
          alt: "Smart Fish-Feeding System",
          objectPosition: "object-center",
        },
      ],
      linkedinUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7454019410836754432/",
    },
    {
      id: 3,
      tag: t("post3Tag"),
      tagColor: "#3A9B9B",
      date: t("post3Date"),
      headline: t("post3Headline"),
      body: t("post3Body"),
      images: [
        {
          src: "/images/new%26event/post2/moonEvent.jpeg",
          alt: "Full Moon Event",
          objectPosition: "object-center",
        },
        {
          src: "/images/new%26event/post2/moon2.jpeg",
          alt: "Moon Photography",
          objectPosition: "object-center",
        },
      ],
      linkedinUrl: "https://www.linkedin.com/company/banavatnest-pvt-ltd",
    },
  ];

  const SLIDE_DURATION = 5500;
  const IMAGE_CYCLE_DURATION = 2800;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  // Per-post inner image index
  const [imgIndex, setImgIndex] = useState(0);
  const [imgDir, setImgDir] = useState(1);

  const total = NEWS_EVENTS.length;
  const item = NEWS_EVENTS[activeIndex];
  const imgTotal = item.images.length;
  // Clamp to avoid out-of-bounds when activeIndex changes before imgIndex resets
  const safeImgIndex = Math.min(imgIndex, imgTotal - 1);

  // ── Outer carousel (post-level) ──
  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
    setImgIndex(0);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setImgIndex(0);
  }, [total]);

  const goTo = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
    setImgIndex(0);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  // ── Inner image cycle (only when post has multiple images) ──
  useEffect(() => {
    if (imgTotal <= 1) return;
    const timer = setInterval(() => {
      setImgDir(1);
      setImgIndex((prev) => (prev + 1) % imgTotal);
    }, IMAGE_CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [activeIndex, imgTotal]);

  // Manual image nav
  const imgNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgDir(1);
    setImgIndex((prev) => (prev + 1) % imgTotal);
  };
  const imgPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgDir(-1);
    setImgIndex((prev) => (prev - 1 + imgTotal) % imgTotal);
  };

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  const imageVariants = {
    enter: (d: number) => ({ opacity: 0, scale: 1.06, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, scale: 0.96, x: d > 0 ? -30 : 30 }),
  };

  return (
    <section
      id="news-events"
      className="pt-16 bg-white dark:bg-zinc-900 overflow-hidden grid-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10 gap-4"
        >
          <div>
            {/* <p className="text-xs font-black uppercase tracking-[0.25em] text-[#3A9B9B] mb-2">
              {t("latestUpdates")}
            </p> */}
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1]">
              {t("sectionTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {t("sectionHighlight")}
              </span>
            </h2>
          </div>

          {/* Slide counter */}
          {/* <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span> */}
        </motion.div>

        {/* ── Main Carousel Card ── */}
        <div>
          <div className="w-full">
            <div className="relative rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:bg-zinc-900/60 backdrop-blur-sm">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-zinc-100 dark:bg-zinc-800 z-20">
                {!paused && (
                  <motion.div
                    key={`progress-${activeIndex}`}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.tagColor }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[440px]">
                {/* LEFT — Post Text */}
                <div className="relative flex flex-col justify-between p-8 md:p-10 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={`text-${activeIndex}`}
                      custom={direction}
                      variants={textVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col h-full"
                    >
                      {/* Tag + Date */}
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] px-3 rounded-full"
                          style={{
                            backgroundColor: `${item.tagColor}18`,
                            color: item.tagColor,
                          }}
                        >
                          <Tag className="w-3 h-3" />
                          {item.tag}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-justify text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] dark:from-white dark:via-[#3A9B9B] dark:to-white tracking-tight leading-snug mb-4">
                        {item.headline}
                      </h3>

                      {/* Body */}
                      <p className="text-sm text-justify md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-[1.7] flex-grow">
                        {item.body}
                      </p>

                      {/* LinkedIn CTA */}
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 self-start group"
                      >
                        <span
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: item.tagColor,
                            color: "#fff",
                            boxShadow: `0 8px 24px -6px ${item.tagColor}60`,
                          }}
                        >
                          {t("viewOnLinkedIn")}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* RIGHT — Image(s) */}
                <div className="relative overflow-hidden min-h-[260px] md:min-h-0 bg-zinc-100 dark:bg-zinc-800">
                  {/* Inner image carousel */}
                  <AnimatePresence custom={imgDir} mode="wait">
                    <motion.div
                      key={`img-${activeIndex}-${safeImgIndex}`}
                      custom={imgDir}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={item.images[safeImgIndex].src}
                        alt={item.images[safeImgIndex].alt}
                        fill
                        className={`object-cover ${item.images[safeImgIndex].objectPosition ?? "object-center"}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/25" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image index dots (only when post has >1 image) */}
                  {imgTotal > 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {item.images.map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-300"
                          style={{
                            width: i === safeImgIndex ? 20 : 6,
                            backgroundColor:
                              i === safeImgIndex
                                ? "#fff"
                                : "rgba(255,255,255,0.4)",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Navigation arrows */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    {/* Image prev/next (shown only if multiple images) */}
                    {imgTotal > 1 && (
                      <button
                        onClick={imgPrev}
                        aria-label="Previous image"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 dark:border-zinc-700 shadow-md transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                      </button>
                    )}
                    {imgTotal > 1 && (
                      <button
                        onClick={imgNext}
                        aria-label="Next image"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 dark:border-zinc-700 shadow-md transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                      </button>
                    )}

                    {/* Divider */}
                    {imgTotal > 1 && (
                      <div className="w-px h-5 bg-white/30 mx-1" />
                    )}

                    {/* Post prev/next */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goPrev();
                      }}
                      aria-label="Previous post"
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 dark:border-zinc-700 shadow-md transition-all hover:scale-110 hover:bg-white"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goNext();
                      }}
                      aria-label="Next post"
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 dark:border-zinc-700 shadow-md transition-all hover:scale-110 hover:bg-white"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Post dot indicators ── */}
        <div className="flex justify-center gap-2.5 mt-6">
          {NEWS_EVENTS.map((post, idx) => (
            <button
              key={post.id}
              onClick={() => goTo(idx)}
              aria-label={`Go to post ${idx + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === activeIndex ? 28 : 8,
                backgroundColor:
                  idx === activeIndex ? item.tagColor : "#d4d4d8",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
