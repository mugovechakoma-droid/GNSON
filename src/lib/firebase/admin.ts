// Mock Firebase Admin Auth for development purposes

import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev');

export async function verifyIdToken(idToken: string) {
  // Mock validation - in real life this calls admin.auth().verifyIdToken()
  if (idToken === 'mock_admin_token') {
    return { uid: 'admin_user_id', email: 'admin@hub.edu' };
  } else if (idToken === 'mock_instructor_token') {
    return { uid: 'instructor_user_id', email: 'instructor@hub.edu' };
  } else if (idToken === 'mock_student_token') {
    return { uid: 'student_user_id', email: 'student@hub.edu' };
  }

  throw new Error('Invalid mock ID token');
}

export async function createSessionCookie(uid: string) {
  const jwt = await new SignJWT({ uid })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1w')
    .sign(JWT_SECRET);

  return jwt;
}

export async function verifySessionCookie(sessionCookie: string) {
  try {
    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET);
    return payload;
  } catch {
    throw new Error('Invalid session cookie');
  }
}
