import { getDatabase, ref, remove } from "firebase/database";
import { app } from "@/lib/firebase";

export async function deleteApiaryById(id: string) {
  const db = getDatabase(app);
  await remove(ref(db, `apiaries/${id}`));
}
