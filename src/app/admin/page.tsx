import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { UploadForm } from "@/components/admin/UploadForm"
import { AdmissionsActions } from "@/components/admin/AdmissionsActions"
import { Users, Building, FileText } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Central management system for The HUB.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Top left - Stats / Overview */}
        <Card className="col-span-1 md:col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Current active metrics across the institution.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
              <Users className="h-8 w-8 text-blue-primary mb-2" />
              <span className="text-2xl font-bold">1,248</span>
              <span className="text-xs text-gray-500">Students</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
              <Building className="h-8 w-8 text-blue-primary mb-2" />
              <span className="text-2xl font-bold">342</span>
              <span className="text-xs text-gray-500">Rooms Allocated</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
              <FileText className="h-8 w-8 text-blue-primary mb-2" />
              <span className="text-2xl font-bold">89</span>
              <span className="text-xs text-gray-500">Active Modules</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
              <UploadCloud className="h-8 w-8 text-blue-primary mb-2" />
              <span className="text-2xl font-bold">2.4k</span>
              <span className="text-xs text-gray-500">Resources</span>
            </div>
          </CardContent>
        </Card>

        {/* Top right - Interactive Admissions Actions Component */}
        <div className="col-span-1">
          <AdmissionsActions />
        </div>

        {/* Bottom row - Upload Form spanning 2 cols */}
        <div className="col-span-1 md:col-span-2">
          <UploadForm />
        </div>

        {/* Bottom right - Recent Activity */}
        <Card className="col-span-1 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">New resource uploaded</p>
                    <p className="text-xs text-gray-500">Anatomy Notes added to Y1B1.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

function UploadCloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}
