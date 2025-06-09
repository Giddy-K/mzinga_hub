import { auth } from "@/auth";
import { getAllUsers } from "@/lib/admin/getAllUsers";
import { updateUserRole, deleteUser } from "@/lib/admin/userActions";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminNavbar from "@/app/components/AdminNavbar";

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  const users = await getAllUsers();

  return (
    <>
     <AdminNavbar/>
    <section className="min-h-screen mt-6 bg-white px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                <td className="px-4 py-3 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {user.role !== "admin" ? (
                    <form
                      action={async () => {
                        "use server";
                        await updateUserRole(user.id, "admin");
                        redirect("/admin/users");
                      }}
                    >
                      <button className="text-blue-600 hover:underline text-sm">Promote</button>
                    </form>
                  ) : null}

                  <form
                    action={async () => {
                      "use server";
                      await deleteUser(user.id);
                      redirect("/admin/users");
                    }}
                  >
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                  </form>

                  <Link
                    href={`/admin/users/${user.email}`}
                    className="text-amber-600 hover:underline text-sm"
                  >
                    View Logs
                  </Link>
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
