import { FileDropzone } from '@/components/hub/FileDropzone';
import { FileList } from '@/components/hub/FileList';
import { PastPapersArchive } from '@/components/hub/PastPapersArchive';

export default function InstructorDashboard() {
  // Using a default module for the instructor view
  const defaultModule = 'InstructorMaterials';

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to the instructor management portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <FileDropzone rgnModule={defaultModule} />
          <FileList rgnModule={defaultModule} />
        </div>

        <div className="lg:col-span-1">
          <PastPapersArchive />
        </div>
      </div>
    </div>
  );
}
