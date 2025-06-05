"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/app/components/FullScreenLoader";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role === "admin") {
      router.replace("/admin/dashboard");
    } else if (session?.user?.role === "user") {
      router.replace("/");
    } else {
      router.replace("/unauthorized");
    }
  }, [session, status, router]);

  return <FullScreenLoader />;
}