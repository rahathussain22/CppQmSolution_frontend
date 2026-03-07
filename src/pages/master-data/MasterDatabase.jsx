import { useState, useRef, useEffect } from "react";
import { Download, Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDatabaseTable } from "@/components/master-database/MasterDatabaseTable";
import { LoadingOverlay } from "@/components/master-database/LoadingOverlay";
import { parseBulkUploadFile, isValidFileType } from "@/components/master-database/parseBulkUploadFile";
import { toast } from "sonner";
import { getDatabase } from "../../api/master-database";
import { useAuthStore } from "../../store/authStore";

const MasterDatabase = () => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const canBulkUpload = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getDatabase();
        console.log("API Response:", response);
        setMasterData(response.data || []);
      } catch (error) {
        console.error("Error fetching master database:", error);
        toast.error("Failed to load master database.");
      } finally {
        setIsLoading(false);
      }

    }
    fetchData();
  }, [])

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
    setIsBulkUploading(true);

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
      setIsBulkUploading(false);
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

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">Master Database</h1>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          {canBulkUpload && <Button
            onClick={handleBulkUploadClick}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sheet size={18} />
            Bulk Upload
          </Button>}
          <Button
            onClick={handleDownload}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Download size={18} />
            Download
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Loading Overlay - only for bulk upload */}
      <LoadingOverlay
        isVisible={isBulkUploading}
        message="Preparing data for upload..."
      />

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