// import { getDatabase, ref, get, child } from "firebase/database";
// import { app } from "@/lib/firebase";
// import type { Apiary } from "@/types/apiary";

// export async function getUserRealtimeApiaries(userId: string): Promise<(Apiary & { id: string })[]> {
//   const dbRef = ref(getDatabase(app));
//   const snapshot = await get(child(dbRef, `apiaries`));

//   if (snapshot.exists()) {
//     const allApiaries = snapshot.val() as Record<string, Apiary>;

//     return Object.entries(allApiaries)
//       // Filter apiaries owned by userId
//       .filter(([, apiary]) => apiary.ownerId === userId)
//       // Map to add id property
//       .map(([id, data]) => ({ id, ...data }));
//   }

//   return [];
// }


import type { Apiary } from "@/types/apiary";
import { adminDB } from "../firebase-admin";

export async function getUserRealtimeApiaries(
  userEmail: string,
): Promise<(Apiary & { id: string })[]> {
  const snap = await adminDB.ref("apiaries").once("value");

  if (!snap.exists()) return [];

  const all = snap.val() as Record<string, Apiary>;
  return Object.entries(all)
  .filter(([, apiary]) => apiary.ownerId === userEmail || apiary.ownerEmail === userEmail)
  .map(([id, data]) => ({ id, ...data }));

}
