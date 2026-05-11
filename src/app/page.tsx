'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPasswordMock } from '@/lib/firebase/client';
import { createSession } from '@/actions/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Initial auth processed by Firebase Auth (Mocked here)
      const credential = await signInWithEmailAndPasswordMock(email, password);
      const idToken = await credential.user.getIdToken();

      // 2. Call Server Action to create secure session cookie
      const sessionResult = await createSession(idToken);

      if (!sessionResult.success) {
         // Display gentle Orange error state using centralized error message
         setError(sessionResult.error || 'Failed to create session. Please try again.');
         return;
      }

      // 3. Route to the neutral dispatcher protected route
      // Let the Middleware (Front Controller) handle RBAC and redirect to the specific dashboards
      router.push('/dashboard');

    } catch (err: unknown) {
      console.error('Login error:', err);
      // Gentle Orange error state
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-2">The Hub</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50">
             <p className="text-orange-600 dark:text-orange-400 text-sm font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="student@hub.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-400">
          <p>Mock Accounts: admin@hub.edu, instructor@hub.edu, student@hub.edu (pw: password)</p>
        </div>
      </div>
    </div>
  );
}
