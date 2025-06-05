"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role === "admin") {
      router.push("/admin/dashboard");
    } else if (session?.user?.role === "user") {
      router.push("/");
    } else {
      setShowForm(true); // Only show form if not authenticated
    }
  }, [status, session, router]);

  return showForm ? <LoginForm /> : <div>Checking session...</div>;
}
