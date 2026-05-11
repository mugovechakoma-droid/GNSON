import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { DownloadCloud, BookOpen } from "lucide-react"
import { getModuleMaterials } from "@/actions/db"

export default async function CurriculumPage({ params }: { params: Promise<{ yearBlock: string }> }) {
  const resolvedParams = await params;
  const block = resolvedParams.yearBlock.toLowerCase();

  // Fetch from Backend Server Action
  const modules = await getModuleMaterials(block)

  return (
    <div className="flex-1 bg-warm-bg">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight uppercase">Block: {block}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Curriculum Materials & Reading List</p>
        </div>

        {/* F-Pattern Layout for Dense Reading / Content Modules */}
        <div className="max-w-4xl space-y-8">
          {modules.map((mod, index) => (
            <Card key={index} className="border-0 shadow-md bg-white dark:bg-gray-950">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-blue-primary" />
                  <CardTitle>{mod.title}</CardTitle>
                </div>
                <CardDescription>Required reading and supplementary notes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mod.materials.map((file, fIdx) => (
                    <div key={fIdx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 ${file.type === 'PDF' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-primary' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-error'} rounded-lg flex items-center justify-center font-bold`}>
                          {file.type}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.title}</p>
                          <p className="text-xs text-gray-500">{file.category} • {file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <DownloadCloud className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
