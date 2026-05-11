import { FileDropzone } from '@/components/hub/FileDropzone';
import { FileList } from '@/components/hub/FileList';
import { PastPapersArchive } from '@/components/hub/PastPapersArchive';

export default async function StudentModule({ params }: { params: Promise<{ route: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Module: {resolvedParams.route}</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your specifically authorized route.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <FileDropzone rgnModule={resolvedParams.route} />
          <FileList rgnModule={resolvedParams.route} />
        </div>

        <div className="lg:col-span-1">
          <PastPapersArchive />
        </div>
      </div>
    </div>
  );
}
