// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import LoginForm from "./LoginForm";

// export default function AccountPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     if (status === "loading") return;

//     if (session?.user?.role === "admin") {
//       router.replace("/admin/dashboard");
//     } else if (session?.user?.role === "user") {
//       router.replace("/");
//     } else {
//       setShowForm(true);
//     }
//   }, [session, status, router]);

//   return showForm ? <LoginForm /> : <div>Checking session...</div>;
// }

// app/account/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function AccountPage() {
  const session = await auth();

  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  if (session?.user?.role === "user") {
    redirect("/");
  }

  return <LoginForm />;
}
