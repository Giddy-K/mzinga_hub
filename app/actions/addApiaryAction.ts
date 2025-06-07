'use server';

import { adminDB } from "@/lib/firebase-admin";
import { logUserAction } from "@/lib/admin/logUserAction";
import { auth } from "@/auth";

export async function addApiaryAction(data: {
  title: string;
  location: string;
  numberOfHives: number;
  notes: string;
  ownerEmail: string;
  ownerId: string;
}) {
  const session = await auth(); // ✅ get session
  const userId = session?.user?.email ?? "unknown";

  await adminDB.ref("apiaries").push({
    ...data,
    dateAdded: Date.now(),
  });

  await logUserAction({
    userId,
    action: "Created new apiary",
    details: `Apiary name: ${data.title}`,
  });

  return { success: true };
}
