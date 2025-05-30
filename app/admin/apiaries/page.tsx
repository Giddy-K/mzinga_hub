// app/admin/apiaries/page.tsx
import { auth } from "@/auth";
import { getAllApiaries } from "@/lib/firebase/getAllApiaries";
import { deleteApiaryById } from "@/lib/firebase/deleteApiary";
import ExportCSVButton from "@/app/components/ExportCSVButton";
import AdminNavbar from "@/app/components/AdminNavbar";
import Link from "next/link";
import { redirect } from "next/navigation";

/* ---------- helpers ---------- */
type Search = { owner?: string; query?: string };

/** ←---  ONLY a Promise or undefined – exactly what Next.js emits */
interface PageProps {
  searchParams?: Promise<Search>;
}

export default async function AdminApiariesPage({ searchParams }: PageProps) {
  /* auth */
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  /* await the promise (works when undefined too) */
  const { owner = "", query = "" } = (await searchParams) ?? {};

  /* data */
  const apiaries = (await getAllApiaries()).map((a) => ({
    ...a,
    dateAdded: a.dateAdded ?? new Date().toISOString(),
  }));
  const owners = [...new Set(apiaries.map((a) => a.ownerId).filter(Boolean))];

  const q = query.toLowerCase();
  const filtered = apiaries.filter((a) => {
    const okOwner  = owner ? a.ownerId === owner : true;
    const okQuery  =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q);
    return okOwner && okQuery;
  });


  /* UI */
  return (
    <>
      <AdminNavbar />

      <section className="min-h-screen mt-6 bg-white px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          All Apiaries
        </h1>

        {/* ------- filters ------- */}
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

        {/* ------- table ------- */}
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
              {filtered.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3">{a.location}</td>
                  <td className="px-4 py-3">{a.numberOfHives}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {a.ownerId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(a.dateAdded).toLocaleDateString()}
                  </td>
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
