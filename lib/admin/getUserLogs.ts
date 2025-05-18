import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export interface UserLog {
  action: string;
  timestamp: number;
  details?: string;
}

export async function getUserLogs(userId: string): Promise<UserLog[]> {
  const q = query(
    collection(db, "logs"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const data = doc.data();
    let millis = Date.now();

    if (data.timestamp instanceof Timestamp) {
      millis = data.timestamp.toMillis();
    } else if (typeof data.timestamp === "number") {
      millis = data.timestamp;
    }

    return {
      action: data.action,
      timestamp: millis,
      details: data.details ?? "",
    };
  });
}
