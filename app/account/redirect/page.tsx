// app/account/redirect/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/getUserRole";
import FullScreenLoader from "@/app/components/FullScreenLoader";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      if (status === "loading") return;

      const email = session?.user?.email;
      if (!email) {
        router.push("/unauthorized");
        return;
      }

      const role = await getUserRole(email);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        router.push("/dashboard"); // or "/" if that's your user landing page
      } else {
        router.push("/unauthorized");
      }
    };

    redirect();
  }, [status, session, router]);

  return <FullScreenLoader />;
}
