"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { sendNotification } from "@/lib/admin/notifications";
import { FaPaperPlane } from "react-icons/fa";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");
  const [targetRole, setTargetRole] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await sendNotification({ message, targetRole });
      toast.success("Notification sent successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-6 mt-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Send Notification</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Target Role:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="farmer">Farmers</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Message:</label>
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          <FaPaperPlane />
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </section>
    </>
  );
}
