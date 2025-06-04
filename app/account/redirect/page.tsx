"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { checkUserRoleAndRedirect } from "@/lib/checkRoleAndRedirect";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/app/components/FullScreenLoader";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      if (status === "loading") return;

      if (session?.user?.email) {
        await checkUserRoleAndRedirect(session.user.email, router);
      } else {
        router.push("/unauthorized");
      }
    };

    handleRedirect();
  }, [router, session, status]);

  return <FullScreenLoader />;
}
