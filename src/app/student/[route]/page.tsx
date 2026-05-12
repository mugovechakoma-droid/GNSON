import { FileDropzone } from '@/components/hub/FileDropzone';
import { FileList } from '@/components/hub/FileList';
import { PastPapersArchive } from '@/components/hub/PastPapersArchive';
import { Card } from '@/components/ui/Card';

export default async function StudentModule({ params }: { params: Promise<{ route: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">Student Module: {resolvedParams.route}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Welcome to your specifically authorized route.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Room Allocation - Top Left (F-Pattern) */}
        <Card className="lg:col-span-2 bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30">
           <h2 className="text-xl font-semibold mb-2 text-purple-900 dark:text-purple-300">Next Lecture Room</h2>
           <p className="text-purple-700 dark:text-purple-400 font-medium">Room 402 - Main Building</p>
           <p className="text-purple-600/80 dark:text-purple-400/80 text-sm mt-1">Class starts in 45 minutes.</p>
        </Card>

        {/* Study Stats */}
        <Card className="lg:col-span-1">
            <h2 className="text-sm font-semibold mb-1 text-zinc-500 dark:text-zinc-400">Notes Downloaded</h2>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">8</p>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <FileDropzone rgnModule={resolvedParams.route} />
          </Card>
          <Card>
            <FileList rgnModule={resolvedParams.route} />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <PastPapersArchive />
          </Card>
        </div>
      </div>
    </div>
  );
}
