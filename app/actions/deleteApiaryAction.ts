"use server";

import { logUserAction } from "@/lib/admin/logUserAction";
import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import { redirect } from "next/navigation";
import { auth } from "@/auth"; // ✅

export async function deleteApiaryAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing apiary ID");

  const session = await auth();
  const userId = session?.user?.email ?? "unknown";

  await deleteApiaryById(id);

  await logUserAction({
    userId,
    action: "Deleted apiary",
    details: `Apiary ID: ${id}`,
  });

  redirect("/apiaries/dashboard");
}
