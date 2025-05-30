'use server';

import { redirect } from "next/navigation";
import type { ApiaryUpdateData } from "@/types/apiary";
import { adminDB } from "@/lib/firebase-admin";

export async function updateApiaryAction(id: string, updatedData: ApiaryUpdateData) {
  // Use admin SDK only — you're in server context
  await adminDB.ref(`apiaries/${id}`).update(updatedData);

  // Redirect after successful update
  redirect(`/apiaries/dashboard`);
}
