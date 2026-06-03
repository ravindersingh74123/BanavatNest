import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { verifyPassword, signJWT, setSessionCookie } from '@/lib/auth';

/**
 * POST /api/cms/auth/director-login
 * Username + password login for directors accessing /cms/editor/[username]
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await db
      .collection('users')
      .findOne({ username: username.toLowerCase(), role: 'director' });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signJWT({
      userId: user._id.toString(),
      username: user.username,
      email: user.email ?? '',
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('[director-login]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
