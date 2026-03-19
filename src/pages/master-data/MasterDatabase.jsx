import { useState, useEffect } from "react";
import { Sheet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDatabaseTable } from "@/components/master-database/MasterDatabaseTable";
import { MasterDatabaseForm } from "@/components/master-database/MasterDatabaseForm";
import { toast } from "sonner";
import { getDatabase } from "../../api/master-database";

const MasterDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Master Database</h1>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="cursor-pointer px-4 py-2 text-sm rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Sheet size={18} />
            Download
          </Button>
          <Button
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
            className="cursor-pointer px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-black flex items-center gap-2 disabled:bg-gray-400"
          >
            <Plus size={18} />
            Create Record
          </Button>
        </div>
      </div>

      {isAdding && (
        <MasterDatabaseForm
          isEditing={false}
          onSave={(data) => {
            console.log("Save triggered:", data);
            toast.info("Save logic not yet implemented.");
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

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