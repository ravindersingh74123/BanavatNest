import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

/* ── GET /api/cms/public — list all published directors (for board page) ── */
export async function GET() {
  try {
    const db = await getDb();

    const publishedProfiles = await db
      .collection('director_profiles')
      .find({ status: 'published' })
      .sort({ publishedAt: 1 })
      .toArray();

    const userIds = publishedProfiles.map((p) => p.userId);
    const users = await db
      .collection('users')
      .find({ _id: { $in: userIds } }, { projection: { passwordHash: 0 } })
      .toArray();

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    const directors = publishedProfiles.map((profile) => {
      const user = userMap.get(profile.userId.toString());
      const data = profile.portfolioData;
      return {
        id: user?._id.toString() ?? '',
        username: user?.username ?? '',
        fullName: user?.fullName ?? data?.name ?? '',
        role: data?.role ?? '',
        image: data?.image ?? user?.profileImage ?? null,
        bio: typeof data?.bio === 'string' ? data.bio.slice(0, 300) : '',
        publishedAt: profile.publishedAt,
      };
    });

    return NextResponse.json({ directors });
  } catch (err) {
    console.error('[public directors list]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
