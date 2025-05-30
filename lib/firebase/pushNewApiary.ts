import { getDatabase, ref, push } from "firebase/database";
import { app } from "@/lib/firebase";

export async function pushNewApiary(apiaryData: {
  title: string;
  location: string;
  numberOfHives: number;
  notes: string;
  ownerEmail: string;
}) {
  const db = getDatabase(app);
  const apiaryRef = ref(db, "apiaries");

  await push(apiaryRef, {
    ...apiaryData,
    ownerId: apiaryData.ownerEmail,
    dateAdded: new Date().toISOString(),
  });

  return { success: true };
}
