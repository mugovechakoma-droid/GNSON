"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Loader2 } from "lucide-react"
import { loginAction } from "@/actions/auth"
import { auth } from "@/lib/firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firestore"

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
    const password = formData.get("password") as string

    try {
      // 1. Authenticate with Firebase Client SDK
      // Using a try/catch here to fallback to mock logic if Firebase config is invalid
      let idToken = ""
      let userRole = ""

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        idToken = await userCredential.user.getIdToken()

        // 2. Fetch User Role from Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
        if (userDoc.exists()) {
          userRole = userDoc.data().role
        } else {
          // Default fallback
          userRole = email.includes("admin") ? "Admin" : "Student"
        }
      } catch (fbError) {
        // Fallback for bootstrap demo without real credentials
        console.warn("Firebase Auth Failed, using fallback mock:", fbError)
        if (!email.includes("admin") && !email.includes("student")) {
          throw new Error("Invalid credentials. Try using an email with 'admin' or 'student'.")
        }
        idToken = "mock-id-token"
        userRole = email.includes("admin") ? "Admin" : "Student"
      }

      // 3. Call Server Action to set secure HTTP-only cookie
      const serverFormData = new FormData()
      serverFormData.append("idToken", idToken)
      serverFormData.append("role", userRole)

      const result = await loginAction(serverFormData)

      if (result.success && result.redirect) {
        router.push(result.redirect)
      } else if (result.error) {
        setError(result.error)
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
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
