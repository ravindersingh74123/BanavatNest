import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioPage from '@/components/PortfolioPage';
import type { PortfolioData } from '@/lib/portfolio-types';
import { getDb } from '@/lib/mongodb';

type Props = { params: Promise<{ locale: string; username: string }> };

async function getDirectorData(username: string): Promise<PortfolioData | null> {
    try {
        const db = await getDb();
        const user = await db.collection('users').findOne(
            { username: username.toLowerCase() },
            { projection: { passwordHash: 0 } }
        );
        if (!user) return null;

        const profile = await db.collection('director_profiles').findOne({ userId: user._id });
        if (!profile || profile.status !== 'published') return null;

        return profile.portfolioData as PortfolioData;
    } catch (err) {
        console.error('Error fetching director data:', err);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const portfolio = await getDirectorData(username);

    if (!portfolio) {
        return { title: 'Director Not Found | BanavatNest' };
    }

    return {
        title: `${portfolio.name} | Portfolio – BanavatNest`,
        description: `Explore the portfolio of ${portfolio.name}, Director at BanavatNest.`,
        openGraph: {
            title: `${portfolio.name} | Portfolio – BanavatNest`,
            description: `Portfolio of ${portfolio.name} – Director at BanavatNest.`,
            images: portfolio.image ? [{ url: portfolio.image }] : [],
            type: 'profile',
        },
    };
}

export default async function DirectorPortfolioPage({ params }: Props) {
    const { username } = await params;
    const portfolio = await getDirectorData(username);

    if (!portfolio) {
        notFound();
    }

    return <PortfolioPage data={portfolio} />;
}
