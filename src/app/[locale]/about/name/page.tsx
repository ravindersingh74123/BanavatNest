"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { Link } from '@/i18n/navigation';
import {
    Link as LinkIcon,
    ArrowRight,
    GraduationCap,
    Factory,
    Rocket,
    CircleDot,
    Beaker,
    Cpu,
    Trophy,
    Network,
    Star,
    Zap,
} from "lucide-react";
import PageWrapper from '@/components/PageWrapper';


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


const NamePage = () => {
    const t = useTranslations("aboutUsPage");
    const tName = useTranslations("aboutName");
    const tCollab = useTranslations("collaborationPage");
    const tMission = useTranslations("aboutMission");
    const tHome = useTranslations("home");
    const taboutboard = useTranslations('aboutBoard');
    const tBoard = useTranslations('boardPage');
    const tCollabTracks = useTranslations("collaboration");
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate the content in collaboration tracks
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
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

    const heroImages = ["/images/BANAVAT.png", "/images/NEST.png"];

    return (
        <main className="min-h-screen pt-20 relative overflow-hidden">
            {/* Dotted Background (Consistent with other premium pages) */}
            <div
                className="absolute inset-0 pointer-events-none 
                bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)] 
                dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_1px,_transparent_1px)]
                [background-size:24px_24px] -z-10"
            />
            {/* Our Name Section */}
            <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl dark:text-white lg:text-6xl font-bold mb-4"
                    >
                        {t("whyTheName")}{" "}
                        <span className="text-[#3A9B9B]">{t("whyTheNameHighlight")}</span>
                    </motion.h2>
                </div>

                <div className="mt-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.5 }}
                            className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                        >
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                            <h4 className="text-4xl font-black text-[#2D3561]  mb-8 tracking-tight  ">
                                {tName("banavatTitle")}
                            </h4>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                                {tName("banavatDesc")}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.5 }}
                            className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                        >
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                            <h4 className="text-4xl font-black text-[#3A9B9B] mb-8 tracking-tight">
                                {tName("nestTitle")}
                            </h4>
                            <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                                {tName("nestDesc")}
                            </p>
                        </motion.div>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 w-full max-w-7xl mx-auto text-2xl pt-10">
                        {tName("quote")}
                    </p>
                </div>
            </section>

            {/* Symbolism of BanavatNest Section */}
            <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl dark:text-white lg:text-6xl font-bold mb-4"
                    >
                        {t.rich("symbolismLabel", {
                            brand: (chunks) => (
                                <span className="text-[#3A9B9B]">{chunks}</span>
                            ),
                        })}
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
                >
                    {/* Decorative accent line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

                    {/* Two-column layout */}
                    <div className="grid md:grid-cols-2 gap-0 items-start pt-5">
                        {/* LEFT: Heading + Content */}
                        <div className="px-6 md:px-10 !pt-[30px] py-10 md:py-16">
                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-2xl text-justify md:text-4xl lg:text-5xl font-black tracking-tight
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
                                className="text-zinc-600 md:text-2xl text-justify dark:text-zinc-400 text-base leading-relaxed"
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
                            className="relative aspect-square"
                        >
                            <Image
                                src="/images/Idea-Deploy.png"
                                alt="Idea to Deployment"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
                            />
                        </motion.div>
                    </div>

                    {/* Decorative bottom glow */}
                    <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-48 h-24 bg-[#3A9B9B]/15 blur-3xl rounded-full pointer-events-none" />
                </motion.div>
            </section>

            <section className="px-6 py-10 md:p-12 relative max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl dark:text-white font-bold mb-4"
                    >
                        {t("coreValuesTitle")}{" "}
                        <span className="text-[#3A9B9B]">{t("coreValuesHighlight")}</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[2.5rem] overflow-hidden
                        border-2 border-[#3A9B9B]/20
                        bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5
                        dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10
                        backdrop-blur-sm shadow-lg"
                >
                    {/* Decorative accent line */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />

                    <div className="grid md:grid-cols-2 gap-0 items-start pt-5">
                        {/* LEFT: Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: -20 }}
                            whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="relative aspect-square"
                        >
                            <Image
                                src="/images/Core Values.png"
                                alt="Idea to Deployment - Core Values"
                                fill
                                className="object-contain transition-transform duration-700 hover:scale-105 p-6 md:p-8"
                            />
                        </motion.div>

                        {/* RIGHT: Text + Grid */}
                        <div className="px-6 md:px-10 !pt-[30px] py-10 md:py-16">
                            {/* Philosophy text */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35, duration: 0.6 }}
                                className="text-zinc-600 md:text-2xl text-justify dark:text-zinc-400 text-base leading-relaxed mb-12"
                            >
                                {t.rich("coreValuesIntro", {
                                    brand: (chunks) => (
                                        <span className="text-[#3A9B9B]">{chunks}</span>
                                    ),
                                })}
                            </motion.p>

                            {/* Divider */}
                            {/* <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" /> */}
                            <br />
                            {/* Values — 2×2 card grid */}
                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    {
                                        num: "01",
                                        title: t("purposeTitle"),
                                        desc: t("purposeDesc"),
                                    },
                                    {
                                        num: "02",
                                        title: t("processTitle"),
                                        desc: t("processDesc"),
                                    },
                                    {
                                        num: "03",
                                        title: t("prototypeTitle"),
                                        desc: t("prototypeDesc"),
                                    },
                                    {
                                        num: "04",
                                        title: t("progressTitle"),
                                        desc: t("progressDesc"),
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                        whileHover={{
                                            y: -4,
                                            boxShadow: "0 20px 40px -12px rgba(58,155,155,0.2)",
                                        }}
                                        className="relative flex flex-col justify-between p-5 rounded-2xl overflow-hidden
                                            border-2 border-[#3A9B9B]/20 
                                            bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                            dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                            backdrop-blur-sm shadow-sm
                                            transition-all duration-300 cursor-default"
                                    >
                                        {/* Accent line */}
                                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />

                                        {/* Number badge */}
                                        <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                                            {item.num}
                                        </span>

                                        {/* Title */}
                                        <h3
                                            className="text-lg md:text-xl font-black tracking-tight leading-tight mb-2
                                                bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] bg-clip-text text-transparent
                                                dark:from-white dark:to-[#3A9B9B]"
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Divider */}
                                        <div
                                            className="w-8 h-[1.5px] rounded-full mb-2"
                                            style={{
                                                background: index % 2 === 0 ? "#3A9B9B" : "#2D3561",
                                            }}
                                        />

                                        {/* Description */}
                                        <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-[13px] font-medium leading-relaxed line-clamp-3">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Decorative bottom glow */}
                    <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-48 h-24 bg-[#3A9B9B]/15 blur-3xl rounded-full pointer-events-none" />
                </motion.div>
            </section>
            {/* Our Mission & Our Vision Section */}
            <section className="px-6 py-10 md:p-12 max-w-7xl mx-auto">
                {/* Section heading */}
                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl lg:text-6xl dark:text-white font-bold mb-4"
                    >
                        <span className="text-[#2D3561] "> {tMission("missionTitle")}</span>{" "}
                        &amp;{" "}
                        <span className="text-[#3A9B9B] "> {tMission("visionTitle")}</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        whileHover={{ y: -5 }}
                        className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                        <h2 className="text-4xl font-black text-[#2D3561] mb-8 tracking-tight">
                            {tMission("missionTitle")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                            {tMission("missionText")}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        whileHover={{ y: -5 }}
                        className="relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden 
                                border-2 border-[#3A9B9B]/20 
                                bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 
                                dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 
                                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                        <h2 className="text-4xl font-black text-[#3A9B9B] mb-8 tracking-tight">
                            {tMission("visionTitle")}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                            {tMission("visionText")}
                        </p>
                    </motion.div>
                </div>
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
                        const itemsRaw = tCollabTracks.raw(`${track.key}.items`);
                        const items = Object.values(itemsRaw) as {
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
                                                {tCollabTracks(`${track.key}.title`)}
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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveIndex(dot);
                                                    }}
                                                    className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 cursor-pointer"
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
            <PageWrapper>
                <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors">

                    {/* ── Section 1: STEP-TIET Incubation Mentor ── */}
                    <section className="relative pt-24 overflow-hidden grid-bg min-h-[90vh] flex items-center">
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-14">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
                                >
                                    {tBoard('heroTitle')} <span className="text-[#3A9B9B]">{tBoard('heroHighlight')}</span>
                                </motion.h2>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="relative rounded-[2.5rem] border border-white/40 dark:border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-sm bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/80 dark:to-[#2D3561]/10">
                                {/* Main Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
                                    {/* Decorative Accent Line */}
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] z-20" />

                                    {/* LEFT SIDE */}
                                    <div className="relative p-6 md:p-10 lg:p-12">
                                        {/* subtle dots */}
                                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#3A9B9B_1px,transparent_1px)] [background-size:16px_16px]" />

                                        <div className="relative z-10">
                                            {/* Heading */}
                                            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#111827] via-[#2D3561] to-[#3A9B9B] dark:from-white dark:via-zinc-200 dark:to-[#3A9B9B] leading-tight mb-6">
                                                {tBoard('tietTitle')}
                                            </h2>

                                            {/* Stats Card */}
                                            <div className="bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[1.5rem] p-5 md:p-6 shadow-md mb-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                                                    {/* Item 1 */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-12 rounded-xl bg-[#E8F7F7] flex items-center justify-center shrink-0">
                                                            <GraduationCap className="w-6 h-6 text-[#148787]" />
                                                        </div>

                                                        <div>
                                                            <h4 className="text-lg font-black text-[#111827] dark:text-white">
                                                                {tBoard('stat1Val')}
                                                            </h4>
                                                            <p className="text-xs text-zinc-600 font-medium">
                                                                {tBoard('stat1Label')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Item 2 */}
                                                    <div className="flex items-center gap-3 border-l border-zinc-200 px-4">
                                                        <div className="h-12 w-12 rounded-xl bg-[#E8F7F7] flex items-center justify-center shrink-0">
                                                            <Star className="w-6 h-6 text-[#148787]" />
                                                        </div>

                                                        <div>
                                                            <h4 className="text-lg font-black text-[#111827] dark:text-white">
                                                                {tBoard('stat2Val')}
                                                            </h4>
                                                            <p className="text-xs text-zinc-600 font-medium">
                                                                {tBoard('stat2Label')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Item 3 */}
                                                    {/* <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-xl bg-[#E8F7F7] flex items-center justify-center shrink-0">
                                                        <Zap className="w-6 h-6 text-[#148787]" />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-black text-[#111827]">
                                                            {tBoard('stat3Val')}
                                                        </h4>
                                                        <p className="text-xs text-zinc-600 font-medium">
                                                            {tBoard('stat3Label')}
                                                        </p>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </div>
                                            <div className="w-full h-[3px] rounded-full bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] mb-6" />
                                            {/* Description */}
                                            <div className="space-y-6">
                                                <p className="text-lg text-justify md:text-xl leading-relaxed text-[#111827] dark:text-zinc-200 font-medium opacity-90">
                                                    {tBoard('desc1')}
                                                </p>

                                                <p className="text-lg text-justify md:text-xl leading-relaxed text-[#111827] dark:text-zinc-200 font-medium opacity-90">
                                                    {tBoard('desc2')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="hidden lg:block absolute left-[55%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#3A9B9B]/30 to-transparent" />

                                    {/* RIGHT SIDE */}
                                    <div className="relative p-6 md:p-10 lg:p-12">
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full rounded-[2rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6 md:p-8 ">
                                            {/* Top */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="h-14 w-14 rounded-2xl bg-[#E8F7F7] flex items-center justify-center border border-[#3A9B9B]/10">
                                                    <svg
                                                        className="w-7 h-7 text-[#148787]"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2L1 7h22L12 2zm9 7H3v2h18V9zm-2 4H5v7h14v-7z" />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <h3 className="text-2xl font-black tracking-tight text-[#0F172A] dark:text-white">
                                                        {tBoard('stepTietTitle')}
                                                    </h3>

                                                    <p className="text-sm text-zinc-600 font-semibold uppercase tracking-wider">
                                                        {tBoard('stepTietSubtitle')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />

                                            {/* Intro */}
                                            <p className="text-lg leading-relaxed text-[#0F172A] dark:text-zinc-200 mb-8 font-medium">
                                                {tBoard('supportingText')}{" "}
                                                <span className="font-black text-[#148787] dark:text-[#3A9B9B]">
                                                    BanavatNest
                                                </span>{" "}
                                                {tBoard('supportingIn')}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-4">

                                                {[
                                                    {
                                                        title: tBoard('feat1Title'),
                                                        desc: tBoard('feat1Desc'),
                                                        icon: Beaker
                                                    },
                                                    {
                                                        title: tBoard('feat2Title'),
                                                        desc: tBoard('feat2Desc'),
                                                        icon: Cpu
                                                    },
                                                    {
                                                        title: tBoard('feat3Title'),
                                                        desc: tBoard('feat3Desc'),
                                                        icon: Trophy
                                                    },
                                                    {
                                                        title: tBoard('feat4Title'),
                                                        desc: tBoard('feat4Desc'),
                                                        icon: Network
                                                    },
                                                ].map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-none last:pb-0"
                                                    >
                                                        <div className="h-12 w-12 rounded-xl bg-[#E8F7F7] border border-[#3A9B9B]/10 flex items-center justify-center shrink-0">
                                                            <item.icon className="w-6 h-6 text-[#148787]" />
                                                        </div>

                                                        <div className="pt-0.5">
                                                            <h4 className="text-lg font-black text-[#0F172A] dark:text-white">
                                                                {item.title}
                                                            </h4>

                                                            <p className="text-sm text-zinc-600 leading-relaxed">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ── Section 2: Board of Directors ── */}
                    <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 grid-bg">
                        <div className="max-w-7xl mx-auto">

                            {/* Section heading */}
                            <div className="text-center mb-14">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
                                >
                                    {tBoard('boardTitle')} <span className="text-[#3A9B9B]">{tBoard('boardHighlight')}</span>
                                </motion.h2>
                            </div>

                            {/* Director cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                                {/* Dr. Sukhdev Singh */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30"
                                >
                                    <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                            <img src="/images/Director/Sukhdev.jpeg" alt={taboutboard('sukhdevName')} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1 whitespace-nowrap">{taboutboard('sukhdevName')}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm mb-1 tracking-wide">{taboutboard('sukhdevEdu')}</p>
                                            <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-widest leading-tight">{taboutboard('sukhdevRole')}</p>
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed text-justify mb-6 font-medium">{taboutboard('sukhdevBio')}</p>
                                    <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sukhdevAch1')}</li>
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sukhdevAch2')}</li>
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sukhdevAch3')}</li>
                                    </ul>
                                    <Link href="/about/board/dr-sukhdev-singh"
                                        className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-lg hover:text-[#2a7676] transition-colors group">
                                        {tBoard('viewPortfolio')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                                {/* Dr. Sangita Roy */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white dark:bg-zinc-900/50 rounded-[4rem] p-10 md:p-12 border border-zinc-100 dark:border-zinc-800 relative text-left transition-all duration-300 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] dark:hover:border-teal-500/30 overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row items-center md:items-center gap-8 mb-10 text-center md:text-left">
                                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800 shrink-0">
                                            <img src="/images/Director/Sangita.jpeg" alt={taboutboard('sangitaName')} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1 whitespace-nowrap">{taboutboard('sangitaName')}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm mb-1 tracking-wide">{taboutboard('sangitaEdu')}</p>
                                            <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-widest leading-tight">{taboutboard('sangitaRole')}</p>
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6 text-justify  font-medium">{taboutboard('sangitaBio')}</p>
                                    <ul className="space-y-3 text-zinc-500 dark:text-zinc-500 font-bold text-sm mb-8">
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sangitaAch1')}</li>
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sangitaAch2')}</li>
                                        <li className="flex items-center"><CircleDot className="w-4 h-4 mr-3 text-[#3A9B9B]" /> {taboutboard('sangitaAch3')}</li>
                                    </ul>
                                    <Link href="/about/board/dr-sangita-roy"
                                        className="inline-flex items-center gap-2 text-[#3A9B9B] font-bold text-lg hover:text-[#2a7676] transition-colors group">
                                        {tBoard('viewPortfolio')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                            </div>
                        </div>
                    </section>

                </div>
            </PageWrapper>
        </main>
    );
};

export default NamePage;
