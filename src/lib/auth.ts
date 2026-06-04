import bcryptjs from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production-please';
const COOKIE_NAME = 'cms_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/* ── Types ── */

export interface SessionPayload {
  userId: string;
  username: string;
  email: string;
  role: 'super_admin' | 'director';
  /** Set when super admin impersonates a director */
  impersonating?: string;
  iat?: number;
  exp?: number;
}

/* ── JWT (Web Crypto — no external lib) ── */

function base64url(data: Uint8Array): string {
  return Buffer.from(data).toString('base64url');
}

function base64urlDecode(str: string): Uint8Array<ArrayBuffer> {
  const buf = Buffer.from(str, 'base64url');
  // Slice into a fresh ArrayBuffer so the result satisfies BufferSource (Web Crypto API)
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  return new Uint8Array(ab);
}

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signJWT(
  payload: Omit<SessionPayload, 'iat' | 'exp'>,
  expiresInSeconds = COOKIE_MAX_AGE
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claims = { ...payload, iat: now, exp: now + expiresInSeconds };

  const enc = new TextEncoder();
  const headerB64 = base64url(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64url(enc.encode(JSON.stringify(claims)));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await getKey(JWT_SECRET);
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(signingInput));

  return `${signingInput}.${base64url(new Uint8Array(signature))}`;
}

export async function verifyJWT(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;
    const signingInput = `${headerB64}.${payloadB64}`;

    const enc = new TextEncoder();
    const key = await getKey(JWT_SECRET);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64urlDecode(sigB64),
      enc.encode(signingInput)
    );

    if (!valid) return null;

    const claims: SessionPayload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(payloadB64))
    );

    // Check expiry
    if (claims.exp && claims.exp < Math.floor(Date.now() / 1000)) return null;

    return claims;
  } catch {
    return null;
  }
}

/* ── Cookie helpers ── */

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Read and verify the session from cookies (Server Component / Route Handler) */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

/** Read and verify the session from a NextRequest (middleware-compatible) */
export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJWT(token);
}

/** Throw-style auth guard for API routes — returns session or throws Response */
export async function requireAuth(
  req: NextRequest,
  requiredRole?: 'super_admin' | 'director'
): Promise<SessionPayload> {
  const session = await getSessionFromRequest(req);
  if (!session) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (requiredRole && session.role !== requiredRole) {
    throw new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return session;
}

/* ── Password hashing ── */

export async function hashPassword(plain: string): Promise<string> {
  return bcryptjs.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(plain, hash);
}
