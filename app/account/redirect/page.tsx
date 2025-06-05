"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const role = session?.user?.role;
    if (role === "admin") router.replace("/admin/dashboard");
    else if (role === "user") router.replace("/");
    else router.replace("/unauthorized");
  }, [status, session, router]);

  return <p className="text-center p-10">Redirecting...</p>;
}
