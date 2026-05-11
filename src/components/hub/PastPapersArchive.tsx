'use client';

import React, { useEffect } from 'react';
import { useFiles } from './FileContext';
import { FileQuestion, Download, AlertCircle, Loader2, Search } from 'lucide-react';

export function PastPapersArchive() {
  const { pastPapers, isLoading, error, loadPastPapers } = useFiles();
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    loadPastPapers();
  }, [loadPastPapers]);

  const filteredPapers = pastPapers.filter(paper =>
    paper.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.rgnModule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading && pastPapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <Loader2 className="w-8 h-8 mb-4 animate-spin text-purple-500" />
        <p>Loading past papers archive...</p>
      </div>
    );
  }

  if (error && pastPapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-orange-600 dark:text-orange-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="font-medium text-center">{error}</p>
        <button
          onClick={() => loadPastPapers()}
          className="mt-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileQuestion className="w-6 h-6 mr-2 text-purple-500" />
              Past Papers Archive
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Global repository of all uploaded examination papers across all modules.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search papers or modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <FileQuestion className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No past papers found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchQuery ? "We couldn't find any papers matching your search." : "No past papers have been uploaded to the system yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="relative flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 truncate">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg flex-shrink-0">
                      <FileQuestion className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={paper.fileName}>
                        {paper.fileName}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-0.5">
                        Module: {paper.rgnModule}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(paper.uploadedAt).toLocaleDateString()}
                  </span>

                  <a
                    href={paper.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
