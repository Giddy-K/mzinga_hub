// app/apiaries/[id]/edit/page.tsx
import { adminDB } from "@/lib/firebase-admin";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { updateApiaryAction } from "@/app/actions/updateApiaryAction";
import type { ApiaryUpdateData } from "@/types/apiary";

/* ---------- helpers ---------- */
const toStr = (v: FormDataEntryValue | null): string | undefined =>
  typeof v === "string" ? v : undefined;

/* Next.js 15.3 generates PageProps with params?: Promise<...> */
interface PageProps {
  params?: Promise<{ id: string }>;
}

/* ---------- page ---------- */
export default async function EditApiaryPage({ params }: PageProps) {
  /* unwrap the promise (works if undefined) */
  const { id } = (await params) ?? {};
  if (!id) notFound();

  const session = await auth();

  /* ─── fetch apiary via Admin SDK (bypass rules) ─── */
  const snap = await adminDB.ref(`apiaries/${id}`).get();
  if (!snap.exists()) notFound();

  const apiary = snap.val();

  /* owner / admin guard */
  const isOwner = session?.user?.email === apiary.ownerId;
  const isAdmin = session?.user?.role === "admin";
  if (!isOwner && !isAdmin) notFound();

  /* ---------- UI ---------- */
  return (
    <form
      action={async (formData) => {
        "use server";
        const data: ApiaryUpdateData = {
          title:         toStr(formData.get("title")),
          location:      toStr(formData.get("location")),
          numberOfHives: Number(formData.get("numberOfHives") ?? 0),
          notes:         toStr(formData.get("notes")),
        };
        await updateApiaryAction(id, data);
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
