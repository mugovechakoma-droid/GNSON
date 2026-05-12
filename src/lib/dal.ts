// Mock Data Access Layer (DAL) for Firestore users collection
// Since we don't have active Firebase credentials, this will act as the data layer

export type UserRole = 'Admin' | 'Instructor' | 'Student';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  currentYear?: string;
  currentBlock?: string;
}

const mockDatabase: Record<string, UserProfile> = {
  'admin_user_id': {
    uid: 'admin_user_id',
    email: 'admin@hub.edu',
    role: 'Admin',
  },
  'instructor_user_id': {
    uid: 'instructor_user_id',
    email: 'instructor@hub.edu',
    role: 'Instructor',
  },
  'student_user_id': {
    uid: 'student_user_id',
    email: 'student@hub.edu',
    role: 'Student',
    currentYear: '1',
    currentBlock: '1',
  }
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  // Simulate network delay
  // await new Promise(resolve => setTimeout(resolve, 100));

  const profile = mockDatabase[uid];

  if (!profile) {
    return null;
  }

  return profile;
}

export type FileType = 'Notes' | 'Question Paper' | 'Other';

export interface FileMetadata {
  id: string;
  fileName: string;
  fileType: FileType;
  rgnModule: string; // e.g., 'Biochemistry', 'Anatomy', 'y1b1'
  fileUrl: string;
  uploadedAt: string;
}

// Mock database for files
const mockFilesDatabase: FileMetadata[] = [];

export async function saveFileMetadata(metadata: FileMetadata): Promise<void> {
  mockFilesDatabase.push(metadata);
}

export async function getFilesByModule(rgnModule: string): Promise<FileMetadata[]> {
  return mockFilesDatabase.filter(file => file.rgnModule === rgnModule);
}

export async function getPastPapers(): Promise<FileMetadata[]> {
  return mockFilesDatabase.filter(file => file.fileType === 'Question Paper');
}
