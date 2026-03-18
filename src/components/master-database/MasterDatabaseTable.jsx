import { ChevronLeft, ChevronRight } from "lucide-react";

export function MasterDatabaseTable({
  data,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
}) {
  if (!data.length) {
    return <div className="p-4 text-gray-500">No records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-max table-auto border-collapse text-xs">
          <thead>
            <tr>
              {/* Pipeline Details */}
              <th colSpan="4" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Pipeline Details
              </th>
              {/* Drawing Details */}
              <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Drawing Details
              </th>
              {/* Weld Joint Details */}
              <th colSpan="3" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Weld Joint Details
              </th>
              {/* Component 1 Info */}
              <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Component 1 Info
              </th>
              {/* Component 2 Info */}
              <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Component 2 Info
              </th>
              {/* Welding Procedure */}
              <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Welding Procedure
              </th>
            </tr>
            <tr>
              {/* Pipeline Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Location</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line Size</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line Class</th>
              {/* Drawing Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Drawing No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Spool No.</th>
              {/* Weld Joint Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Weld No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Joint Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Initial Production</th>
              {/* Component 1 Info columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Material</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Diameter</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Thickness</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Length</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Pipe No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Heat No.</th>
              {/* Component 2 Info columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Material</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Diameter</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Thickness</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Length</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Pipe No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Heat No.</th>
              {/* Welding Procedure columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">WPS No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Weld Process</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const pipeline = row.pipeline || {};
              const drawingDetail = row.drawingDetail || {};
              const weldJoint = row.weldJointDetail || {};
              const comp1 = row.component1Info || {};
              const comp2 = row.component2Info || {};
              const weldingProc = row.weldingProcedure || {};

              return (
                <tr
                  key={row._id ?? idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* Pipeline Details */}
                  <td className="border border-gray-300 px-2 py-2">{pipeline.lineNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{pipeline.location || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{pipeline.lineSize || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{pipeline.lineClass || "-"}</td>

                  {/* Drawing Details */}
                  <td className="border border-gray-300 px-2 py-2">{drawingDetail.drawingNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{drawingDetail.spoolNumber || "N/A"}</td>

                  {/* Weld Joint Details */}
                  <td className="border border-gray-300 px-2 py-2">{weldJoint.weldNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{weldJoint.jointType || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{weldJoint.initialProduction || "-"}</td>

                  {/* Component 1 Info */}
                  <td className="border border-gray-300 px-2 py-2">{comp1.name || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.material || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.diameter || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.thickness || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.length || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.pipeNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp1.heatNumber || "-"}</td>

                  {/* Component 2 Info */}
                  <td className="border border-gray-300 px-2 py-2">{comp2.name || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.material || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.diameter || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.thickness || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.length || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.pipeNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{comp2.heatNumber || "-"}</td>

                  {/* Welding Procedure */}
                  <td className="border border-gray-300 px-2 py-2">{weldingProc.wpsNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{weldingProc.weldProcess || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center border-t border-gray-200 bg-gray-50 px-4 py-3 gap-2">
        {/* Previous button */}
        <div className="flex-1">
          <button
            onClick={onPrevPage}
            disabled={isFetching || !pagination?.prevCursor || page <= 1}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        </div>

        {/* Page indicator */}
        <div className="flex-1 text-center text-xs text-gray-600">
          Page {page}
        </div>

        {/* Next button */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onNextPage}
            disabled={isFetching || !pagination?.hasNextPage}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
