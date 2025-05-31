import { adminDB } from '@/lib/firebase-admin';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { deleteApiaryAction } from '@/app/actions/deleteApiaryAction';

type PageProps = { params: { id: string } };

export default async function ApiaryDetails({ params }: PageProps) {
  const { id } = params;
  const session = await auth();

  const snap = await adminDB.ref(`apiaries/${id}`).get();
  if (!snap.exists()) return notFound();

  const apiary = snap.val();
  const isOwner = session?.user?.email === apiary.ownerId;
  const isAdmin = session?.user?.role === 'admin';
  if (!isOwner && !isAdmin) return notFound();

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* …display details… */}
      {(isOwner || isAdmin) && (
        <div className="flex gap-4 mt-6">
          <Link
            href={`/apiaries/${id}/edit`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            ✏️ Edit
          </Link>
          <form action={deleteApiaryAction}>
            <input type="hidden" name="id" value={id} />
            <button className="px-4 py-2 bg-red-600 text-white rounded-md">
              🗑️ Delete
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
