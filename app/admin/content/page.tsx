// /app/admin/content/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllContent } from "@/lib/admin/getAllContent";
import { FaPlus } from "react-icons/fa";
import AdminNavbar from "@/app/components/AdminNavbar";

export default async function AdminContentPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  const contentList = await getAllContent();

  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen mt-16 bg-gray-50 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <Link
            href="/admin/content/new"
            className="flex gap-2 items-center px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
          >
            <FaPlus />
            New Content
          </Link>
        </div>

        {contentList.length === 0 ? (
          <p className="text-gray-500">No content found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {contentList.map((item) => (
              <Link
                key={item.id}
                href={`/admin/content/${item.id}/edit`}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
