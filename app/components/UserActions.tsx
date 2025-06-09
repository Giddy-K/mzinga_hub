// components/UserActions.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole, deleteUser } from "@/lib/admin/userActions";

export default function UserActions({ user, currentAdminEmail }: { user: any; currentAdminEmail: string }) {
  const [modalAction, setModalAction] = useState<null | "promote" | "demote" | "delete">(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async () => {
    switch (modalAction) {
      case "promote":
        await updateUserRole(user.id, "admin");
        break;
      case "demote":
        await updateUserRole(user.id, "user");
        break;
      case "delete":
        await deleteUser(user.id);
        break;
    }
    setModalAction(null);
    router.refresh();
  };

  const isCurrentUser = currentAdminEmail === user.email;

  return (
    <>
      <div className="space-x-2">
        {!isCurrentUser && user.role !== "admin" && (
          <button onClick={() => setModalAction("promote")} className="text-blue-600 hover:underline text-sm">
            Promote
          </button>
        )}

        {!isCurrentUser && user.role === "admin" && (
          <button onClick={() => setModalAction("demote")} className="text-indigo-600 hover:underline text-sm">
            Demote
          </button>
        )}

        {!isCurrentUser && (
          <button onClick={() => setModalAction("delete")} className="text-red-600 hover:underline text-sm">
            Delete
          </button>
        )}

        <button
          onClick={() => router.push(`/admin/users/${encodeURIComponent(user.email)}`)}
          className="text-amber-600 hover:underline text-sm"
        >
          View Logs
        </button>
      </div>

      {modalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to {modalAction} {user.name}?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  startTransition(() => {
                    handleAction();
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button onClick={() => setModalAction(null)} className="px-4 py-2 border rounded hover:bg-gray-100">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
