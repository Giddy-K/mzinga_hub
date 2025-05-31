import { adminDB } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { deleteApiaryAction } from "@/app/actions/deleteApiaryAction";

/** Next.js will actually give you `params` as a `Promise<any>`  */
type PageProps = {
  params?: Promise<{ id: string }>;
};

export default async function ApiaryDetails({ params }: PageProps) {
  /* ---------------- resolve params ---------------- */
  const { id } = (await params) ?? notFound();   // <-- await the promise

  /* ---------------- auth & data ------------------- */
  const session = await auth();

  // Realtime-DB read through Admin SDK (bypasses rules)
  const snap = await adminDB.ref(`apiaries/${id}`).get();
  if (!snap.exists()) return notFound();

  const apiary = snap.val();
  const isOwner = session?.user?.email === apiary.ownerId;
  const isAdmin = session?.user?.role === "admin";
  if (!isOwner && !isAdmin) return notFound();

  /* ---------------- UI ---------------------------- */
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{apiary.title}</h1>
      <p><strong>Location:</strong> {apiary.location}</p>
      <p><strong>Number of Hives:</strong> {apiary.numberOfHives}</p>
      <p><strong>Notes:</strong> {apiary.notes}</p>
      <p className="text-sm text-gray-600 italic mt-4">
        Added: {new Date(apiary.dateAdded).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">Owner: {apiary.ownerId}</p>

      {(isOwner || isAdmin) && (
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
      )}
    </section>
  );
}
