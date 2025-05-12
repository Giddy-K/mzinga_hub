import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { updateApiaryAction } from "@/app/actions/updateApiaryAction";

export default async function EditApiaryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session = await auth();
  const db = getDatabase(app);
  const snapshot = await get(ref(db, `apiaries/${id}`));

  if (!snapshot.exists()) return notFound();
  const apiary = snapshot.val();

  if (apiary.ownerId !== session?.user?.email) return notFound();

  return (
    <form
      action={async (formData) => {
        "use server";
        const updatedData = {
          title: formData.get("title"),
          location: formData.get("location"),
          numberOfHives: Number(formData.get("numberOfHives")),
          notes: formData.get("notes"),
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
