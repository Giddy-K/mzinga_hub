import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Notification {
  message: string;
  targetRole: string;
}

export async function sendNotification({ message, targetRole }: Notification) {
  const notificationsRef = collection(db, "notifications");

  await addDoc(notificationsRef, {
    message,
    targetRole,
    createdAt: serverTimestamp(),
  });

  // Optional: You can trigger Firebase Cloud Function to push the message via FCM or email
}
