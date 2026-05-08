"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { UploadCloud, CheckCircle2 } from "lucide-react"

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    setSuccess(false)

    // Mock upload to Firebase Cloud Storage
    setTimeout(() => {
      setIsUploading(false)
      setSuccess(true)
      // Reset after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }, 2000)
  }

  return (
    <Card className="h-full border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Resource Hub Upload</CardTitle>
        <CardDescription>Upload curriculum materials or past papers to the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">File Name</label>
            <Input name="fileName" placeholder="e.g. Intro to Anatomy" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">File Type</label>
              <select name="fileType" className="flex h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary dark:border-gray-800 dark:bg-gray-900" required>
                <option value="Notes">Notes</option>
                <option value="Lecture Material">Lecture Material</option>
                <option value="Question Paper">Question Paper</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Module Tag</label>
              <select name="rgnModule" className="flex h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary dark:border-gray-800 dark:bg-gray-900" required>
                <option value="y1b1">Year 1 Block 1</option>
                <option value="y1b2">Year 1 Block 2</option>
                <option value="y2b1">Year 2 Block 1</option>
                <option value="y2b2">Year 2 Block 2</option>
                <option value="y3b1">Year 3 Block 1</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input name="description" placeholder="Brief description of the material..." required />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium">Select File</label>
            <Input type="file" name="file" required className="pt-3" />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isUploading}>
            {isUploading ? (
              "Uploading..."
            ) : success ? (
              <span className="flex items-center text-green-success font-medium">
                <CheckCircle2 className="mr-2 h-5 w-5" /> File Uploaded
              </span>
            ) : (
              <span className="flex items-center">
                <UploadCloud className="mr-2 h-5 w-5" /> Upload Material
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
