// app/account/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import FullScreenLoader from "../components/FullScreenLoader";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // If user is authenticated, redirect based on role
    if (session?.user?.role === "admin") {
      router.replace("/admin/dashboard");
    } else if (session?.user?.role === "user") {
      router.replace("/");
    }
    // If session exists but no valid role
    else if (session) {
      router.replace("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") return <FullScreenLoader />;

  // Show login form only if no session
  if (!session) {
    return <LoginForm />;
  }

  return <FullScreenLoader />;
}
