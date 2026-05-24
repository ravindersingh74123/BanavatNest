'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, ExternalLink, GraduationCap, Briefcase, Microscope,
    Calendar, ChevronDown, ChevronUp, BookOpen, Users, FileText, Trophy,
    FlaskConical, Award, ScrollText, Newspaper, Star
} from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import ResearchAndDevelopmentPage from '@/app/[locale]/what-we-do/focus/research-and-development/page';

/* ───────────────────── Data Model ───────────────────── */

export interface JobPosition {
    title: string;
    organization: string;
    /** Simple period string (Sukhdev) OR derived from startDate/endDate (Sangita) */
    period?: string;
    department?: string;
    location?: string;
    startDate?: string | null;
    endDate?: string | null;
    description: string;
    highlights?: string[];
}

/* Publications – support BOTH a simple citation string (Sukhdev) and a rich structured object (Sangita) */
export type Publication =
    | { citation: string }
    | {
        type: 'journal' | 'conference' | 'book-authored' | 'book-edited' | 'patent-granted' | 'patent-published' | 'Research-Publications';
        title: string;
        authors?: string[];
        // Journal-specific
        journal?: string;
        volume?: string;
        pages?: string;
        articleNumber?: string;
        year?: number | null;
        doi?: string;
        impactFactor?: number;
        publisher?: string;
        // Conference-specific
        conference?: string;
        location?: string;
        date?: string;
        // Patent-specific
        patentNumber?: string;
        applicationNumber?: string;
        inventors?: string[];
        //Research-Publications-specific
        ResearchPublications?: string;
    };

export interface CoAuthor {
    name: string;
    /** Sukhdev uses `count`, Sangita uses `affiliation` */
    count?: number;
    affiliation?: string;
    role?: string;
    link?: string | null;
}

export interface ReviewerJournal {
    name: string;
    link: string;
}

/** Sukhdev uses { degree, institution, year, details }; Sangita uses { level, field, institution, location, year, supervisor } */
export type Degree =
    | { degree: string; institution: string; year: string | null; details: string }
    | {
        level: string;
        field: string;
        institution: string;
        location?: string;
        year: string | null;
        supervisor?: string;
    };

/** Sukhdev uses { title, year, description }; Sangita adds optional `category` */
export interface AwardItem {
    title: string;
    year?: string;
    description?: string;
    category?: 'honor' | 'extracurricular' | string;
}

export interface PhdThesis {
    title: string;
    summary?: string;
    supervisor?: string;
    institution?: string;
    year?: string;
    publications?: string[];
    committee?: { name: string; role: string }[];
}

/** Sukhdev uses { name, link }; Sangita uses { platform, url } */
export type AcademicProfile =
    | { name: string; link: string }
    | { platform: string; url: string };

export interface PortfolioData {
    id: string;
    name: string;
    role: string;
    image: string | null;
    bio: string;

    job: {
        summary: string;
        positions: JobPosition[];
    };

    research: {
        summary: string;
        publications: Publication[];
        coAuthors: CoAuthor[];
        reviewerJournals: ReviewerJournal[];
    };

    education: {
        summary: string;
        degrees: Degree[];
        awards: AwardItem[];
        phdThesis?: PhdThesis;
    };

    contact: {
        email: string;
        phone: string[];
        profiles: AcademicProfile[];
    };
}

/* ───────────────────── Helpers ───────────────────── */

function getProfileName(p: AcademicProfile): string {
    return 'name' in p ? p.name : p.platform;
}

function getProfileLink(p: AcademicProfile): string {
    return 'link' in p ? p.link : p.url;
}

function getDegreeTitle(d: Degree): string {
    if ('degree' in d) return d.degree;
    return `${d.level} – ${d.field}`;
}

function getDegreeDetails(d: Degree): string {
    if ('details' in d) return d.details;
    const parts: string[] = [];
    if (d.location) parts.push(d.location);
    if (d.supervisor) parts.push(`Supervisor: ${d.supervisor}`);
    return parts.join(' · ');
}

function getPositionPeriod(pos: JobPosition): string | undefined {
    if (pos.period) return pos.period;
    const parts: string[] = [];
    if (pos.startDate) parts.push(pos.startDate);
    if (pos.endDate) parts.push(pos.endDate);
    return parts.length ? parts.join(' – ') : undefined;
}

