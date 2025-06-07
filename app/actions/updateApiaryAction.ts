'use server';

import { redirect } from "next/navigation";
import type { ApiaryUpdateData } from "@/types/apiary";
import { adminDB } from "@/lib/firebase-admin";
import { logUserAction } from "@/lib/admin/logUserAction";
import { auth } from "@/auth"; // ✅

export async function updateApiaryAction(id: string, updatedData: ApiaryUpdateData) {
  const session = await auth(); // ✅
  const userId = session?.user?.email ?? "unknown";

  await adminDB.ref(`apiaries/${id}`).update(updatedData);

  await logUserAction({
    userId,
    action: "Updated apiary",
    details: `Apiary name: ${updatedData.title}`,
  });

  redirect(`/apiaries/dashboard`);
}
