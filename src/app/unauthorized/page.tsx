import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-orange-50 dark:bg-orange-950/30 rounded-2xl shadow-sm border border-orange-200 dark:border-orange-900/50 text-center">
        <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">Unauthorized</h1>
        <p className="text-orange-800 dark:text-orange-200 mb-6">You do not have permission to view this page.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          Return to Login
        </Link>
      </div>
    </div>
  );
}
