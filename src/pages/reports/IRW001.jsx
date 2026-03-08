import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getDailyFitUpInspectionReport } from "@/api/reports";

export default function IRW001() {
  const [formData, setFormData] = useState({
    drawingNumber: "",
    sheetNumber: "",
    weldNumber: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.drawingNumber.trim() &&
    formData.sheetNumber.trim() &&
    formData.weldNumber.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isGenerating) return;

    setIsGenerating(true);
    try {
      const result = await getDailyFitUpInspectionReport({
        drawingNumber: formData.drawingNumber.trim(),
        sheetNumber: formData.sheetNumber.trim(),
        weldNumber: formData.weldNumber.trim(),
      });

      if (result?.fileUrl) {
        // Trigger browser download using the provided file URL
        const link = document.createElement("a");
        link.href = result.fileUrl;
        link.target = "_blank";
        link.rel = "noreferrer";
        // Let the server filename / headers decide the final name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (result?.message) {
        toast.success(result.message);
      } else {
        toast.success("Daily Weld Fit-up Inspection Report generated.");
      }
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
          Daily Weld Fit-up Inspection Report (IR-W-001)
        </h4>
      </div>

      <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md">
        <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
          <h2 className="text-sm font-bold">Report Filters</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">
                Drawing Number *
              </label>
              <input
                type="text"
                value={formData.drawingNumber}
                onChange={(e) => updateField("drawingNumber", e.target.value)}
                placeholder="e.g., ISO-001"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">
                Sheet Number *
              </label>
              <input
                type="text"
                value={formData.sheetNumber}
                onChange={(e) => updateField("sheetNumber", e.target.value)}
                placeholder="e.g., 1"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">
                Weld Number *
              </label>
              <input
                type="text"
                value={formData.weldNumber}
                onChange={(e) => updateField("weldNumber", e.target.value)}
                placeholder="e.g., W-001"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-800 rounded hover:bg-black"
              disabled={isGenerating || !isValid}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
