"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Brain,
  Shield,
  Microscope,
  Zap,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import DomainCarousel from "@/components/DomainCarousel";
import React from "react";

// ── 3D Card Wrapper ──
const Card3D = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 400,
    damping: 30,
  });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.18);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-30"
        style={{
          opacity: glareOpacity,
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 65%)`,
        }}
      />
    </motion.div>
  );
};

const usps = [
  {
    emoji: "🚀",
    titleKey: "prototype",
    color: "#F59E0B",
  },
  {
    emoji: "🔗",
    titleKey: "bridge",
    color: "#3B82F6",
  },
  {
    emoji: "🧠",
    titleKey: "ai",
    color: "#8B5CF6",
  },
  {
    emoji: "⚙️",
    titleKey: "scalable",
    color: "#10B981",
  },
  {
    emoji: "🎯",
    titleKey: "custom",
    color: "#EF4444",
  },
  {
    emoji: "🏥",
    titleKey: "health",
    color: "#EC4899",
  },
  {
    emoji: "🌾",
    titleKey: "agri",
    color: "#3A9B9B",
  },
];

const workSteps = [
  { title: "Idea", emoji: "💡", color: "#3A9B9B" },
  { title: "Design", emoji: "🎨", color: "#3B82F6" },
  { title: "Prototype", emoji: "🛠️", color: "#F59E0B" },
  { title: "Deployment", emoji: "🚀", color: "#10B981" },
];

export default function WhatWeDo() {
  const t = useTranslations("home");

  const domains = [
    {
      title: t("domainAiTitle"),
      url: "/images/homepage/Ai.jpg",
      desc: t("domainAiDesc"),
      icon: <Brain className="w-7 h-7" />,
      accent: "from-[#3A9B9B] to-cyan-500",
      iconGradient: "from-blue-500 to-cyan-400",
      href: "/what-we-do/domains/ai-ml-data-science",
    },
    {
      title: t("domainCyberTitle"),
      url: "/images/homepage/cyberSecure.jpg",
      desc: t("domainCyberDesc"),
      icon: <Shield className="w-7 h-7" />,
      accent: "from-emerald-500 to-[#3A9B9B]",
      iconGradient: "from-green-500 to-emerald-400",
      href: "/what-we-do/domains/cybersecurity-iot-blockchain",
    },
    {
      title: t("domainSmartTitle"),
      url: "/images/homepage/Our-Vision.png",
      desc: t("domainSmartDesc"),
      icon: <Microscope className="w-7 h-7" />,
      accent: "from-purple-500 to-pink-500",
      iconGradient: "from-purple-500 to-pink-400",
      href: "/what-we-do/domains/smart-systems-healthcare-sustainability",
    },
    {
      title: t("domainAgriTitle"),
      url: "/images/homepage/Prototype-image.png",
      desc: t("domainAgriDesc"),
      icon: <Zap className="w-7 h-7" />,
      accent: "from-amber-500 to-[#3A9B9B]",
      iconGradient: "from-teal-500 to-yellow-600",
      href: "/what-we-do/domains/agriculture-smart-farming",
    },
  ];

  const [activeUspIndex, setActiveUspIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const rotationStep = 360 / usps.length;

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setTotalRotation((prev) => prev - rotationStep);
      setActiveUspIndex((prev) => (prev + 1) % usps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isManual, rotationStep]);

  const handleNext = () => {
    setTotalRotation((prev) => prev - rotationStep);
    setActiveUspIndex((prev) => (prev + 1) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const handlePrev = () => {
    setTotalRotation((prev) => prev + rotationStep);
    setActiveUspIndex((prev) => (prev - 1 + usps.length) % usps.length);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  const goToSlide = (idx: number) => {
    const currentCycle = Math.round(totalRotation / 360);
    const targetRotation = currentCycle * 360 - idx * rotationStep;

    let finalRotation = targetRotation;
    if (Math.abs(finalRotation - totalRotation) > 180) {
      if (finalRotation > totalRotation) finalRotation -= 360;
      else finalRotation += 360;
    }

    setTotalRotation(finalRotation);
    setActiveUspIndex(idx);
    setIsManual(true);
    setTimeout(() => setIsManual(false), 8000);
  };

  return (
    <section className="pt-16 bg-white dark:bg-zinc-900 overflow-hidden grid-bg">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-12 items-stretch">
          {/* Left Division: Our Domains */}
          <div className="flex flex-col h-full w-full relative z-10 lg:pr-8">
            <h2 className="text-3xl !text-center md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 text-center lg:text-left">
              {t("whatWeDo.coreDomainsTitle")}{" "}
              <span className="text-[#3A9B9B]">
                {t("whatWeDo.coreDomainsHighlight")}
              </span>
            </h2>
            <div className="-mx-4 sm:mx-0">
              <DomainCarousel items={domains} />
            </div>
          </div>

          {/* Right Division: What We Do & How We Work */}
          <div className="flex flex-col w-full relative z-10 lg:pl-10 border-l border-zinc-200 dark:border-zinc-800/50">
            <h2 className="text-3xl !text-center md:text-5xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6 text-center lg:text-left">
              {t("whatWeDo.title")}{" "}
              <span className="text-[#3A9B9B]">
                {t("whatWeDo.titleHighlight")}
              </span>
            </h2>

            <div
              className="relative w-full h-[500px] flex items-center justify-center mt-10 mb-6"
              style={{ perspective: "2000px" }}
            >
              <motion.div
                animate={{ rotateX: totalRotation }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                  mass: 1,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  willChange: "transform",
                }}
              >
                {usps.map((usp, index) => {
                  // Wrap-aware angular distance from the active face
                  const pos =
                    (((totalRotation / -rotationStep) % usps.length) +
                      usps.length) %
                    usps.length;
                  const raw = Math.abs(pos - index);
                  const dist = Math.min(raw, usps.length - raw);
                  const isActive = dist < 0.5;
                  const isAdjacent = dist >= 0.5 && dist < 1.5;
                  const cardOpacity = isActive ? 1 : isAdjacent ? 0.5 : 0.1;
                  const cardScale = isActive ? 1.08 : isAdjacent ? 0.92 : 0.85;
                  const blur = isActive ? 0 : isAdjacent ? 2 : 4;

                  return (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: `rotateX(${index * rotationStep}deg) translateZ(220px)`,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        pointerEvents: isActive ? "auto" : "none",
                        opacity: cardOpacity,
                        transition: "opacity 0.35s ease",
                        perspective: "1200px",
                      }}
                    >
                      <div className="w-full max-w-[260px] relative">
                        <div
                          className="w-full bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col items-center text-center group"
                          style={{
                            WebkitFontSmoothing: "antialiased",
                            MozOsxFontSmoothing: "grayscale",
                            transform: `scale(${cardScale})`,
                            filter: `blur(${blur}px)`,
                            transition: "all 0.4s ease",
                          }}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md mb-4 transform transition-transform group-hover:scale-110"
                            style={{ backgroundColor: usp.color }}
                          >
                            {usp.emoji}
                          </div>
                          <h4
                            className="text-base md:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight"
                            style={{ textRendering: "optimizeLegibility" }}
                          >
                            {t(`whatWeDo.usps.${usp.titleKey}`)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Top shadow mask — suggests card above */}
              <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--mask-bg, #fff) 0%, transparent 100%)",
                }}
              />
              {/* Bottom shadow mask — suggests card below */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(to top, var(--mask-bg, #fff) 0%, transparent 100%)",
                }}
              />
              <style>{`
                :root { --mask-bg: #fff; }
                .dark { --mask-bg: #18181b; }
              `}</style>

              {/* Vertical Navigation Controls */}
              <div className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 hidden xl:flex">
                <button
                  onClick={handlePrev}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-110 hover:border-[#3A9B9B]"
                  aria-label="Previous Text"
                >
                  <ChevronUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>

                <div className="flex flex-col gap-2">
                  {usps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`w-1.5 rounded-full mx-auto transition-all duration-300 ${idx === activeUspIndex
                        ? "h-6 bg-[#3A9B9B]"
                        : "h-1.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400"
                        }`}
                      aria-label={`Go to USP ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex w-8 h-8 rounded-full items-center justify-center bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-110 hover:border-[#3A9B9B]"
                  aria-label="Next Text"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>
            </div>

            {/* How We Work Section */}
            {/* 
            <div className="mt-12 relative w-full flex flex-col items-center lg:items-start">
              <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-8 text-center lg:text-left">
                How We <span className="text-[#3A9B9B]">Work</span>
              </h3>
              <div className="pl-20 grid grid-cols-2 gap-x-2 gap-y-6 relative w-full max-w-[290px] mx-auto lg:mx-0">
                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#3A9B9B]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[0].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[0].title}</div>
                  </div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#3A9B9B]/60 text-base hidden sm:block">→</div>
                </div>

                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#3A9B9B]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[1].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[1].title}</div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 text-[#3A9B9B]/60 text-base hidden sm:block">↓</div>
                </div>

                <div className="relative group flex flex-col order-last sm:order-none">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#3A9B9B]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[3].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[3].title}</div>
                  </div>
                </div>

                <div className="relative group flex flex-col">
                  <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm backdrop-blur-md transition-all hover:border-[#3A9B9B]/50 hover:bg-white dark:hover:bg-zinc-900 aspect-square w-full">
                    <div className="text-xl">{workSteps[2].emoji}</div>
                    <div className="text-[9px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">{workSteps[2].title}</div>
                  </div>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[#3A9B9B]/60 text-base hidden sm:block">←</div>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
