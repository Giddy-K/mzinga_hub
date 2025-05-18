// app/components/AnalyticsClient.tsx
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ---- types --------------------------------------------------------------
type Apiary = {
  dateAdded: string | { seconds: number };   // Firestore Timestamp OR ISO string
  location?: string;
};

// ---- component ----------------------------------------------------------
export default function AdminAnalyticsClient({ apiaries }: { apiaries: Apiary[] }) {
  /**
   * Crunch the numbers once per page‑load.
   * useMemo prevents recalculation on every re‑render.
   */
  const { lineData, barData } = useMemo(() => {
    const byDate: Record<string, number> = {};
    const byLocation: Record<string, number> = {};

    apiaries.forEach((a) => {
      // ── 1. normalise date ───────────────────────────────────────────────
      const d =
        typeof a.dateAdded === "object" && "seconds" in a.dateAdded
          ? new Date(a.dateAdded.seconds * 1000)
          : new Date(a.dateAdded);

      const dateLabel = d.toLocaleDateString();        // e.g. "18/5/2025"
      byDate[dateLabel] = (byDate[dateLabel] || 0) + 1;

      // ── 2. count per location ──────────────────────────────────────────
      const loc = a.location || "Unknown";
      byLocation[loc] = (byLocation[loc] || 0) + 1;
    });

    // sort dates chronologically
    const lineLabels = Object.keys(byDate).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const barLabels = Object.keys(byLocation).sort();

    return {
      lineData: {
        labels: lineLabels,
        datasets: [
          {
            label: "Apiaries Created",
            data: lineLabels.map((d) => byDate[d]),
            backgroundColor: "rgba(251, 191, 36, 0.7)",
            borderColor: "rgba(202, 138, 4, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      barData: {
        labels: barLabels,
        datasets: [
          {
            label: "Apiaries per Location",
            data: barLabels.map((l) => byLocation[l]),
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
    };
  }, [apiaries]);

  // ---- UI ---------------------------------------------------------------
  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen mt-6 bg-white px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Platform Analytics
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* line chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Apiary Growth Over Time
            </h2>
            <Line data={lineData} />
          </div>

          {/* bar chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Apiaries per Location
            </h2>
            <Bar data={barData} />
          </div>
        </div>
      </section>
    </>
  );
}
