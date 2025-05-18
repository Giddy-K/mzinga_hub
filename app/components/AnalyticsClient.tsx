"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import AdminNavbar from "./AdminNavbar";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminAnalyticsClient({
  apiaries,
}: {
  apiaries: any[];
}) {
  const apiaryCounts = apiaries.reduce(
    (acc: Record<string, number>, apiary) => {
      const date = new Date(apiary.dateAdded).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const labels = Object.keys(apiaryCounts).sort();
  const data = {
    labels,
    datasets: [
      {
        label: "Apiaries Created",
        data: labels.map((d) => apiaryCounts[d]),
        backgroundColor: "rgba(251, 191, 36, 0.7)",
        borderColor: "rgba(202, 138, 4, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen mt-6 bg-white px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Platform Analytics
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Apiary Growth Over Time
          </h2>
          <Line data={data} />
        </div>
      </section>
    </>
  );
}
