"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    // Mock authentication and RBAC logic
    setTimeout(() => {
      setIsLoading(false)

      if (email.includes("admin")) {
        // Set a mock cookie for middleware to read
        document.cookie = "role=Admin; path=/"
        router.push("/admin")
      } else if (email.includes("student")) {
        document.cookie = "role=Student; path=/"
        // Mock currentYear and currentBlock
        router.push("/student/y1b1")
      } else {
        setError("Invalid credentials. Try using an email with 'admin' or 'student'.")
      }
    }, 1500)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-2 text-center pb-8 pt-10">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription>
            Enter your institutional email to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@institution.edu"
                  required
                  className="bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="bg-transparent"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm font-medium text-orange-error text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full rounded-2xl h-12 text-base shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
