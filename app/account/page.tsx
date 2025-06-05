"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import FullScreenLoader from "../components/FullScreenLoader";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role === "admin") {
      router.replace("/admin/dashboard");
    } else if (session?.user?.role === "user") {
      router.replace("/");
    } else {
      setShouldRender(true);
    }
  }, [session, status, router]);

  if (status === "loading") return <FullScreenLoader />;

  return shouldRender ? <LoginForm /> : <FullScreenLoader />;
}
