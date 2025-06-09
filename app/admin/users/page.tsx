import { auth } from "@/auth";
import { getAllUsers } from "@/lib/admin/getAllUsers";
import { redirect } from "next/navigation";
import AdminNavbar from "@/app/components/AdminNavbar";
import UserActions from "@/app/components/UserActions";

export default async function AdminUsersPage() {
  const session = await auth();

  if (session?.user?.role !== "admin" || !session.user.email) {
    redirect("/unauthorized");
  }

  const users = await getAllUsers();
  const currentEmail = session.user.email;

  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen mt-6 bg-white px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>

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
                  <td className="px-4 py-3 font-medium">
                    {user.name} {currentEmail === user.email && "(You)"}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <UserActions user={user} currentAdminEmail={currentEmail} />
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
