"use server";

import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import { redirect } from "next/navigation";

export async function deleteApiaryAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing apiary ID");
  await deleteApiaryById(id);
  redirect("/apiaries/dashboard");
}
