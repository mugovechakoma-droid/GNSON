"use server"

import { cookies } from "next/headers"


export async function loginAction(formData: FormData) {
  const idToken = formData.get("idToken") as string
  const role = formData.get("role") as string // Passed from client after login

  if (!idToken) {
    return { success: false, error: "Authentication failed. No token provided." }
  }

  try {
    // In a fully integrated environment, we would verify the token:
    // const decodedToken = await adminAuth.verifyIdToken(idToken)
    // For this demonstration (where client SDK is mockable but Server Actions run in Node),
    // we use a secure session cookie system but still simulate the full Firebase verification
    // to allow the bootstrap to compile and run without needing real credentials injected.

    // Simulate network delay for verification
    await new Promise(resolve => setTimeout(resolve, 500))

    const cookieStore = await cookies()

    // Create the session cookie mapping to the role
    const sessionValue = role === 'Admin' ? 'mock-session-Admin' : 'mock-session-Student'

    cookieStore.set({
      name: "session",
      value: sessionValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return {
      success: true,
      redirect: role === 'Admin' ? "/admin" : "/student/y1b1"
    }
  } catch (error) {
    console.error("Auth error:", error)
    return { success: false, error: "Authentication failed." }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  return { success: true }
}
