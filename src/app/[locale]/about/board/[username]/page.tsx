import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioPage from '@/components/PortfolioPage';
import type { PortfolioData } from '@/lib/portfolio-types';

type Props = { params: Promise<{ locale: string; username: string }> };

async function getDirectorData(username: string): Promise<PortfolioData | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/cms/public/${username}`, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        return data.portfolioData ?? null;
    } catch {
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
