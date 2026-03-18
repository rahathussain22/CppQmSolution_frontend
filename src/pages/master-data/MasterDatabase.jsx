import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDatabaseTable } from "@/components/master-database/MasterDatabaseTable";
import { toast } from "sonner";
import { getDatabase } from "../../api/master-database";

const MasterDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [masterData, setMasterData] = useState([]);

  // Pagination
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getDatabase({ cursor, prevCursor, limit });
        setMasterData(response.data || []);
        setPagination(
          response.pagination || { hasNextPage: false, nextCursor: null, prevCursor: null }
        );
      } catch (error) {
        console.error("Error fetching master database:", error);
        toast.error("Failed to load master database.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cursor, prevCursor, limit]);

  const handleNextPage = () => {
    if (pagination?.hasNextPage && pagination?.nextCursor) {
      setCursor(pagination.nextCursor);
      setPrevCursor(null);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.prevCursor) {
      setPrevCursor(pagination.prevCursor);
      setCursor(null);
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleDownload = async () => {
    try {
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
          <Button
            onClick={handleDownload}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-black flex items-center gap-2"
          >
            <Download size={18} />
            Download
          </Button>
        </div>
      </div>

      {/* Master Table */}
      {isLoading ? (
        <div className="p-4 text-gray-600">Loading master database...</div>
      ) : masterData.length > 0 ? (
        <MasterDatabaseTable
          data={masterData}
          pagination={pagination}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          page={page}
          isFetching={isLoading}
        />
      ) : (
        <div className="text-center py-8 text-gray-400">No records found</div>
      )}
    </div>
  );
};

export default MasterDatabase;