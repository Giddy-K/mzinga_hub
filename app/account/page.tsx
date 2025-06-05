"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (session?.user?.role === "user") {
        router.replace("/");
      }
    }
  }, [session, status, router]);

  if (status === "loading") return null;

  return <LoginForm />;
}
