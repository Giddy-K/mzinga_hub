import { getDatabase, ref, get, child } from "firebase/database";
import { app } from "@/lib/firebase"; // if not yet imported

export async function getUserRealtimeApiaries(userId: string) {
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `apiaries`));

  if (snapshot.exists()) {
    const allApiaries = snapshot.val();
    return Object.entries(allApiaries)
      .filter(([_, apiary]: any) => apiary.ownerId === userId)
      .map(([id, data]: any) => ({ id, ...data }));
  }

  return [];
}
