'use server';

import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import { redirect } from "next/navigation";

export async function deleteApiaryAction(id: string) {
  await deleteApiaryById(id);
  redirect("/apiaries/dashboard");
}
