'use server';

import { getDatabase, ref, update } from "firebase/database";
import { app } from "@/lib/firebase";
import { redirect } from "next/navigation";

export async function updateApiaryAction(id: string, updatedData: any) {
  const db = getDatabase(app);
  await update(ref(db, `apiaries/${id}`), updatedData);
  redirect(`/apiaries/dashboard`);
}
