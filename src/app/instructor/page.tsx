import { FileDropzone } from '@/components/hub/FileDropzone';
import { FileList } from '@/components/hub/FileList';
import { PastPapersArchive } from '@/components/hub/PastPapersArchive';
import { Card } from '@/components/ui/Card';

export default function InstructorDashboard() {
  // Using a default module for the instructor view
  const defaultModule = 'InstructorMaterials';

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">Instructor Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Welcome to the instructor management portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Overview / Alerts - Top Left (F-Pattern) */}
        <Card className="lg:col-span-2 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
           <h2 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-300">Active Module: {defaultModule}</h2>
           <p className="text-blue-700 dark:text-blue-400 text-sm">Upload class notes, assign past papers, and manage resources for your current class block.</p>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-1">
            <h2 className="text-sm font-semibold mb-1 text-zinc-500 dark:text-zinc-400">Total Uploads</h2>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">12</p>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
             <FileDropzone rgnModule={defaultModule} />
          </Card>
          <Card>
             <FileList rgnModule={defaultModule} />
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
