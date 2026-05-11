"use server"

import { adminDb, adminAuth } from "@/lib/firebase/admin"
import { cookies } from "next/headers"

// Helper to verify session before allowing data access
async function verifySession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value
  if (!sessionCookie) throw new Error("Unauthorized")

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)
    return decodedToken.uid
  } catch {
    throw new Error("Unauthorized")
  }
}

export async function getStudentDashData() {
  try {
    const uid = await verifySession()

    // Attempt real Firebase query
    const docRef = adminDb.collection("students").doc(uid)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data() as Record<string, unknown>
      return {
        hallOfResidence: (data?.hallOfResidence as string) || "Nightingale Wing",
        roomNumber: (data?.roomNumber as string) || "402-B",
        recentGrades: (data?.recentGrades as { subject: string, score: string, status: string }[]) || [
          { subject: "Anatomy Quiz 1", score: "85%", status: "completed" },
          { subject: "Physiology Midterm", score: "92%", status: "completed" },
          { subject: "Life Skills Essay", score: "Pending", status: "pending" }
        ]
      }
    }
  } catch {
    console.warn("DB getStudentDashData error, falling back")
  }

  // Fallback if document doesn't exist or error occurs (for bootstrap demo)
  return {
    hallOfResidence: "Nightingale Wing",
    roomNumber: "402-B",
    recentGrades: [
      { subject: "Anatomy Quiz 1", score: "85%", status: "completed" },
      { subject: "Physiology Midterm", score: "92%", status: "completed" },
      { subject: "Life Skills Essay", score: "Pending", status: "pending" }
    ]
  }
}

export async function getModuleMaterials(block: string) {
  try {
    await verifySession()

    // Attempt real Firebase query
    const materialsRef = adminDb.collection("materials").where("rgnModule", "==", block.toLowerCase())
    const snapshot = await materialsRef.get()

    if (!snapshot.empty) {
      const groupedData: Record<string, {title: string, materials: {title: string, type: string, size: string, category: string}[]}> = {}

      snapshot.docs.forEach((doc: { data: () => unknown }) => {
        const data = doc.data() as Record<string, unknown>
        const modTitle = (data.title as string) || "General Material"
        if (!groupedData[modTitle]) {
          groupedData[modTitle] = { title: modTitle, materials: [] }
        }
        groupedData[modTitle].materials.push({
          title: (data.fileName as string) || (data.originalName as string),
          type: data.fileType === "Notes" ? "PPT" : "PDF",
          size: "Unknown",
          category: data.fileType as string
        })
      })

      const result = Object.values(groupedData)
      if (result.length > 0) return result
    }
  } catch {
    console.warn("DB getModuleMaterials error, falling back")
  }

  // Fallback default structure
  const blockModules: Record<string, string[]> = {
    y1b1: ["Anatomy & Physiology", "Nursing Science and Arts", "Life Skills", "First Aid", "Biochemistry", "Biophysics"],
    y1b2: ["Basic and Plastic Surgery", "Pharmacology", "Infection Prevention and Control", "Epidemiology", "HIV/AIDS"],
    y2b1: ["Child Health II/Paediatrics", "Gastrointestinal", "Cardiovascular", "Urology", "Respiratory"],
    y2b2: ["Neurology", "Orthopaedics", "Mental Health and Psychiatric Nursing", "Ophthalmology"],
    y3b1: ["Geriatrics", "Dermatology", "Nursing Management", "Entrepreneurship"]
  }

  const modules = blockModules[block.toLowerCase()] || ["Module not found"]

  return modules.map(mod => ({
    title: mod,
    materials: [
      { title: `Unit 1: Introduction to ${mod}`, type: "PDF", size: "2.4 MB", category: "Lecture Material" },
      { title: `Class Slides: ${mod}`, type: "PPT", size: "5.1 MB", category: "Notes" }
    ]
  }))
}

export async function getPastPapers() {
  try {
    await verifySession()

    // Attempt real Firebase query
    const papersRef = adminDb.collection("materials").where("fileType", "==", "Question Paper")
    const snapshot = await papersRef.get()

    if (!snapshot.empty) {
      return snapshot.docs.map((doc: { data: () => unknown }) => {
        const data = doc.data() as Record<string, unknown>
        return {
          year: new Date((data.createdAt as { toDate?: () => Date })?.toDate?.() || Date.now()).getFullYear().toString(),
          block: ((data.rgnModule as string) || "Unknown").toUpperCase(),
          subject: (data.fileName as string) || "Exam Paper",
          size: "Unknown"
        }
      })
    }
  } catch {
     console.warn("DB getPastPapers error, falling back")
  }

  // Fallback default list
  return [
    { year: "2023", block: "Y1B1", subject: "Anatomy & Physiology", size: "1.2 MB" },
    { year: "2023", block: "Y2B1", subject: "Paediatrics", size: "3.4 MB" },
    { year: "2022", block: "Y1B1", subject: "Life Skills", size: "800 KB" },
    { year: "2022", block: "Y3B1", subject: "Nursing Management", size: "2.1 MB" },
  ]
}
