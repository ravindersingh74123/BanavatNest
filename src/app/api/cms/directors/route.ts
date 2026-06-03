import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth, hashPassword } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';
import { emptyPortfolio } from '@/lib/portfolio-types';

/* ── GET /api/cms/directors — list all directors (super_admin only) ── */
export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req, 'super_admin');
    void session;

    const db = await getDb();
    const users = await db
      .collection('users')
      .find({ role: 'director' })
      .sort({ createdAt: -1 })
      .toArray();

    const profiles = await db.collection('director_profiles').find().toArray();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const directors = users.map((u) => {
      const profile = profileMap.get(u._id.toString());
      return {
        id: u._id.toString(),
        fullName: u.fullName,
        username: u.username,
        email: u.email ?? '',
        role: u.role,
        tag: u.tag ?? 'Board of Director',
        priorityValue: u.priorityValue ?? 0,
        profileImage: u.profileImage ?? null,
        portfolioStatus: profile?.status ?? 'draft',
        publishedAt: profile?.publishedAt ?? null,
        lastUpdated: profile?.updatedAt ?? u.updatedAt,
        currentVersion: profile?.currentVersion ?? 0,
      };
    });

    return NextResponse.json({ directors });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[GET directors]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── POST /api/cms/directors — create a new director (super_admin only) ── */
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(req, 'super_admin');
    void session;

    const body = await req.json();
    const {
      fullName,
      username,
      password,
      profileImage,
      tag = 'Board of Director',
      priorityValue = 0,
    } = body;

    if (!fullName || !username || !password) {
      return NextResponse.json(
        { error: 'fullName, username, and password are required' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check username uniqueness only
    const existing = await db.collection('users').findOne({
      username: username.toLowerCase(),
    });
    if (existing) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // Upload profile image to Cloudinary if provided
    let imageUrl: string | null = null;
    if (profileImage && typeof profileImage === 'string' && profileImage.startsWith('data:')) {
      imageUrl = await uploadImage(profileImage);
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    const userResult = await db.collection('users').insertOne({
      fullName,
      username: username.toLowerCase(),
      passwordHash,
      role: 'director',
      tag,
      priorityValue: Number(priorityValue) || 0,
      profileImage: imageUrl,
      createdAt: now,
      updatedAt: now,
    });

    const userId = userResult.insertedId;
    const portfolio = emptyPortfolio(userId.toString(), fullName);
    if (imageUrl) portfolio.image = imageUrl;

    await db.collection('director_profiles').insertOne({
      userId,
      portfolioData: portfolio,
      status: 'draft',
      publishedAt: null,
      currentVersion: 0,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        director: {
          id: userId.toString(),
          fullName,
          username: username.toLowerCase(),
          role: 'director',
          tag,
          priorityValue: Number(priorityValue) || 0,
          profileImage: imageUrl,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[POST directors]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
