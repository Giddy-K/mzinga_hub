// /app/admin/content/components/ContentForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ContentForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Blog");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/admin/content", {
      method: "POST",
      body: JSON.stringify({ title, type, content }),
    });

    if (res.ok) {
      toast.success("Content added!");
      router.push("/admin/content");
    } else {
      toast.error("Failed to add content.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        <option>Blog</option>
        <option>Guide</option>
        <option>Announcement</option>
      </select>
      <textarea
        placeholder="Write content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full p-3 border rounded-lg"
        required
      />
      <button type="submit" className="bg-yellow-500 px-6 py-2 text-white rounded-lg hover:bg-yellow-600">
        Publish
      </button>
    </form>
  );
}
