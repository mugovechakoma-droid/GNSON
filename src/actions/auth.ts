"use server"

import { cookies } from "next/headers"
import { adminAuth, adminDb } from "@/lib/firebase/admin"

export async function loginAction(formData: FormData) {
  const idToken = formData.get("idToken") as string

  if (!idToken) {
    return { success: false, error: "Authentication failed. No token provided." }
  }

  try {
    // 1. Validate the token and get the user's uid
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedToken.uid

    // 2. Determine user role from Firestore (Students collection check)
    // If they exist in students, they are a student. Else, assume Admin for the hub architecture.
    let role = "Admin"

    try {
      const studentDoc = await adminDb.collection('students').doc(uid).get()
      if (studentDoc.exists) {
        role = "Student"
      }
    } catch (dbError) {
      console.warn("Could not check student doc, using token role", dbError)
    }

    // In our mock fallback, we encoded the mock role in the token itself for demo routing
    if (decodedToken.role === 'Student') {
      role = "Student"
    } else if (decodedToken.role === 'Admin') {
      role = "Admin"
    }

    // 3. Create secure Firebase session cookie (expires in 1 week)
    const expiresIn = 60 * 60 * 24 * 7 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const cookieStore = await cookies()

    cookieStore.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    // Setting a role cookie for middleware routing (can be signed in production)
    cookieStore.set({
      name: "role",
      value: role,
      httpOnly: true, // Edge readable via headers
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    return {
      success: true,
      redirect: role === 'Admin' ? "/admin" : "/student/y1b1"
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return { success: false, error: "Authentication failed during token verification." }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  cookieStore.delete("role")
  return { success: true }
}
