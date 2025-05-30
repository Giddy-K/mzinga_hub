import { auth } from "@/auth";
import { getAllApiaries } from "@/lib/firebase/getAllApiaries";
import { redirect } from "next/navigation";
import AdminAnalyticsClient from "@/app/components/AnalyticsClient";

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/unauthorized");

  const apiaries = (await getAllApiaries()).map(apiary => ({
    ...apiary,
    dateAdded: apiary.dateAdded ?? new Date().toISOString(), // or "" or any fallback string
  }));

  return <AdminAnalyticsClient apiaries={apiaries} />;
}
