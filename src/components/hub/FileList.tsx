'use client';

import React, { useEffect } from 'react';
import { useFiles } from './FileContext';
import { FileText, FileQuestion, FileType as FileTypeIcon, Download, AlertCircle, Loader2 } from 'lucide-react';
import { FileType } from '@/lib/dal';

interface FileListProps {
  rgnModule: string;
}

export function FileList({ rgnModule }: FileListProps) {
  const { files, isLoading, error, loadFilesForModule } = useFiles();

  useEffect(() => {
    loadFilesForModule(rgnModule);
  }, [rgnModule, loadFilesForModule]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <Loader2 className="w-8 h-8 mb-4 animate-spin text-blue-500" />
        <p>Loading files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-orange-600 dark:text-orange-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="font-medium text-center">{error}</p>
        <button
          onClick={() => loadFilesForModule(rgnModule)}
          className="mt-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4">
          <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No files yet</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
          There are no resources uploaded for this module yet. Be the first to share notes or question papers!
        </p>
      </div>
    );
  }

  const getIconForType = (type: FileType) => {
    switch (type) {
      case 'Notes':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Question Paper':
        return <FileQuestion className="w-5 h-5 text-purple-500" />;
      default:
        return <FileTypeIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Module Resources</h3>

      {/* F-Pattern Layout List */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {getIconForType(file.fileType)}
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {file.fileName}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mr-2">
                    {file.fileType}
                  </span>
                  <span>
                    Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 inline-flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                title="Download file"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
