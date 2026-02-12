export function MasterDatabaseTable({ data }) {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded">
      <table className="w-full border-collapse text-xs">
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
          {data.map((row, idx) => (
            <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {/* Pipeline Details */}
              <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.lineNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.location}</td>
              <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.lineSize}</td>
              <td className="border border-gray-300 px-2 py-2 bg-red-50">{row.lineClass}</td>
              {/* Drawing Details */}
              <td className="border border-gray-300 px-2 py-2 bg-orange-50">{row.drawingNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-orange-50">{row.spoolNo}</td>
              {/* Weld Joint Details */}
              <td className="border border-gray-300 px-2 py-2 bg-amber-50">{row.weldNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-amber-50">{row.jointType}</td>
              <td className="border border-gray-300 px-2 py-2 bg-amber-50">{row.initialProduction}</td>
              {/* Fit-up Info */}
              <td className="border border-gray-300 px-2 py-2 bg-yellow-50">{row.fitupDate}</td>
              <td className="border border-gray-300 px-2 py-2 bg-yellow-50">{row.fitupRFI}</td>
              {/* Weld Info */}
              <td className="border border-gray-300 px-2 py-2 bg-green-50">{row.weldingDate}</td>
              <td className="border border-gray-300 px-2 py-2 bg-green-50">{row.weldingRFI}</td>
              {/* Component 1 Info */}
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1Type}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1Material}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1Diameter}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1Thickness}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1Length}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1PipeNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-blue-50">{row.comp1HeatNo}</td>
              {/* Component 2 Info */}
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2Type}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2Material}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2Diameter}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2Thickness}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2Length}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2PipeNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-purple-50">{row.comp2HeatNo}</td>
              {/* Welding Procedure */}
              <td className="border border-gray-300 px-2 py-2 bg-pink-50">{row.wpsNo}</td>
              <td className="border border-gray-300 px-2 py-2 bg-pink-50">{row.weldProcess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
