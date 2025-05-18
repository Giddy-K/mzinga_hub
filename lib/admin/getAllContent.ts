// /lib/admin/content.ts
import { db } from "@/lib/firebase"; // your firebase config
import { collection, getDocs } from "firebase/firestore";

export async function getAllContent() {
  const querySnapshot = await getDocs(collection(db, "content"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
}
