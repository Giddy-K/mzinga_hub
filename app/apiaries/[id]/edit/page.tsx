// app/apiaries/[id]/edit/page.tsx
import { adminDB } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { updateApiaryAction } from "@/app/actions/updateApiaryAction";
import type { ApiaryUpdateData } from "@/types/apiary";

function toStr(v: FormDataEntryValue | null): string | undefined {
  return typeof v === "string" ? v : undefined;
}

interface PageProps {
  params: { id: string };    // ← plain object, NOT a Promise
}

export default async function EditApiaryPage({ params }: PageProps) {
  const { id } = params;
  const session = await auth();

  /* 🔑 Use Admin SDK to bypass Realtime‐DB rules */
  const snapshot = await adminDB.ref(`apiaries/${id}`).get();
  if (!snapshot.exists()) return notFound();

  const apiary = snapshot.val();
  /* Access control: owner or admin */
  if (apiary.ownerId !== session?.user?.email && session?.user?.role !== "admin")
    return notFound();

  return (
    <form
      action={async (formData) => {
        "use server";
        const updatedData: ApiaryUpdateData = {
          title:         toStr(formData.get("title")),
          location:      toStr(formData.get("location")),
          numberOfHives: Number(formData.get("numberOfHives") || 0),
          notes:         toStr(formData.get("notes")),
        };
        await updateApiaryAction(id, updatedData);
      }}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Apiary</h2>
      <label className="block mb-2">Title</label>
      <input
        name="title"
        defaultValue={apiary.title}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2">Location</label>
      <input
        name="location"
        defaultValue={apiary.location}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2">Number of Hives</label>
      <input
        type="number"
        name="numberOfHives"
        defaultValue={apiary.numberOfHives}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2">Notes</label>
      <textarea
        name="notes"
        defaultValue={apiary.notes}
        rows={4}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        ✅ Update Apiary
      </button>
    </form>
  );
}
