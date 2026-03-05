export function MasterDatabaseTable({ data }) {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded">
      <table className="w-max table-auto border-collapse text-xs">
        <thead>
          <tr className="">
            {/* Pipeline Details */}
            <th colSpan="4" className="border border-gray-400 px-2 py-2 text-center font-bold bg-red-200">
              Pipeline Details
            </th>
            {/* Drawing Details */}
            <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-orange-200">
              Drawing Details
            </th>
            {/* Weld Joint Details */}
            <th colSpan="3" className="border border-gray-400 px-2 py-2 text-center font-bold bg-amber-200">
              Weld Joint Details
            </th>
            {/* Fit-up Info */}
            <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-yellow-200">
              Fit-up Info
            </th>
            {/* Weld Info */}
            <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-green-200">
              Weld Info
            </th>
            {/* Component 1 Info */}
            <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-blue-200">
              Component 1 Info
            </th>
            {/* Component 2 Info */}
            <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-purple-200">
              Component 2 Info
            </th>
            {/* Welding Procedure */}
            <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-pink-200">
              Welding Procedure
            </th>
          </tr>
          <tr>
            {/* Pipeline Details columns */}
            <th className="border border-gray-400 px-2 py-2 bg-red-200">Line No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-red-200">Location</th>
            <th className="border border-gray-400 px-2 py-2 bg-red-200">Line Size</th>
            <th className="border border-gray-400 px-2 py-2 bg-red-200">Line Class</th>
            {/* Drawing Details columns */}
            <th className="border border-gray-400 px-2 py-2 bg-orange-200">Drawing No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-orange-200">Spool No.</th>
            {/* Weld Joint Details columns */}
            <th className="border border-gray-400 px-2 py-2 bg-amber-200">Weld No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-amber-200">Joint Type</th>
            <th className="border border-gray-400 px-2 py-2 bg-amber-200">Initial Production</th>
            {/* Fit-up Info columns */}
            <th className="border border-gray-400 px-2 py-2 bg-yellow-200">Fit-up Date</th>
            <th className="border border-gray-400 px-2 py-2 bg-yellow-200">Fit-up RFI</th>
            {/* Weld Info columns */}
            <th className="border border-gray-400 px-2 py-2 bg-green-200">Welding Date</th>
            <th className="border border-gray-400 px-2 py-2 bg-green-200">Welding RFI</th>
            {/* Component 1 Info columns */}
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Type</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Material</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Diameter</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Thickness</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Length</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Pipe No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-blue-200">Heat No.</th>
            {/* Component 2 Info columns */}
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Type</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Material</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Diameter</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Thickness</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Length</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Pipe No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-purple-200">Heat No.</th>
            {/* Welding Procedure columns */}
            <th className="border border-gray-400 px-2 py-2 bg-pink-200">WPS No.</th>
            <th className="border border-gray-400 px-2 py-2 bg-pink-200">Weld Process</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            console.log("Row data:", row); // Debugging log to check the structure of each row
            const weldJoints = row.weldJoints || {};
            const comp1 = weldJoints.components?.[0] || {};
            const comp2 = weldJoints.components?.[1] || {};

            return (
              <tr key={row.projects.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {/* Pipeline Details */}
                <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.pipelines?.lineNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.pipelines?.location}</td>
                <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.pipelines?.lineSize}</td>
                <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.pipelines?.lineClass}</td>

                {/* Drawing Details */}
                <td className="border border-gray-300 px-2 py-2 bg-orange-50">{row.isoDrawings?.drawingNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-orange-50">{row.isoDrawings?.spoolNumber || "N/A"}</td>

                {/* Weld Joint Details */}
                <td className="border border-gray-300 px-2 py-2 bg-amber-50">{weldJoints.weldNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-amber-50">{weldJoints.jointType}</td>
                <td className="border border-gray-300 px-2 py-2 bg-amber-50">{weldJoints.initialProduction}</td>

                {/* Fit-up Info */}
                <td className="border border-gray-300 px-2 py-2 bg-yellow-50">{row.fitupDate}</td>
                <td className="border border-gray-300 px-2 py-2 bg-yellow-50">{row.fitupRFI}</td>

                {/* Weld Info */}
                <td className="border border-gray-300 px-2 py-2 bg-green-50">{row.weldingDate}</td>
                <td className="border border-gray-300 px-2 py-2 bg-green-50">{row.weldingRFI}</td>

                {/* Component 1 Info */}
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.name}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.material}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.diameter}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.thickness}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.length}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.pipeNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-blue-50">{comp1.heatNumber}</td>

                {/* Component 2 Info */}
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.name}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.material}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.diameter}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.thickness}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.length}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.pipeNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-purple-50">{comp2.heatNumber}</td>

                {/* Welding Procedure */}
                <td className="border border-gray-300 px-2 py-2 bg-pink-50">{row.wps?.wpsNumber}</td>
                <td className="border border-gray-300 px-2 py-2 bg-pink-50">{row.wps?.weldProcess}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
