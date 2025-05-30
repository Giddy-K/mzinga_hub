import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Content } from "@/types/content";

export async function getAllContent(): Promise<Content[]> {
  const querySnapshot = await getDocs(collection(db, "content"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Content, "id">),
  }));
}
