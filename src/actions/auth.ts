'use server';

import { cookies } from 'next/headers';
import { verifyIdToken, createSessionCookie } from '@/lib/firebase/admin';
import { getUserProfile } from '@/lib/dal';

export async function createSession(idToken: string) {
  try {
    // 1. Verify the ID token using Firebase Admin (or mock)
    const decodedToken = await verifyIdToken(idToken);

    // 2. Fetch the user profile to ensure they exist and get their role
    const profile = await getUserProfile(decodedToken.uid);
    if (!profile) {
      throw new Error('User profile not found in database');
    }

    // 3. Create a secure JWT session cookie
    const sessionCookie = await createSessionCookie(decodedToken.uid);

    // 4. Set the HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });

    return { success: true };
  } catch (error: unknown) {
    console.error('Error creating session:', error);
    // Centralized error handling: Return clean JSON instead of crashing
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during authentication';
    return { success: false, error: errorMessage };
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}
