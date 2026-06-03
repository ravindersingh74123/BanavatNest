import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth, signJWT, setSessionCookie } from '@/lib/auth';
import { ObjectId } from 'mongodb';

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const adminSession = await requireAuth(req, 'super_admin');
    const { id } = await params;

    const db = await getDb();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(id) },
      { projection: { passwordHash: 0 } }
    );

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Issue a token for the target director, noting who is impersonating
    const token = await signJWT({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      impersonating: adminSession.username,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      redirectTo: `/cms/editor/${user.username}`,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    if (err instanceof Response) return err;
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
