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

    // 2. Determine user role and routing data from Firestore
    let role = "Admin"
    let currentYear = "y1"
    let currentBlock = "b1"

    try {
      const studentDoc = await adminDb.collection('students').doc(uid).get()
      if (studentDoc.exists) {
        role = "Student"
        const data = studentDoc.data() as Record<string, unknown>
        // Extract real student attributes if they exist, otherwise fallback to y1b1 default
        if (data?.currentYear) currentYear = (data.currentYear as string).toLowerCase()
        if (data?.currentBlock) currentBlock = (data.currentBlock as string).toLowerCase()
      }
    } catch (dbError) {
      console.warn("Could not check student doc, using token role", dbError)
    }

    // In our mock fallback, we encoded the mock role in the token itself for demo routing
    if (decodedToken.role === 'Student') {
      role = "Student"
      // Mock attributes for demo student
      currentYear = "y1"
      currentBlock = "b1"
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

    cookieStore.set({
      name: "role",
      value: role,
      httpOnly: true, // Edge readable via headers
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })

    // If it's a student, we store their specific target route in a cookie for middleware to use
    // because middleware cannot query the DB directly to find out where to send them.
    const studentRoute = `/student/${currentYear}${currentBlock}`
    if (role === 'Student') {
      cookieStore.set({
        name: "student_route",
        value: studentRoute,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })
    }

    return {
      success: true,
      redirect: role === 'Admin' ? "/admin" : studentRoute
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
  cookieStore.delete("student_route")
  return { success: true }
}
