import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { DownloadCloud, Archive } from "lucide-react"
import { getPastPapers } from "@/actions/db"

export default async function PastPapersPage() {
  const papers = await getPastPapers()

  return (
    <div className="flex-1 bg-warm-bg">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Past Papers Archive</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Auto-aggregated exam materials for revision.</p>
        </div>

        <div className="max-w-4xl">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Archive className="h-6 w-6 text-blue-primary" />
                <CardTitle>Global Question Bank</CardTitle>
              </div>
              <CardDescription>Filtered by fileType === &apos;Question Paper&apos;.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {papers.map((paper, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-success rounded-lg flex items-center justify-center font-bold">
                        PDF
                      </div>
                      <div>
                        <p className="font-medium text-sm">[{paper.year}] {paper.subject} Exam</p>
                        <p className="text-xs text-gray-500">Block: {paper.block} • {paper.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-full hidden sm:flex gap-2">
                      <DownloadCloud className="h-4 w-4" /> Download
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
                      <DownloadCloud className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
