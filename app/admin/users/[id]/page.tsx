import { auth } from "@/auth";
import { getUserLogs } from "@/lib/admin/getUserLogs";
import { notFound } from "next/navigation";

// type Params = { id: string };

interface PageProps {
  params: { id: string };          // ← only Promise
}

export default async function AdminUserLogsPage({ params }: PageProps) {
  /* auth guard */
  const session = await auth();
  if (session?.user?.role !== "admin") notFound();

  const { id } = params;      // ← await here

  const logs = await getUserLogs(id);

  if (logs.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        No logs found for this user.
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Logs for {id}</h1>
      <div className="space-y-4">
        {logs.map((log, i) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow-sm bg-gray-50 text-sm text-gray-800"
          >
            <p>
              <strong>Action:</strong> {log.action}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(log.timestamp).toLocaleString()}
            </p>
            {log.details && (
              <p>
                <strong>Details:</strong> {log.details}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
