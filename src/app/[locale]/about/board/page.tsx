import { ArrowRight, Beaker, Cpu, Trophy, Network, GraduationCap, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import PageWrapper from '@/components/PageWrapper';
import BoardPageClient from './BoardPageClient';
import { getDb } from '@/lib/mongodb';

function SparklesIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        </svg>
    );
}

function ArrowUpRightIcon({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
        </svg>
    );
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
    boardPreview?: any;
}

export default async function BoardPage() {
    const t = await getTranslations('aboutBoard');
    const tBoard = await getTranslations('boardPage');

    // Fetch CMS-managed published directors grouped by tag
    let boardDirectors: CMSDirector[] = [];
    let associateDirectors: CMSDirector[] = [];

    try {
        const db = await getDb();
        const publishedProfiles = await db
            .collection('director_profiles')
            .find({ status: 'published' })
            .toArray();

        const userIds = publishedProfiles.map((p) => p.userId);
        const users = await db
            .collection('users')
            .find({ _id: { $in: userIds } }, { projection: { passwordHash: 0 } })
            .toArray();

        const userMap = new Map(users.map((u) => [u._id.toString(), u]));

        const directors = publishedProfiles.map((profile) => {
            const user = userMap.get(profile.userId.toString());
            const data = profile.portfolioData;
            return {
                id: user?._id.toString() ?? '',
                username: user?.username ?? '',
                fullName: user?.fullName ?? data?.name ?? '',
                role: data?.role ?? '',
                image: data?.image ?? user?.profileImage ?? null,
                bio: typeof data?.bio === 'string' ? data.bio.slice(0, 300) : '',
                tag: user?.tag ?? 'Board of Director',
                priorityValue: user?.priorityValue ?? 0,
                boardPreview: data?.boardPreview ?? null,
            };
        });

        boardDirectors = directors
            .filter((d) => d.tag === 'Board of Director')
            .sort((a, b) => (a.priorityValue ?? 0) - (b.priorityValue ?? 0));

        associateDirectors = directors
            .filter((d) => d.tag === 'Associate Director')
            .sort((a, b) => (a.priorityValue ?? 0) - (b.priorityValue ?? 0));
    } catch (err) {
        console.error('Error fetching directors:', err);
    }

    return (
        <PageWrapper>
            <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">

                {/* ── Section 1: STEP-TIET Incubation Mentor ── */}
                <section className="relative pt-24 overflow-hidden grid-bg min-h-[90vh] flex items-center">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
                            >
                                {tBoard('heroTitle')} <span className="text-[#3A9B9B]">{tBoard('heroHighlight')}</span>
                            </h2>
                        </div>
                        <div
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
                                    <div
                                        className="h-full rounded-[2rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 ">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 2: Board of Directors ── */}
                <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 grid-bg">
                    <div className="max-w-7xl mx-auto">

                        {/* ── Associate Directors ── */}
                        {associateDirectors.length > 0 && (
                            <>
                                <div className="text-center mb-14">
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                                        Associate <span className="text-[#3A9B9B]">Directors</span>
                                    </h2>
                                </div>
                                <BoardPageClient
                                    directors={associateDirectors}
                                    viewPortfolioLabel={tBoard('viewPortfolio')}
                                    sectionLabel="Associate Director"
                                />
                            </>
                        )}

                        {/* ── Board of Directors (from DB, sorted by priorityValue) ── */}
                        {boardDirectors.length > 0 && (
                            <>
                                <div className="text-center ">
                                    <h2
                                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
                                    >
                                        {tBoard('boardTitle')} <span className="text-[#3A9B9B]">{tBoard('boardHighlight')}</span>
                                    </h2>
                                </div>
                                <BoardPageClient
                                    directors={boardDirectors}
                                    viewPortfolioLabel={tBoard('viewPortfolio')}
                                    sectionLabel="Board of Director"
                                />
                            </>
                        )}

                    </div>
                </section>

            </div>
        </PageWrapper>
    );
}
