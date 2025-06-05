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
    if (status === "loading") return;
    console.log("SESSION IN REDIRECT:", session); // ⬅️ Add this
    if (session?.user?.email) {
      checkUserRoleAndRedirect(session.user.email, router);
    } else {
      router.push("/unauthorized");
    }
  }, [router, session, status]);

  return <FullScreenLoader />;
}
