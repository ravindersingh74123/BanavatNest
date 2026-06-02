import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import type { PortfolioData } from '@/lib/portfolio-types';

type Params = { params: Promise<{ id: string }> };

/* ── GET /api/cms/directors/[id]/portfolio ── */
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const profile = await db
      .collection('director_profiles')
      .findOne({ userId: new ObjectId(id) });

    if (!profile) return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });

    return NextResponse.json({
      portfolioData: profile.portfolioData,
      status: profile.status,
      currentVersion: profile.currentVersion,
      publishedAt: profile.publishedAt,
      updatedAt: profile.updatedAt,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── PATCH /api/cms/directors/[id]/portfolio — save draft ── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const portfolioData: Partial<PortfolioData> = body.portfolioData;

    if (!portfolioData) {
      return NextResponse.json({ error: 'portfolioData is required' }, { status: 400 });
    }

    const db = await getDb();
    const oid = new ObjectId(id);

    const existing = await db.collection('director_profiles').findOne({ userId: oid });
    if (!existing) return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });

    // Deep merge: only update provided top-level sections
    const merged: PortfolioData = {
      ...existing.portfolioData,
      ...portfolioData,
    };

    await db.collection('director_profiles').updateOne(
      { userId: oid },
      {
        $set: {
          portfolioData: merged,
          status: 'draft',
          updatedAt: new Date(),
        },
      }
    );

    // Also sync name/image to users collection for board page display
    if (portfolioData.name || portfolioData.image) {
      const userUpdate: Record<string, unknown> = { updatedAt: new Date() };
      if (portfolioData.name) userUpdate.fullName = portfolioData.name;
      if (portfolioData.image) userUpdate.profileImage = portfolioData.image;
      await db.collection('users').updateOne({ _id: oid }, { $set: userUpdate });
    }

    return NextResponse.json({ success: true, status: 'draft' });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[PATCH portfolio]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
