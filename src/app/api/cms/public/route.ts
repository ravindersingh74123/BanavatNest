import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

/* ── GET /api/cms/public — list all published directors grouped by tag ── */
export async function GET() {
  try {
    const db = await getDb();

    const publishedProfiles = await db
      .collection('director_profiles')
      .find({ status: 'published' })
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
        tag: user?.tag ?? 'Board of Director',
        priorityValue: user?.priorityValue ?? 0,
        publishedAt: profile.publishedAt,
        boardPreview: data?.boardPreview ?? null,
      };
    });

    // Group by tag and sort by priorityValue ascending
    const boardDirectors = directors
      .filter((d) => d.tag === 'Board of Director')
      .sort((a, b) => (a.priorityValue ?? 0) - (b.priorityValue ?? 0));

    const associateDirectors = directors
      .filter((d) => d.tag === 'Associate Director')
      .sort((a, b) => (a.priorityValue ?? 0) - (b.priorityValue ?? 0));

    return NextResponse.json({ directors, boardDirectors, associateDirectors });
  } catch (err) {
    console.error('[public directors list]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
