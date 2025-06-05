// app/account/redirect/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const role = session?.user?.role;

    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "user") {
      router.replace("/dashboard");
    } else {
      router.replace("/unauthorized");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Redirecting...</p>;
}
