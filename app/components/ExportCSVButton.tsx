"use client";

import { json2csv } from "@/lib/utils/json2csv";
import clsx from "clsx";

interface ExportCSVButtonProps<T extends object> {
  //  extends object
  data: T[];
  filename: string;
  className?: string;
}

export default function ExportCSVButton<T extends object>({
  //   extends object
  data,
  filename,
  className,
}: ExportCSVButtonProps<T>) {
  const handleExport = async () => {
    const csv = json2csv(data); // no await needed (json2csv is sync)
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
      className={clsx(
        "ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",
        className
      )}
    >
      Export CSV
    </button>
  );
}
