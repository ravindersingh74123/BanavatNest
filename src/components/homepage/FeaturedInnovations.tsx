"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag, Lightbulb } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export default function FeaturedInnovations() {
  const t = useTranslations("featuredInnovations");

  const INNOVATIONS = [
    {
      id: 1,
      tag: t("inn1Tag"),
      tagColor: "#2D3561",
      date: t("inn1Date"),
      headline: t("inn1Headline"),
      body: t("inn1Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_1.jpg",
          alt: "Smart Fish-Feeding System",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 2,
      tag: t("inn2Tag"),
      tagColor: "#3A9B9B",
      date: t("inn2Date"),
      headline: t("inn2Headline"),
      body: t("inn2Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_2.jpg",
          alt: "Integrated Farming",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 3,
      tag: t("inn3Tag"),
      tagColor: "#2D3561",
      date: t("inn3Date"),
      headline: t("inn3Headline"),
      body: t("inn3Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_3.png",
          alt: "Assistive Device",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 4,
      tag: t("inn4Tag"),
      tagColor: "#3A9B9B",
      date: t("inn4Date"),
      headline: t("inn4Headline"),
      body: t("inn4Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_4.png",
          alt: "Software Solutions",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 5,
      tag: t("inn5Tag"),
      tagColor: "#2D3561",
      date: t("inn5Date"),
      headline: t("inn5Headline"),
      body: t("inn5Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_5.png",
          alt: "Smart Irrigation",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 6,
      tag: t("inn6Tag"),
      tagColor: "#3A9B9B",
      date: t("inn6Date"),
      headline: t("inn6Headline"),
      body: t("inn6Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_6.png",
          alt: "Customized Solutions",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
    {
      id: 7,
      tag: t("inn7Tag"),
      tagColor: "#2D3561",
      date: t("inn7Date"),
      headline: t("inn7Headline"),
      body: t("inn7Body"),
      images: [
        {
          src: "/images/Featured%20Innovations/Project_7.png",
          alt: "Healthcare Systems",
          objectPosition: "object-center",
        },
      ],
      linkUrl: "/bridge/collaboration",
    },
  ];

  const SLIDE_DURATION = 6000;
  const IMAGE_CYCLE_DURATION = 3000;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const [imgIndex, setImgIndex] = useState(0);
  const [imgDir, setImgDir] = useState(1);

  const total = INNOVATIONS.length;
  const item = INNOVATIONS[activeIndex];
  const imgTotal = item.images.length;
  const safeImgIndex = Math.min(imgIndex, imgTotal - 1);

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

  useEffect(() => {
    if (imgTotal <= 1) return;
    const timer = setInterval(() => {
      setImgDir(1);
      setImgIndex((prev) => (prev + 1) % imgTotal);
    }, IMAGE_CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [activeIndex, imgTotal]);

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
      id="featured-innovations"
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
            {/* <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2D3561] dark:text-[#3A9B9B] mb-2">
              {t("ourShowcase")}
            </p> */}
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-[-0.03em] leading-[1]">
              {t("sectionTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {t("sectionHighlight")}
              </span>
            </h2>
          </div>
        </motion.div>

        <div>
          <div className="w-full">
            <div className="relative rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:bg-[#0c1220]">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-zinc-200 dark:bg-zinc-800 z-20">
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

              {/* Two-column layout: Image on LEFT, Text on RIGHT */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[440px]">
                {/* LEFT — Image(s) */}
                <div className="relative overflow-hidden min-h-[260px] md:min-h-0 bg-zinc-100 dark:bg-zinc-800 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/25" />
                    </motion.div>
                  </AnimatePresence>

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

                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    {imgTotal > 1 && (
                      <>
                        <button
                          onClick={imgPrev}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 shadow-md hover:scale-110"
                        >
                          <ChevronLeft className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                        </button>
                        <button
                          onClick={imgNext}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 shadow-md hover:scale-110"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                        </button>
                        <div className="w-px h-5 bg-white/30 mx-1" />
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goPrev();
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 shadow-md hover:scale-110 hover:bg-white"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goNext();
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/60 shadow-md hover:scale-110 hover:bg-white"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    </button>
                  </div>
                </div>

                {/* RIGHT — Post Text */}
                <div className="relative flex flex-col justify-between p-8 md:p-10 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm">
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
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: `${item.tagColor}18`,
                            color: item.tagColor,
                          }}
                        >
                          <Tag className="w-3 h-3" />
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-justify text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] dark:from-white dark:via-[#3A9B9B] dark:to-white tracking-tight leading-snug mb-4">
                        {item.headline}
                      </h3>

                      <p className="text-sm text-justify md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-[1.7] flex-grow">
                        {item.body}
                      </p>

                      <div className="mt-8 inline-flex items-center gap-2 self-start">
                        <span
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.05em] sm:tracking-[0.1em]"
                          style={{
                            backgroundColor: item.tagColor,
                            color: "#fff",
                            boxShadow: `0 4px 12px -3px ${item.tagColor}60`,
                          }}
                        >
                          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-left">{item.date}</span>
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2.5 mt-6">
          {INNOVATIONS.map((post, idx) => (
            <button
              key={post.id}
              onClick={() => goTo(idx)}
              aria-label={`Go to innovation ${idx + 1}`}
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
