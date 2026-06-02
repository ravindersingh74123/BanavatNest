import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import PortfolioPage from '@/components/PortfolioPage';
import type { PortfolioData } from '@/lib/portfolio-types';

type Params = { params: Promise<{ username: string; locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username } = await params;
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ username: username.toLowerCase() });
    if (!user) return {};
    const profile = await db.collection('director_profiles').findOne({ userId: user._id });
    if (!profile || profile.status !== 'published') return {};
    const data = profile.portfolioData as PortfolioData;
    return {
      title: `${data.name} | Portfolio – BanavatNest`,
      description: data.bio?.slice(0, 160) || `Portfolio of ${data.name}`,
      openGraph: {
        title: `${data.name} | Portfolio – BanavatNest`,
        description: data.bio?.slice(0, 160),
        images: data.image ? [{ url: data.image }] : [],
        type: 'profile',
      },
    };
  } catch {
    return {};
  }
}

export default async function PublicDirectorPage({ params }: Params) {
  const { username } = await params;

  const db = await getDb();
  const user = await db.collection('users').findOne({ username: username.toLowerCase() });
  if (!user) notFound();

  const profile = await db.collection('director_profiles').findOne({ userId: user._id });
  if (!profile || profile.status !== 'published') notFound();

  const portfolioData = profile.portfolioData as PortfolioData;

  return <PortfolioPage data={portfolioData} />;
}