function isSimpleCitation(pub: Publication): pub is { citation: string } {
    return 'citation' in pub;
}

/* ───────────────────── Publication Type Config ───────────────────── */

type PubType = 'journal' | 'conference' | 'book-authored' | 'book-edited' | 'patent-granted' | 'patent-published';

const PUB_CONFIG: Record<PubType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    'journal': { label: 'Journal Articles', icon: Newspaper },
    'conference': { label: 'Conference Papers', icon: ScrollText },
    'book-authored': { label: 'Books Authored', icon: BookOpen },
    'book-edited': { label: 'Books Edited', icon: BookOpen },
    'patent-granted': { label: 'Patents Granted', icon: Award },
    'patent-published': { label: 'Patents Published', icon: FlaskConical },
    // 'Research-Publications': { label: 'Research Publications', icon: FlaskConical },
};
const PUB_ORDER: PubType[] = ['book-authored', 'book-edited', 'journal', 'conference', 'patent-granted', 'patent-published'];
// , 'Research-Publications'

interface PortfolioPageProps {
    data: PortfolioData;
}

/* ───────────────────── Constants ───────────────────── */

const SECTION_IDS = ['overview', 'research', 'education'];

/* ───────────────────── Sub-components ───────────────────── */

function RichPublication({ pub, idx }: { pub: Exclude<Publication, { citation: string }>; idx: number }) {
    const isPaper = pub.type === 'journal' || pub.type === 'conference';
    const isBook = pub.type === 'book-authored' || pub.type === 'book-edited';
    const isPatent = pub.type === 'patent-granted' || pub.type === 'patent-published';

    return (
        <div className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-teal-500/20 transition-all duration-200">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-xs font-black text-[#3A9B9B] bg-teal-50 dark:bg-teal-900/20 w-7 h-7 rounded-xl flex items-center justify-center">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                    <p className="text-zinc-900 dark:text-zinc-100 font-bold text-sm leading-snug mb-1">{pub.title}</p>

                    {/* Authors */}
                    {pub.authors && pub.authors.length > 0 && (
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1.5">
                            {pub.authors.join(', ')}
                        </p>
                    )}
                    {'inventors' in pub && pub.inventors && pub.inventors.length > 0 && (
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1.5">
                            Inventors: {pub.inventors.join(', ')}
                        </p>
                    )}

                    {/* Journal details */}
                    {isPaper && pub.type === 'journal' && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {'journal' in pub && pub.journal && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">{pub.journal}</span>
                            )}
                            {'volume' in pub && pub.volume && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 text-xs font-medium">Vol. {pub.volume}</span>
                            )}
                            {'pages' in pub && pub.pages && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 text-xs font-medium">pp. {pub.pages}</span>
                            )}
                            {'year' in pub && pub.year && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-[#2a7676] dark:text-[#3A9B9B] text-xs font-bold">{pub.year}</span>
                            )}
                            {'impactFactor' in pub && pub.impactFactor && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                                    <Star className="w-2.5 h-2.5" /> IF: {pub.impactFactor}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Conference details */}
                    {pub.type === 'conference' && (
                        <div className="mt-2 space-y-0.5">
                            {'conference' in pub && pub.conference && (
                                <p className="text-xs text-violet-700 dark:text-violet-300 font-semibold leading-tight">{pub.conference}</p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-1">
                                {'location' in pub && pub.location && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 text-xs font-medium">{pub.location}</span>
                                )}
                                {'date' in pub && pub.date && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-[#2a7676] dark:text-[#3A9B9B] text-xs font-bold">{pub.date}</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Book details */}
                    {isBook && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {'publisher' in pub && pub.publisher && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">{pub.publisher}</span>
                            )}
                            {'year' in pub && pub.year && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-[#2a7676] dark:text-[#3A9B9B] text-xs font-bold">{pub.year}</span>
                            )}
                        </div>
                    )}

                    {/* Patent details */}
                    {isPatent && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {'patentNumber' in pub && pub.patentNumber && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold">{pub.patentNumber}</span>
                            )}
                            {'applicationNumber' in pub && pub.applicationNumber && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 text-xs font-medium">App. No. {pub.applicationNumber}</span>
                            )}
                        </div>
                    )}

                    {/* DOI */}
                    {'doi' in pub && pub.doi && (
                        <a
                            href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                        >
                            DOI <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ───────────────────── Main Component ───────────────────── */

export default function PortfolioPage({ data }: PortfolioPageProps) {
    const [activeSection, setActiveSection] = useState('overview');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAllPubs, setShowAllPubs] = useState(false);
    const [showAllRichPubs, setShowAllRichPubs] = useState(false);
    const [expandedPosition, setExpandedPosition] = useState<number | null>(0);
    const [showThesis, setShowThesis] = useState(false);
    const [bioExpanded, setBioExpanded] = useState(false);
    const [activePubTab, setActivePubTab] = useState<string>('all');
    const navRef = useRef<HTMLDivElement>(null);

    const SECTION_LABELS = [data.name, 'Research', 'Education'];

    /* Detect if we're dealing with rich structured publications */
    const hasRichPubs = data.research.publications.length > 0 && !isSimpleCitation(data.research.publications[0]);

    /* Group publications by type */
    const pubGroups = hasRichPubs
        ? PUB_ORDER.reduce<Record<string, Array<{ pub: Publication; origIdx: number }>>>((acc, type) => {
            const matches = data.research.publications
                .map((p, i) => ({ pub: p, origIdx: i }))
                .filter(({ pub }) => !isSimpleCitation(pub) && (pub as { type: string }).type === type);
            if (matches.length) acc[type] = matches;
            return acc;
        }, {})
        : {};

    const pubTabKeys = ['all', ...Object.keys(pubGroups)];

    /* For simple-citation mode, pagination */
    const visiblePubs = showAllPubs
        ? data.research.publications
        : data.research.publications.slice(0, 5);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Reset show-more when the filter tab changes */
    useEffect(() => {
        setShowAllRichPubs(false);
    }, [activePubTab]);

    const handleTabClick = (id: string) => {
        setActiveSection(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' as const } },
    };

    const RICH_PUBS_INITIAL = 5;

    /* All publications for the active tab */
    const allRichPubsInTab: Array<{ pub: Publication; origIdx: number }> =
        activePubTab === 'all'
            ? data.research.publications.map((pub, i) => ({ pub, origIdx: i }))
            : (pubGroups[activePubTab] ?? []);

    /* Slice unless expanded */
    const richPubsToShow = showAllRichPubs
        ? allRichPubsInTab
        : allRichPubsInTab.slice(0, RICH_PUBS_INITIAL);

    return (
        <PageWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors pb-24 relative flex flex-col">

                {/* ─── Sticky Tab Nav ─── */}
                <div className={`sticky top-20 left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border-gray-200 dark:border-zinc-800 shadow-sm' : 'bg-zinc-50/90 dark:bg-[#09090b]/90 backdrop-blur-md border-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div ref={navRef} className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {SECTION_IDS.map((id, idx) => (
                                <button key={id} onClick={() => handleTabClick(id)} className={`relative whitespace-nowrap text-sm font-bold transition-colors py-1 ${activeSection === id ? 'text-[#3A9B9B]' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'}`}>
                                    {SECTION_LABELS[idx]}
                                    {activeSection === id && (
                                        <motion.div layoutId="activeSection" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#3A9B9B] rounded-t-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12">
                    <AnimatePresence mode="wait">

                        {/* ════════════════ OVERVIEW ════════════════ */}
                        {activeSection === 'overview' && (
                            <motion.section key="overview" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16 pb-16">

                                {/* ── Hero / Intro ── */}
                                <div className="relative grid-bg pt-12">
                                    <div className="hidden dark:block">
                                        <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[15%] right-[5%] w-[35rem] h-[35rem] bg-[#3A9B9B]/10 blur-[130px] rounded-full pointer-events-none z-0" />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                                        {/* Photo + name */}
                                        <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
                                            {data.image && (
                                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                                                    <img src={data.image} alt={data.name} className="w-full h-full object-cover object-top" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                </div>
                                            )}
                                            <div className="text-center lg:text-left">
                                                <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/10 border border-teal-100/50 dark:border-teal-500/20 shadow-sm mb-4">
                                                    <span className="flex h-2 w-2 rounded-full bg-[#3A9B9B] animate-pulse"></span>
                                                    <span className="text-[10px] font-black text-[#2a7676] dark:text-[#3A9B9B] uppercase tracking-[0.2em]">Board of Directors</span>
                                                </div>
                                                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">{data.name}</h1>
                                                <p className="text-xl font-bold text-[#3A9B9B] tracking-widest mt-2">{data.role}</p>
                                            </div>
                                        </div>

                                        {/* Biography */}
                                        <div className="lg:col-span-8 space-y-6">
                                            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Biography</h2>

                                            <div className="relative">
                                                <div
                                                    className="text-lg text-justify text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium space-y-5 whitespace-pre-line overflow-hidden transition-all duration-500"
                                                    style={{ maxHeight: bioExpanded ? '9999px' : '37vh' }}
                                                >
                                                    {data.bio.split('\n\n').map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                                </div>

                                                {!bioExpanded && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50 dark:from-[#09090b] to-transparent pointer-events-none" />
                                                )}
                                            </div>

                                            <button
                                                onClick={() => setBioExpanded(!bioExpanded)}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-[#3A9B9B] hover:text-[#2a7676] transition-colors"
                                            >
                                                {bioExpanded ? (
                                                    <><ChevronUp className="w-4 h-4" /> Show Less</>
                                                ) : (
                                                    <><ChevronDown className="w-4 h-4" /> See More</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                {/* ── My Job ── */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3A9B9B]/10 flex items-center justify-center"><Briefcase className="w-6 h-6 text-[#3A9B9B]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Job</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-10 text-justify">{data.job.summary}</p>

                                    <div className="space-y-4">
                                        {data.job.positions.map((pos, idx) => {
                                            const period = getPositionPeriod(pos);
                                            return (
                                                <div key={idx} className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-teal-500/30 transition-all duration-300 overflow-hidden">
                                                    <button onClick={() => setExpandedPosition(expandedPosition === idx ? null : idx)} className="w-full flex items-center justify-between p-6 md:p-8 text-left">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{pos.title}</h3>
                                                            <p className="text-[#3A9B9B] font-bold text-sm uppercase tracking-wider">{pos.organization}</p>
                                                            {pos.department && <p className="text-zinc-400 text-sm font-medium">{pos.department}</p>}
                                                            {period && <p className="text-zinc-500 text-sm font-medium mt-1">{period}</p>}
                                                            {pos.location && <p className="text-zinc-400 text-xs font-medium mt-0.5">{pos.location}</p>}
                                                        </div>
                                                        {expandedPosition === idx ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedPosition === idx && (
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                                <div className="px-6 md:px-8 pb-8 space-y-4">
                                                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{pos.description}</p>
                                                                    {pos.highlights && pos.highlights.length > 0 && (
                                                                        <div className="grid sm:grid-cols-2 gap-3">
                                                                            {pos.highlights.map((h, hi) => (
                                                                                <div key={hi} className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                                                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3A9B9B] shrink-0" />
                                                                                    <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">{h}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                {/* ── Contact ── */}
                                <div>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3A9B9B]/10 flex items-center justify-center"><Mail className="w-6 h-6 text-[#3A9B9B]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Contact</h2>
                                    </div>

                                    <div className="bg-[#3A9B9B] rounded-[2.5rem] p-1 border border-[#2a7676]/20 shadow-xl relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                        <div className="bg-white dark:bg-zinc-900 rounded-[2.3rem] p-8 md:p-12 h-full relative z-10 grid md:grid-cols-2 gap-12 items-start">
                                            <div>
                                                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4">Let&apos;s Connect</h3>
                                                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">For research collaborations, project discussions, or academic inquiries, feel free to reach out.</p>
                                                <div className="space-y-6">
                                                    {data.contact.email && (
                                                        <div className="flex items-start gap-4">
                                                            <div className="mt-1 bg-teal-50 dark:bg-zinc-800 p-2.5 rounded-xl text-[#3A9B9B]"><Mail className="w-5 h-5" /></div>
                                                            <div>
                                                                <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Email</p>
                                                                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact.email}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#3A9B9B] transition-colors">{data.contact.email}</a>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {data.contact.phone && data.contact.phone.length > 0 && (
                                                        <div className="flex items-start gap-4">
                                                            <div className="mt-1 bg-teal-50 dark:bg-zinc-800 p-2.5 rounded-xl text-[#3A9B9B]"><Phone className="w-5 h-5" /></div>
                                                            <div>
                                                                <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Phone</p>
                                                                <div className="space-y-1">{data.contact.phone.map((num, i) => <p key={i} className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{num}</p>)}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {data.contact.profiles.length > 0 && (
                                                <div className="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Academic Profiles</h4>
                                                    <ul className="space-y-3">
                                                        {data.contact.profiles.map((p, i) => {
                                                            const href = getProfileLink(p);
                                                            return (
                                                                <li key={i}>
                                                                    {href ? (
                                                                        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#3A9B9B] font-medium transition-colors">
                                                                            <ExternalLink className="w-4 h-4" /> {getProfileName(p)}
                                                                        </a>
                                                                    ) : (
                                                                        <span className="flex items-center gap-2 text-zinc-400 font-medium">
                                                                            <ExternalLink className="w-4 h-4 opacity-40" /> {getProfileName(p)}
                                                                        </span>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </motion.section>
                        )}

                        {/* ════════════════ RESEARCH ════════════════ */}
                        {activeSection === 'research' && (
                            <motion.section key="research" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="py-8 space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3A9B9B]/10 flex items-center justify-center"><Microscope className="w-6 h-6 text-[#3A9B9B]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Research</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-justify">{data.research.summary}</p>
                                </div>

                                {/* Publications */}
                                {data.research.publications.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <FileText className="w-5 h-5 text-[#3A9B9B]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Publications ({data.research.publications.length})</h3>
                                        </div>

                                        {/* ── Rich Publications Mode (Sangita) ── */}
                                        {hasRichPubs && (
                                            <>
                                                {/* Tab filter bar */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {pubTabKeys.map((key) => {
                                                        const count = key === 'all'
                                                            ? data.research.publications.length
                                                            : (pubGroups[key]?.length ?? 0);
                                                        const label = key === 'all' ? 'All' : (PUB_CONFIG[key as PubType]?.label ?? key);
                                                        const Icon = key === 'all' ? FileText : (PUB_CONFIG[key as PubType]?.icon ?? FileText);
                                                        return (
                                                            <button
                                                                key={key}
                                                                onClick={() => setActivePubTab(key)}
                                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${activePubTab === key
                                                                    ? 'bg-[#3A9B9B] text-white border-[#3A9B9B] shadow-sm'
                                                                    : 'bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-[#3A9B9B] hover:text-[#3A9B9B]'
                                                                    }`}
                                                            >
                                                                <Icon className="w-3 h-3" />
                                                                {label}
                                                                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activePubTab === key ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{count}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <div className="space-y-3">
                                                    {richPubsToShow.map(({ pub, origIdx }, displayIdx) => (
                                                        isSimpleCitation(pub) ? (
                                                            <div key={origIdx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                                                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">{pub.citation}</p>
                                                            </div>
                                                        ) : (
                                                            <RichPublication key={origIdx} pub={pub} idx={displayIdx} />
                                                        )
                                                    ))}
                                                </div>

                                                {allRichPubsInTab.length > RICH_PUBS_INITIAL && (
                                                    <button
                                                        onClick={() => setShowAllRichPubs(!showAllRichPubs)}
                                                        className="mt-4 text-[#3A9B9B] font-bold text-sm hover:text-[#2a7676] transition-colors flex items-center gap-1"
                                                    >
                                                        {showAllRichPubs
                                                            ? <><ChevronUp className="w-4 h-4" /> Show Less</>
                                                            : <><ChevronDown className="w-4 h-4" /> Show All {allRichPubsInTab.length} Publications</>}
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {/* ── Simple Citation Mode (Sukhdev) ── */}
                                        {!hasRichPubs && (
                                            <>
                                                <div className="space-y-3">
                                                    {visiblePubs.map((pub, idx) => (
                                                        <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                                            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                                                                {isSimpleCitation(pub) ? pub.citation : ''}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {data.research.publications.length > 5 && (
                                                    <button onClick={() => setShowAllPubs(!showAllPubs)} className="mt-4 text-[#3A9B9B] font-bold text-sm hover:text-[#2a7676] transition-colors flex items-center gap-1">
                                                        {showAllPubs ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Show All {data.research.publications.length} Publications <ChevronDown className="w-4 h-4" /></>}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Co-Authors */}
                                {data.research.coAuthors.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Users className="w-5 h-5 text-[#3A9B9B]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Co-Authors</h3>
                                        </div>
                                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {data.research.coAuthors.map((ca, idx) => (
                                                <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm group hover:shadow-xl dark:hover:border-teal-500/30 transition-all duration-300">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{ca.name}</h4>
                                                        {ca.count !== undefined && (
                                                            <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2.5 py-1 rounded-full">{ca.count}</span>
                                                        )}
                                                    </div>
                                                    {ca.role && <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mb-2">{ca.role}</p>}
                                                    {ca.affiliation && <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mb-2">{ca.affiliation}</p>}
                                                    {ca.link && (
                                                        <a href={ca.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3A9B9B] hover:text-[#2a7676] font-bold flex items-center gap-1 transition-colors">
                                                            Profile <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reviewer Journals */}
                                {data.research.reviewerJournals.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <BookOpen className="w-5 h-5 text-[#3A9B9B]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Reviewer of Journals</h3>
                                        </div>
                                        <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {data.research.reviewerJournals.map((j, idx) => (
                                                    <a key={idx} href={j.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-[#3A9B9B] font-medium text-sm transition-colors p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                                                        <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-400" /> {j.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.section>
                        )}

                        {/* ════════════════ EDUCATION ════════════════ */}
                        {activeSection === 'education' && (
                            <motion.section key="education" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="py-8 space-y-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3A9B9B]/10 flex items-center justify-center"><GraduationCap className="w-6 h-6 text-[#3A9B9B]" /></div>
                                        <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Education</h2>
                                    </div>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-justify">{data.education.summary}</p>
                                </div>

                                {/* Degree Timeline */}
                                <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 left-[39px] md:left-[59px] w-0.5 bg-zinc-100 dark:bg-zinc-800" />
                                    <div className="space-y-12">
                                        {data.education.degrees.map((edu, idx) => {
                                            const title = getDegreeTitle(edu);
                                            const details = getDegreeDetails(edu);
                                            return (
                                                <div key={idx} className="relative flex gap-6 md:gap-8 group">
                                                    <div className="relative mt-2">
                                                        <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-700 z-10 relative group-hover:border-[#3A9B9B] transition-colors" />
                                                    </div>
                                                    <div className="flex-1">
                                                        {edu.year && (
                                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-3">
                                                                <Calendar className="w-3.5 h-3.5" />{edu.year}
                                                            </div>
                                                        )}
                                                        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h3>
                                                        <p className="text-[#3A9B9B] font-bold text-sm md:text-base uppercase tracking-wider mb-4">{edu.institution}</p>
                                                        {'location' in edu && edu.location && (
                                                            <p className="text-zinc-400 text-sm font-medium mb-3">{edu.location}</p>
                                                        )}
                                                        {details && (
                                                            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed bg-zinc-50/50 dark:bg-zinc-800/30 p-4 rounded-2xl">{details}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Awards */}
                                {data.education.awards.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Trophy className="w-5 h-5 text-[#3A9B9B]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Awards &amp; Honors</h3>
                                        </div>

                                        {/* Check if awards have categories (Sangita style) */}
                                        {data.education.awards.some(aw => aw.category) ? (
                                            (() => {
                                                const honorAwards = data.education.awards.filter(aw => aw.category === 'honor');
                                                const extraAwards = data.education.awards.filter(aw => aw.category === 'extracurricular');
                                                const otherAwards = data.education.awards.filter(aw => !aw.category || (aw.category !== 'honor' && aw.category !== 'extracurricular'));

                                                return (
                                                    <div className="space-y-8">
                                                        {honorAwards.length > 0 && (
                                                            <div>
                                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                                                                    <Award className="w-4 h-4" /> Academic &amp; Professional Honors
                                                                </p>
                                                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                                    {honorAwards.map((aw, idx) => (
                                                                        <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-teal-500/30 transition-all duration-300">
                                                                            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-3">
                                                                                <Star className="w-4 h-4 text-[#3A9B9B]" />
                                                                            </div>
                                                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">{aw.title}</h4>
                                                                            {aw.description && <p className="text-zinc-500 text-xs mt-2 font-medium">{aw.description}</p>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {extraAwards.length > 0 && (
                                                            <div>
                                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                                                                    <Trophy className="w-4 h-4" /> Extracurricular &amp; Other Achievements
                                                                </p>
                                                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                                    {extraAwards.map((aw, idx) => (
                                                                        <div key={idx} className="bg-white dark:bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-teal-500/30 transition-all duration-300">
                                                                            <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-3">
                                                                                <Trophy className="w-4 h-4 text-violet-500" />
                                                                            </div>
                                                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">{aw.title}</h4>
                                                                            {aw.description && <p className="text-zinc-500 text-xs mt-2 font-medium">{aw.description}</p>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {otherAwards.length > 0 && (
                                                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                                {otherAwards.map((aw, idx) => (
                                                                    <div key={idx} className="bg-white dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-teal-500/30 transition-all">
                                                                        {aw.year && <span className="text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-[#2a7676] dark:text-[#3A9B9B] px-3 py-1 rounded-full">{aw.year}</span>}
                                                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-2">{aw.title}</h4>
                                                                        {aw.description && <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">{aw.description}</p>}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })()
                                        ) : (
                                            /* Simple award mode (Sukhdev) */
                                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {data.education.awards.map((aw, idx) => (
                                                    <div key={idx} className="bg-white dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:border-teal-500/30 transition-all duration-300">
                                                        {aw.year && <span className="text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-[#2a7676] dark:text-[#3A9B9B] px-3 py-1 rounded-full">{aw.year}</span>}
                                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-2">{aw.title}</h4>
                                                        {aw.description && <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">{aw.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PhD Thesis (collapsible) */}
                                {data.education.phdThesis && (
                                    <div>
                                        <button onClick={() => setShowThesis(!showThesis)} className="flex items-center gap-3 mb-6 group">
                                            <BookOpen className="w-5 h-5 text-[#3A9B9B]" />
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-[#3A9B9B] transition-colors">PhD Thesis Details</h3>
                                            {showThesis ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {showThesis && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                    <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
                                                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 italic">&ldquo;{data.education.phdThesis.title}&rdquo;</h4>
                                                        {data.education.phdThesis.supervisor && (
                                                            <p className="text-sm text-zinc-500 font-semibold">Supervisor: {data.education.phdThesis.supervisor}</p>
                                                        )}
                                                        {data.education.phdThesis.institution && (
                                                            <p className="text-sm text-zinc-500 font-medium">{data.education.phdThesis.institution}{data.education.phdThesis.year ? `, ${data.education.phdThesis.year}` : ''}</p>
                                                        )}
                                                        {data.education.phdThesis.summary && (
                                                            <div className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-sm space-y-4 whitespace-pre-line">
                                                                {data.education.phdThesis.summary.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                                                            </div>
                                                        )}

                                                        {data.education.phdThesis.publications && data.education.phdThesis.publications.length > 0 && (
                                                            <div>
                                                                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3">Publications from Thesis</h5>
                                                                <div className="space-y-2">
                                                                    {data.education.phdThesis.publications.map((p, i) => (
                                                                        <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400 font-medium bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-xl">{p}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {data.education.phdThesis.committee && data.education.phdThesis.committee.length > 0 && (
                                                            <div>
                                                                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3">Doctoral Committee</h5>
                                                                <div className="grid sm:grid-cols-2 gap-2">
                                                                    {data.education.phdThesis.committee.map((c, i) => (
                                                                        <div key={i} className="flex items-center gap-2 text-sm">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A9B9B] shrink-0" />
                                                                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{c.name}</span>
                                                                            <span className="text-zinc-400 text-xs">({c.role})</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageWrapper>
    );
}
