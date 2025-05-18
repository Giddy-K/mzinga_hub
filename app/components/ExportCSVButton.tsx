"use client";

import { json2csv } from "@/lib/utils/json2csv";

export default function ExportCSVButton({
  data,
  filename,
}: {
  data: any[];
  filename: string;
}) {
  const handleExport = async () => {
    const csv = await json2csv(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}
