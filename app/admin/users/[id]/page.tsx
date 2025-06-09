import { auth } from "@/auth";
import { getUserLogs } from "@/lib/admin/getUserLogs";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Logs for ${params.id}`,
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserLogsPage({ params }: PageProps) {
  const { id } = await params; // ✅ Await the Promise
  const session = await auth();
  if (session?.user?.role !== "admin") return notFound();

  const userId = decodeURIComponent(id);
  const logs = await getUserLogs(userId);

  if (!logs.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        No logs found for this user.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Logs for {userId}</h1>
      <div className="space-y-4">
        {logs.map((log, i) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow-sm bg-gray-50 text-sm text-gray-800"
          >
            <p><strong>Action:</strong> {log.action}</p>
            <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            {log.details && <p><strong>Details:</strong> {log.details}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
