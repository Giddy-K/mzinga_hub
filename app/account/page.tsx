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

    const role = session?.user?.role;
    if (role === "admin") router.replace("/admin/dashboard");
    else if (role === "user") router.replace("/");
    else setShowForm(true);
  }, [status, session, router]);

  return showForm ? <LoginForm /> : <p>Checking session...</p>;
}
