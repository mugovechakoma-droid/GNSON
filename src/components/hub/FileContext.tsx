'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FileMetadata } from '@/lib/dal';
import { fetchFilesAction, fetchPastPapersAction } from '@/actions/files';

interface FileContextType {
  files: FileMetadata[];
  pastPapers: FileMetadata[];
  isLoading: boolean;
  error: string | null;
  loadFilesForModule: (rgnModule: string) => Promise<void>;
  loadPastPapers: () => Promise<void>;
  addFileOptimistically: (file: FileMetadata) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [pastPapers, setPastPapers] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFilesForModule = useCallback(async (rgnModule: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFilesAction(rgnModule);
      if (response.success && response.files) {
        setFiles(response.files);
      } else {
        setError(response.error || 'Failed to fetch files');
      }
    } catch {
      setError('An unexpected error occurred while fetching files');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPastPapers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPastPapersAction();
      if (response.success && response.files) {
        setPastPapers(response.files);
      } else {
        setError(response.error || 'Failed to fetch past papers');
      }
    } catch {
      setError('An unexpected error occurred while fetching past papers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFileOptimistically = useCallback((file: FileMetadata) => {
    setFiles(prev => [...prev, file]);
    if (file.fileType === 'Question Paper') {
      setPastPapers(prev => [...prev, file]);
    }
  }, []);

  return (
    <FileContext.Provider value={{
      files,
      pastPapers,
      isLoading,
      error,
      loadFilesForModule,
      loadPastPapers,
      addFileOptimistically
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
