// lib/admin/getAllUsers.ts
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  /** milliseconds since epoch – *always defined* */
  createdAt: number;
}

export async function getAllUsers(): Promise<AdminUser[]> {
  const snap = await getDocs(collection(db, "users"));

  return snap.docs.map((doc) => {
    const data = doc.data();

    // Firestore’s Timestamp → number (ms) | string → number
    const ms =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toMillis()
        : typeof data.createdAt === "string"
        ? Date.parse(data.createdAt)
        : typeof data.createdAt === "number"
        ? data.createdAt
        : Date.now(); // fallback if missing

    return {
      id: doc.id,
      name: data.name ?? "",
      email: data.email ?? "",
      role: (data.role ?? "user") as "admin" | "user",
      createdAt: ms,
    };
  });
}
