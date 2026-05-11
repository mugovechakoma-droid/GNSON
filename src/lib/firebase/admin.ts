import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// In a real application, you would load these from environment variables securely.
// For this bootstrap implementation without credentials, we mock the admin initialization.

const mockAdminApp = {
  firestore: () => ({
    batch: () => ({
      set: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      update: (ref: any, data: any) => {},
      delete: () => {},
      commit: async () => {}
    }),
    collection: () => ({
      doc: () => ({
        get: async () => ({
          exists: true,
          data: () => ({ /* mock data */ })
        }),
        set: async () => { /* mock set */ }
      }),
      add: async () => ({ id: 'mock-id' }),
      where: () => ({
        get: async () => ({
          empty: false,
          docs: [
            { id: 'mock-doc-1', ref: { id: 'mock-doc-1' }, data: () => ({ title: 'Mock Document 1' }) },
            { id: 'mock-doc-2', ref: { id: 'mock-doc-2' }, data: () => ({ title: 'Mock Document 2' }) }
          ]
        })
      })
    })
  }),
  auth: () => ({
    verifyIdToken: async (token: string) => {
      // Decode mock role from token fallback
      if (token.includes('admin')) return { uid: 'mock-admin', role: 'Admin' };
      if (token.includes('student')) return { uid: 'mock-student', role: 'Student' };
      return { uid: 'mock-uid-123' };
    },
    createSessionCookie: async () => 'mock-secure-session-cookie',
    verifySessionCookie: async () => {
      return { uid: 'mock-uid-123', role: 'mock' };
    }
  }),
  storage: () => ({
    bucket: () => ({
      file: () => ({
        save: async () => { /* mock save */ },
        getSignedUrl: async () => ['mock-url']
      })
    })
  })
};

// Only initialize the real admin SDK if credentials are provided in env,
// otherwise use the mock version to allow the app to run and demonstrate architecture.
let adminApp: admin.app.App | typeof mockAdminApp = mockAdminApp;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && !admin.apps.length) {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    });
  } else if (admin.apps.length) {
    adminApp = admin.app();
  }
} catch (error: unknown) {
  // Fallback to mock if parsing fails
  console.warn("Failed to initialize Firebase Admin SDK. Falling back to mock implementation.", error);
}

export const adminDb = adminApp.firestore();
export const adminAuth = adminApp.auth();
export const adminStorage = adminApp.storage();
