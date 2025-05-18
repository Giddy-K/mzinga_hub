import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function updateUserRole(userId: string, role: "admin" | "user") {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, { role });

  await addDoc(collection(db, "logs"), {
    userId,
    action: `Role updated to ${role}`,
    timestamp: serverTimestamp(),
  });
}

export async function deleteUser(userId: string) {
  const ref = doc(db, "users", userId);
  await deleteDoc(ref);

  await addDoc(collection(db, "logs"), {
    userId,
    action: "User account deleted",
    timestamp: serverTimestamp(),
  });
}
