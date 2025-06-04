// lib/getUserRole.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserRole(email: string): Promise<"admin" | "user" | null> {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      return role === "admin" || role === "user" ? role : null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching role for", email, error);
    return null;
  }
}
