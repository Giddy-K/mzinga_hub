import { getAllApiaries } from "@/lib/firebase/getAllApiaries";
import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";

export default async function AdminApiariesPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  const apiaries = await getAllApiaries();

  return (
    <section className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Apiaries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-amber-50 text-left text-sm uppercase text-gray-600">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Hives</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiaries.map((apiary) => (
              <tr key={apiary.id} className="border-b">
                <td className="px-4 py-3 font-medium">{apiary.title}</td>
                <td className="px-4 py-3">{apiary.location}</td>
                <td className="px-4 py-3">{apiary.numberOfHives}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{apiary.ownerId}</td>
                <td className="px-4 py-3 text-sm">
                  {new Date(apiary.dateAdded).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Link
                    href={`/apiaries/${apiary.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteApiaryById(apiary.id);
                      redirect("/admin/apiaries");
                    }}
                  >
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
