'use server';

import { saveFileMetadata, getFilesByModule, getPastPapers, FileType } from '@/lib/dal';

export async function uploadFileAction(formData: FormData, rgnModule: string, fileType: FileType) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    // 1. Generate a mock Cloud Storage URL and concatenate a timestamp to prevent overwriting
    const timestamp = Date.now();
    const originalFileName = file.name;
    const extensionIndex = originalFileName.lastIndexOf('.');
    let nameWithoutExt = originalFileName;
    let ext = '';

    if (extensionIndex !== -1) {
      nameWithoutExt = originalFileName.substring(0, extensionIndex);
      ext = originalFileName.substring(extensionIndex);
    }

    const uniqueFileName = `${nameWithoutExt}_${timestamp}${ext}`;
    // Mock the URL as if it were uploaded to Firebase Storage
    const mockFileUrl = `https://storage.googleapis.com/mock-bucket/${uniqueFileName}`;

    // 2. Save metadata via DAL
    const newFileId = `file_${timestamp}_${Math.random().toString(36).substring(2, 9)}`;
    const metadata = {
      id: newFileId,
      fileName: uniqueFileName,
      fileType: fileType,
      rgnModule: rgnModule,
      fileUrl: mockFileUrl,
      uploadedAt: new Date().toISOString(),
    };

    await saveFileMetadata(metadata);

    return { success: true, metadata };
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    // Centralized error handling: Return clean JSON instead of crashing
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during file upload';
    return { success: false, error: errorMessage };
  }
}

export async function fetchFilesAction(rgnModule: string) {
  try {
    const files = await getFilesByModule(rgnModule);
    return { success: true, files };
  } catch (error: unknown) {
    console.error('Error fetching files:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching files';
    return { success: false, error: errorMessage };
  }
}

export async function fetchPastPapersAction() {
  try {
    const pastPapers = await getPastPapers();
    return { success: true, files: pastPapers };
  } catch (error: unknown) {
    console.error('Error fetching past papers:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching past papers';
    return { success: false, error: errorMessage };
  }
}
