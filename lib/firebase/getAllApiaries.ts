import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase";

export async function getAllApiaries() {
  const db = getDatabase(app);
  const snapshot = await get(ref(db, "apiaries"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
}
