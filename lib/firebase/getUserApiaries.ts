import { db } from "@/lib/firebase"; // Firestore init
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserApiaries(userId: string) {
  const q = query(collection(db, "apiaries"), where("ownerId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
