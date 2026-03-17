import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getWelderProgressStatusReport } from "@/api/reports";

export default function IRW003() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const result = await getWelderProgressStatusReport();

      if (result?.fileUrl) {
        const link = document.createElement("a");
        link.href = result.fileUrl;
        link.target = "_blank";
        link.rel = "noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast.success(result?.message || "Welder Progress Status Report generated.");
    } catch (error) {
      toast.error(error.message || "Failed to generate report.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-3xl font-bold">
          Welder Progress Status (IR-CSSP-W-003)
        </h4>
      </div>

      <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md">
        <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
          <h2 className="text-sm font-bold">Report Filters</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            No filters required. Click the button below to generate the report.
          </p>

          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-800 rounded hover:bg-black"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}