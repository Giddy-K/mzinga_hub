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

// // app/account/redirect/page.tsx
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export default async function RedirectPage() {
//   const session = await auth();

//   if (!session || !session.user?.role) {
//     redirect("/unauthorized");
//   }

//   // Avoid redirecting in a loop
//   const role = session.user.role;

//   if (role === "admin") {
//     redirect("/admin/dashboard");
//   }

//   if (role === "user") {
//     redirect("/");
//   }

//   redirect("/unauthorized");
// }
