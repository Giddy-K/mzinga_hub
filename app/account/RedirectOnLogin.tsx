"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { checkUserRoleAndRedirect } from "@/lib/checkRoleAndRedirect";
import { useRouter } from "next/navigation";

export default function RedirectOnLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      checkUserRoleAndRedirect(session.user.email, router);
    }
  }, [router, session]);

  return null;
}
