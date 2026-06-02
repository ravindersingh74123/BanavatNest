import { notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import PortfolioPage from '@/components/PortfolioPage';
import type { PortfolioData } from '@/lib/portfolio-types';

type Params = { params: Promise<{ directorId: string }> };

export default async function PreviewPage({ params }: Params) {
  const { directorId } = await params;

  // Auth gate — must be owner or super_admin
  const session = await getSession();
  if (!session) notFound();
  if (session.role === 'director' && session.userId !== directorId) notFound();

  const db = await getDb();
  const profile = await db.collection('director_profiles').findOne({
    userId: new ObjectId(directorId),
  });

  if (!profile) notFound();

  const portfolioData = profile.portfolioData as PortfolioData;

  return (
    <div>
      {/* Preview banner */}
      <div className="sticky top-0 z-50 bg-amber-500 text-white px-4 py-2.5 flex items-center justify-between text-sm font-bold shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-lg">👁️</span>
          Preview Mode — This is a{' '}
          <span className="font-black underline underline-offset-2">
            {profile.status === 'published' ? 'published' : 'draft'}
          </span>{' '}
          version. Not yet public.
        </div>
        <a
          href="/cms/editor"
          className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-xs font-black transition-colors"
        >
          ← Back to Editor
        </a>
      </div>
      <PortfolioPage data={portfolioData} />
    </div>
  );
}
