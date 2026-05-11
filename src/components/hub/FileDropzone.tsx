'use client';

import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, CheckCircle2, FileType as FileTypeIcon, FileQuestion, FileText } from 'lucide-react';
import { useFiles } from './FileContext';
import { uploadFileAction } from '@/actions/files';
import { FileType } from '@/lib/dal';

interface FileDropzoneProps {
  rgnModule: string;
}

export function FileDropzone({ rgnModule }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<FileType>('Notes');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFileOptimistically } = useFiles();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Simulate progress for UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadFileAction(formData, rgnModule, selectedFileType);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success && response.metadata) {
        addFileOptimistically(response.metadata);
        setSuccessMessage('File uploaded successfully.');
        setTimeout(() => setSuccessMessage(null), 3000); // Clear after 3 seconds
      } else {
        setErrorMessage(response.error || 'Upload failed. Please try again.');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } catch {
      clearInterval(progressInterval);
      setErrorMessage('An unexpected error occurred.');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsUploading(false);
    }
  }, [addFileOptimistically, rgnModule, selectedFileType]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upload Resources</h3>
        <div className="flex gap-2">
          {(['Notes', 'Question Paper', 'Other'] as FileType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFileType(type)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                selectedFileType === type
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {type === 'Notes' && <FileText className="inline w-4 h-4 mr-1" />}
              {type === 'Question Paper' && <FileQuestion className="inline w-4 h-4 mr-1" />}
              {type === 'Other' && <FileTypeIcon className="inline w-4 h-4 mr-1" />}
              {type}
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ease-in-out
          ${isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
          }
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Uploading {uploadProgress}%...
            </p>
          </div>
        ) : successMessage ? (
          <div className="flex flex-col items-center justify-center text-green-600 dark:text-green-500 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12 mb-3" />
            <p className="font-medium">{successMessage}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <UploadCloud className={`w-12 h-12 mb-4 transition-transform duration-200 ${isDragging ? 'scale-110 text-blue-500' : ''}`} />
            <p className="mb-2 text-sm font-semibold">
              <span className="text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF, DOC, PPT (max 50MB)
            </p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mt-4 p-3 rounded-lg bg-orange-50 text-orange-800 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
