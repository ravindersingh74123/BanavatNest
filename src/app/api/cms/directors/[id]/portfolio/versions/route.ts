import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

type Params = { params: Promise<{ id: string }> };

/* ── GET /api/cms/directors/[id]/portfolio/versions ── */
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

    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const versions = await db
      .collection('portfolio_versions')
      .find({ directorId: profile._id })
      .sort({ versionNumber: -1 })
      .project({ portfolioJson: 0 }) // exclude heavy payload in list
      .toArray();

    return NextResponse.json({
      versions: versions.map((v) => ({
        id: v._id.toString(),
        versionNumber: v.versionNumber,
        createdAt: v.createdAt,
        createdBy: v.createdBy,
      })),
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
