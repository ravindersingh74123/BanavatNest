import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

type Params = { params: Promise<{ id: string; versionId: string }> };

/* ── GET — view a specific version's JSON ── */
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id, versionId } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const version = await db
      .collection('portfolio_versions')
      .findOne({ _id: new ObjectId(versionId) });

    if (!version) return NextResponse.json({ error: 'Version not found' }, { status: 404 });

    return NextResponse.json({
      id: version._id.toString(),
      versionNumber: version.versionNumber,
      createdAt: version.createdAt,
      createdBy: version.createdBy,
      portfolioJson: version.portfolioJson,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── POST — restore a version as new draft ── */
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id, versionId } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const oid = new ObjectId(id);
    const version = await db
      .collection('portfolio_versions')
      .findOne({ _id: new ObjectId(versionId) });

    if (!version) return NextResponse.json({ error: 'Version not found' }, { status: 404 });

    // Restore the version's data as the current draft
    await db.collection('director_profiles').updateOne(
      { userId: oid },
      {
        $set: {
          portfolioData: version.portfolioJson,
          status: 'draft',
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: `Restored to version ${version.versionNumber} as draft`,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
