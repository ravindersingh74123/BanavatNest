import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import type { PortfolioData } from '@/lib/portfolio-types';

type Params = { params: Promise<{ id: string }> };

function validatePortfolio(data: PortfolioData): string[] {
  const errors: string[] = [];
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.role?.trim()) errors.push('Role is required');
  if (!data.bio?.trim()) errors.push('Biography is required');
  if (!data.contact?.email?.trim()) errors.push('Contact email is required');
  return errors;
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const session = await requireAuth(req);
    const { id } = await params;

    if (session.role === 'director' && session.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const oid = new ObjectId(id);

    const profile = await db.collection('director_profiles').findOne({ userId: oid });
    if (!profile) return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });

    // Validate required fields
    const errors = validatePortfolio(profile.portfolioData as PortfolioData);
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 422 });
    }

    const nextVersion = (profile.currentVersion ?? 0) + 1;
    const now = new Date();

    // Create version snapshot
    await db.collection('portfolio_versions').insertOne({
      directorId: profile._id,
      userId: oid,
      versionNumber: nextVersion,
      portfolioJson: profile.portfolioData,
      createdAt: now,
      createdBy: session.username,
    });

    // Mark as published
    await db.collection('director_profiles').updateOne(
      { userId: oid },
      {
        $set: {
          status: 'published',
          publishedAt: now,
          currentVersion: nextVersion,
          updatedAt: now,
        },
      }
    );

    return NextResponse.json({
      success: true,
      status: 'published',
      versionNumber: nextVersion,
      publishedAt: now,
    });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error('[publish]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
