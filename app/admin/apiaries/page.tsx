// app/admin/apiaries/page.tsx
import { auth } from "@/auth";
import { getAllApiaries } from "@/lib/firebase/getAllApiaries";
import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import ExportCSVButton from "@/app/components/ExportCSVButton";
import AdminNavbar from "@/app/components/AdminNavbar";
import Link from "next/link";
import { redirect } from "next/navigation";

/* ------------- TYPES ------------- */
type Search = { owner?: string; query?: string };

/** Accept **either** the object or the Promise - exactly what Next.js expects */
interface PageProps {
  searchParams?: Search | Promise<Search>;
}

/* ------------- PAGE ------------- */
export default async function AdminApiariesPage({ searchParams }: PageProps) {
  /* auth guard */
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  /* resolve searchParams (handles both Promise & object & undefined) */
  const { owner = "", query = "" } = (await searchParams) ?? {};

  /* data */
  const apiaries = (await getAllApiaries()).map((a) => ({
    ...a,
    dateAdded: a.dateAdded ?? new Date().toISOString(),
  }));

  const owners = [...new Set(apiaries.map((a) => a.ownerId).filter(Boolean))];

  const q = query.toLowerCase();
  const filtered = apiaries.filter((a) => {
    const matchOwner = owner ? a.ownerId === owner : true;
    const matchQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q);
    return matchOwner && matchQuery;
  });

  /* UI */
  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen mt-6 bg-white px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Apiaries</h1>

        {/* Filters */}
        <form className="mb-6 flex flex-wrap gap-4 items-center">
          <input
            name="query"
            defaultValue={query}
            placeholder="Search title / location…"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          <select
            name="owner"
            defaultValue={owner}
            className="border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="">All owners</option>
            {owners.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">
            Filter
          </button>

          <ExportCSVButton
            data={filtered}
            filename="apiaries.csv"
            className="ml-auto"
          />
        </form>

        {/* Table (unchanged) */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            {/* …table head… */}
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b">
                  {/* …cells… */}
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      href={`/apiaries/${a.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteApiaryById(a.id);
                        redirect("/admin/apiaries");
                      }}
                    >
                      <button className="text-red-600 hover:underline">
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
    </>
  );
}
