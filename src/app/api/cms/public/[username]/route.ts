import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

type Params = { params: Promise<{ username: string }> };

/* ── GET /api/cms/public/[username] — no auth required ── */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { username } = await params;
    const db = await getDb();

    const user = await db
      .collection('users')
      .findOne({ username: username.toLowerCase() }, { projection: { passwordHash: 0 } });

    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const profile = await db
      .collection('director_profiles')
      .findOne({ userId: user._id });

    if (!profile || profile.status !== 'published') {
      return NextResponse.json({ error: 'Portfolio not published' }, { status: 404 });
    }

    return NextResponse.json({
      portfolioData: profile.portfolioData,
      publishedAt: profile.publishedAt,
    });
  } catch (err) {
    console.error('[public portfolio]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
