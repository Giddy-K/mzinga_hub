// app/admin/analytics/page.tsx
import { auth } from "@/auth";
import { getAllApiaries } from "@/lib/firebase/getAllApiaries";
import { redirect } from "next/navigation";
import AdminAnalyticsClient from "@/app/components/AnalyticsClient";

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  const apiaries = await getAllApiaries();

  return <AdminAnalyticsClient apiaries={apiaries} />;
}
