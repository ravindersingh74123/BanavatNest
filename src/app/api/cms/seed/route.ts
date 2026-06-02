import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';
import { emptyPortfolio } from '@/lib/portfolio-types';

/**
 * POST /api/cms/seed
 * Creates the initial super admin account using env vars.
 * Idempotent — safe to call multiple times.
 */
export async function POST() {
  const email = process.env.CMS_ADMIN_EMAIL;
  const password = process.env.CMS_ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD env vars are required' },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    const existing = await db.collection('users').findOne({ email: email.toLowerCase() });

    if (existing) {
      return NextResponse.json({ message: 'Super admin already exists', seeded: false });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    const result = await db.collection('users').insertOne({
      fullName: 'Super Admin',
      username: 'superadmin',
      email: email.toLowerCase(),
      passwordHash,
      role: 'super_admin',
      profileImage: null,
      createdAt: now,
      updatedAt: now,
    });

    // Also create an empty portfolio profile for the super admin (optional)
    await db.collection('director_profiles').insertOne({
      userId: result.insertedId,
      portfolioData: emptyPortfolio(result.insertedId.toString(), 'Super Admin'),
      status: 'draft',
      publishedAt: null,
      currentVersion: 0,
      createdAt: now,
      updatedAt: now,
    });

    // Create MongoDB indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    await db.collection('director_profiles').createIndex({ userId: 1 }, { unique: true });
    await db.collection('portfolio_versions').createIndex({ directorId: 1 });

    return NextResponse.json({
      message: 'Super admin created successfully',
      seeded: true,
      email,
    });
  } catch (err) {
    console.error('[seed]', err);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
