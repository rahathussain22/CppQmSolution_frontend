import { useState, useRef } from "react";
import { Download, Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDatabaseTable } from "@/components/master-database/MasterDatabaseTable";
import { LoadingOverlay } from "@/components/master-database/LoadingOverlay";
import { parseBulkUploadFile, isValidFileType } from "@/components/master-database/parseBulkUploadFile";
import { toast } from "sonner";

const MasterDatabase = () => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [masterData, setMasterData] = useState([
    {
      id: 1,
      // Pipeline Details
      lineNo: "L-001",
      location: "Main Header",
      lineSize: "12 inch",
      lineClass: "150#",
      // Drawing Details
      drawingNo: "ISO-001",
      spoolNo: "SP-001",
      // Weld Joint Details
      weldNo: "W-001",
      jointType: "Butt Weld",
      initialProduction: "Yes",
      // Fit-up Info
      fitupDate: "2026-02-01",
      fitupRFI: "RFI-001",
      // Weld Info
      weldingDate: "2026-02-05",
      weldingRFI: "RFI-002",
      // Component 1
      comp1Type: "Pipe",
      comp1Material: "A106 Gr B",
      comp1Diameter: "12 inch",
      comp1Thickness: "0.375 inch",
      comp1Length: "48 inch",
      comp1PipeNo: "PIPE-001",
      comp1HeatNo: "HEAT-001",
      // Component 2
      comp2Type: "Elbow",
      comp2Material: "A234 Gr B",
      comp2Diameter: "12 inch",
      comp2Thickness: "0.375 inch",
      comp2Length: "N/A",
      comp2PipeNo: "ELB-001",
      comp2HeatNo: "HEAT-002",
      // Welding Procedure
      wpsNo: "WPS-001",
      weldProcess: "GMAW",
    },
    {
      id: 2,
      lineNo: "L-002",
      location: "Branch A",
      lineSize: "8 inch",
      lineClass: "300#",
      drawingNo: "ISO-002",
      spoolNo: "SP-002",
      weldNo: "W-002",
      jointType: "Fillet Weld",
      initialProduction: "No",
      fitupDate: "2026-02-02",
      fitupRFI: "RFI-003",
      weldingDate: "2026-02-06",
      weldingRFI: "RFI-004",
      comp1Type: "Pipe",
      comp1Material: "A106 Gr B",
      comp1Diameter: "8 inch",
      comp1Thickness: "0.322 inch",
      comp1Length: "36 inch",
      comp1PipeNo: "PIPE-002",
      comp1HeatNo: "HEAT-003",
      comp2Type: "Tee",
      comp2Material: "A234 Gr B",
      comp2Diameter: "8 inch",
      comp2Thickness: "0.322 inch",
      comp2Length: "N/A",
      comp2PipeNo: "TEE-001",
      comp2HeatNo: "HEAT-004",
      wpsNo: "WPS-002",
      weldProcess: "TIG",
    },
  ]);

  const handleBulkUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!isValidFileType(file)) {
      toast.error("Invalid file type. Please upload .xlsx, .xls, or .csv files only.");
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsLoading(true);

    try {
      // Parse the file
      const parsedData = await parseBulkUploadFile(file);

      // Validate that we have data
      if (parsedData.length === 0) {
        toast.error("No valid data found in the file. Please check the file format.");
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Simulate slight delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update table with parsed data
      setMasterData(parsedData);

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Show success message
      toast.success(`Successfully uploaded ${parsedData.length} records.`);
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast.error(error.message || "Failed to process the file. Please try again.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Dynamically import to avoid bundling issues in some setups
      const { exportToXlsx } = await import("@/components/master-database/exportToXlsx");
      exportToXlsx(masterData, "master-database.xlsx");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to generate Excel file.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-2">Master Database</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          onClick={handleBulkUploadClick}
          disabled={isLoading}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sheet size={18} />
          Bulk Upload
        </Button>
        <Button
          onClick={handleDownload}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Download size={18} />
          Download
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} message="Preparing data for upload..." />

      {/* Master Table */}
      {masterData.length > 0 ? (
        <MasterDatabaseTable data={masterData} />
      ) : (
        <div className="text-center py-8 text-gray-200">
          No records found
        </div>
      )}
    </div>
  );
};

export default MasterDatabase;