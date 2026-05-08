import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { DownloadCloud, BookOpen } from "lucide-react"

// Mock data mapping blocks to modules
const blockModules: Record<string, string[]> = {
  y1b1: ["Anatomy & Physiology", "Nursing Science and Arts", "Life Skills", "First Aid", "Biochemistry", "Biophysics"],
  y1b2: ["Basic and Plastic Surgery", "Pharmacology", "Infection Prevention and Control", "Epidemiology", "HIV/AIDS"],
  y2b1: ["Child Health II/Paediatrics", "Gastrointestinal", "Cardiovascular", "Urology", "Respiratory"],
  y2b2: ["Neurology", "Orthopaedics", "Mental Health and Psychiatric Nursing", "Ophthalmology"],
  y3b1: ["Geriatrics", "Dermatology", "Nursing Management", "Entrepreneurship"]
}

export default async function CurriculumPage({ params }: { params: Promise<{ yearBlock: string }> }) {
  const resolvedParams = await params;
  const block = resolvedParams.yearBlock.toLowerCase();
  const modules = blockModules[block] || ["Module not found"];

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
                  <CardTitle>{mod}</CardTitle>
                </div>
                <CardDescription>Required reading and supplementary notes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock Files for this module */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-primary rounded-lg flex items-center justify-center font-bold">
                        PDF
                      </div>
                      <div>
                        <p className="font-medium text-sm">Unit 1: Introduction to {mod}</p>
                        <p className="text-xs text-gray-500">Lecture Material • 2.4 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <DownloadCloud className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 text-orange-error rounded-lg flex items-center justify-center font-bold">
                        PPT
                      </div>
                      <div>
                        <p className="font-medium text-sm">Class Slides: {mod}</p>
                        <p className="text-xs text-gray-500">Notes • 5.1 MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <DownloadCloud className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
