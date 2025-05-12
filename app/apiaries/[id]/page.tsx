import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { deleteApiaryAction } from "@/app/actions/deleteApiaryAction";

export default async function ApiaryDetails({
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
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{apiary.title}</h1>
      <p><strong>Location:</strong> {apiary.location}</p>
      <p><strong>Number of Hives:</strong> {apiary.numberOfHives}</p>
      <p><strong>Notes:</strong> {apiary.notes}</p>
      <p className="text-sm text-gray-600 mt-4 italic">
        Added: {new Date(apiary.dateAdded).toLocaleString()}
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          href={`/apiaries/${id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          ✏️ Edit
        </Link>

        <form action={deleteApiaryAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            🗑️ Delete
          </button>
        </form>
      </div>
    </section>
  );
}
