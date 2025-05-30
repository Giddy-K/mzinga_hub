'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addApiaryAction } from "@/app/actions/addApiaryAction";

export default function AddApiary() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfHives, setNumberOfHives] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return; // prevent duplicate submission
  setIsSubmitting(true);

  if (!session?.user?.email) {
    alert("Please login");
    setIsSubmitting(false);
    return;
  }

  try {
    const res = await addApiaryAction({
      title,
      location,
      numberOfHives,
      notes,
      ownerEmail: session.user.email,
      ownerId: session.user.email,
    });

    if (res?.success) {
      router.push("/apiaries/dashboard");
    } else {
      alert("Failed to add apiary");
    }
  } catch (err) {
    console.error("Error adding apiary:", err);
    alert("Failed to add apiary");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h1 className="text-2xl font-bold mb-4">Add New Apiary</h1>
      <input
        type="text"
        placeholder="Apiary Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Number of Hives"
        value={numberOfHives}
        onChange={(e) => setNumberOfHives(Number(e.target.value))}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-[#4B2E13] text-white py-2 rounded"
      >
        Add Apiary
      </button>
    </form>
  );
}
