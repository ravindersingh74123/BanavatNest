import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';
import { ObjectId } from 'mongodb';

type Params = { params: Promise<{ id: string }> };

/* ── GET /api/cms/directors/[id] ── */
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id } = await params;

    // Director can only access own data
    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(id) },
      { projection: { passwordHash: 0 } }
    );
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const profile = await db.collection('director_profiles').findOne({ userId: new ObjectId(id) });

    return NextResponse.json({
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage ?? null,
      portfolioStatus: profile?.status ?? 'draft',
      currentVersion: profile?.currentVersion ?? 0,
      publishedAt: profile?.publishedAt ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── PATCH /api/cms/directors/[id] — update user account ── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { fullName, email, profileImage } = body;

    const db = await getDb();
    const updateFields: Record<string, unknown> = { updatedAt: new Date() };
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email.toLowerCase();

    if (profileImage && typeof profileImage === 'string' && profileImage.startsWith('data:')) {
      updateFields.profileImage = await uploadImage(profileImage);
    }

    await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── DELETE /api/cms/directors/[id] — super admin only ── */
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await requireAuth(req, 'super_admin');
    const { id } = await params;

    const db = await getDb();
    const oid = new ObjectId(id);

    const profile = await db.collection('director_profiles').findOne({ userId: oid });

    await Promise.all([
      db.collection('users').deleteOne({ _id: oid }),
      db.collection('director_profiles').deleteOne({ userId: oid }),
      profile
        ? db.collection('portfolio_versions').deleteMany({ directorId: profile._id })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
