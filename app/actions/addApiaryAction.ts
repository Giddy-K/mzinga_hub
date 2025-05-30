'use server';

import { adminDB } from "@/lib/firebase-admin";

export async function addApiaryAction(data: {
  title: string;
  location: string;
  numberOfHives: number;
  notes: string;
  ownerEmail: string;
  ownerId: string;
}) {
  await adminDB.ref("apiaries").push({
    ...data,
    dateAdded: Date.now(),
  });

  // Just return success — no redirect
  return { success: true };
}
