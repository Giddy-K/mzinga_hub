// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import FullScreenLoader from "@/app/components/FullScreenLoader";

// export default function RedirectPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // Show loader while session is loading
//   if (status === "loading") return <FullScreenLoader />;

//   useEffect(() => {
//     if (!session || !session.user?.role) {
//       router.replace("/unauthorized");
//     } else if (session.user.role === "admin") {
//       router.replace("/admin/dashboard");
//     } else {
//       router.replace("/");
//     }
//   }, [session, router]);

//   return <FullScreenLoader />;
// }

// app/account/redirect/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await auth();

  const role = session?.user?.role;

  if (role === "admin") {
    redirect("/admin/dashboard");
  }

  if (role === "user") {
    redirect("/");
  }

  redirect("/unauthorized");
}

