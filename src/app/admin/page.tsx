import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Welcome to the central management portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Alerts - Top Left (F-Pattern) */}
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">System Alerts</h2>
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-400">
            <p className="font-medium">All systems operational.</p>
            <p className="text-sm mt-1">Firebase connection stable. JWT Authentication active.</p>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start text-left">Manage Roles</Button>
            <Button variant="secondary" className="w-full justify-start text-left">View System Logs</Button>
            <Button variant="secondary" className="w-full justify-start text-left">Configuration</Button>
          </div>
        </Card>

        {/* User Management Summary */}
        <Card className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">User Management</h2>
            <Button variant="secondary">View All Users</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Admins</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">1</p>
            </div>
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Instructors</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">5</p>
            </div>
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Students</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">120</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
