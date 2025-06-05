"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "@/app/components/FullScreenLoader";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const role = session?.user?.role;

    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "user") {
      router.replace("/"); // or "/user/dashboard" if you use it
    } else {
      router.replace("/unauthorized");
    }
  }, [session, status, router]);

  return <FullScreenLoader />;
}
