import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function logUserAction({
  userId,
  action,
  details,
}: {
  userId: string;
  action: string;
  details?: string;
}) {
  try {
    await addDoc(collection(db, "logs"), {
      userId,
      action,
      details: details ?? "",
      timestamp: Timestamp.now(),
    });
  } catch (err) {
    console.error("Failed to log user action", err);
  }
}
