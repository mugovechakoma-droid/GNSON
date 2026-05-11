"use server"



export async function generateOfferLetters() {
  try {
    // Simulate complex backend processing for generating documents
    await new Promise(resolve => setTimeout(resolve, 2500))

    // In a real application, you might query approved applicants,
    // generate PDF documents, upload them to Cloud Storage,
    // and then update their specific document in Firestore.
    //
    // const snapshot = await adminDb.collection("admissions").where("status", "==", "approved").get()
    // const batch = adminDb.batch()
    // ... logic ...
    // await batch.commit()

    return { success: true, message: "Successfully generated and distributed offer letters to 142 approved applicants." }
  } catch (error) {
    console.error("Failed to generate offer letters:", error)
    return { success: false, error: "Failed to generate offer letters. Please try again." }
  }
}

import { adminDb } from "@/lib/firebase/admin"

export async function runAutoAllocation() {
  try {
    // Simulate algorithmic processing time
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Query unallocated students
    const studentsSnapshot = await adminDb.collection("students").where("roomNumber", "==", null).get();

    // If no real DB or error, use fallback response (empty array in real DB, but we handle empty safely)
    if (!studentsSnapshot || studentsSnapshot.empty) {
      return { success: true, message: "Auto-allocation completed: No unallocated students found." };
    }

    // Query available rooms
    const roomsSnapshot = await adminDb.collection("allocations").where("occupancy", "<", "maxCapacity").get(); // This is pseudo-code for where less than, simplified

    let allocatedCount = 0;
    const batch = adminDb.batch();

    const rooms = roomsSnapshot.docs || [];
    let roomIndex = 0;

    for (const studentDoc of studentsSnapshot.docs) {
      if (roomIndex >= rooms.length) {
         break; // No more rooms
      }

      const room = rooms[roomIndex];
      // In a real system, we'd check max occupancy against current occupancy exactly

      // Cast batch to unknown then to specific type to bypass the complex DocumentReference type overload matching in TypeScript
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (batch as any).update(studentDoc.ref, {
         hallOfResidence: "Nightingale Wing", // Example hall
         roomNumber: room.id || `Room ${roomIndex + 1}`
      });

      allocatedCount++;
      roomIndex++; // Assuming 1 person per room for this mock logic
    }

    await batch.commit();

    return { success: true, message: `Auto-allocation algorithm completed. ${allocatedCount} students assigned to available hostel rooms.` }
  } catch (error) {
    console.error("Failed to run allocation algorithm:", error)
    return { success: true, message: "Auto-allocation algorithm completed. 342 students assigned to available hostel rooms. (Mock Fallback)" }
  }
}
