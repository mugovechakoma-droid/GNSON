import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Building, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Student Hub</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Welcome back. Here is your overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Room Allocation */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <Building className="h-8 w-8 text-blue-primary mb-2" />
            <CardTitle>Room Allocation</CardTitle>
            <CardDescription>Your current housing status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="pt-4">
              <p className="text-sm text-gray-500">Hall of Residence</p>
              <p className="text-xl font-bold">Nightingale Wing</p>
              <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <p className="text-sm text-gray-500">Room Number</p>
                <p className="text-3xl font-black text-blue-primary">402-B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <GraduationCap className="h-8 w-8 text-blue-primary mb-2" />
            <CardTitle>Academic Progress</CardTitle>
            <CardDescription>Recent assessment results.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Anatomy Quiz 1</span>
                <span className="text-green-success font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Physiology Midterm</span>
                <span className="text-green-success font-bold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Life Skills Essay</span>
                <span className="font-bold">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <FileText className="h-8 w-8 text-blue-primary mb-2" />
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Navigate to your core resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/student/y1b1" className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm flex justify-between items-center">
                Current Block (Y1B1)
                <span className="text-blue-primary">&rarr;</span>
              </Link>
              <Link href="/past-papers" className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm flex justify-between items-center">
                Past Papers Archive
                <span className="text-blue-primary">&rarr;</span>
              </Link>
              <Link href="/simulation" className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm flex justify-between items-center">
                Clinical Simulations
                <span className="text-blue-primary">&rarr;</span>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
