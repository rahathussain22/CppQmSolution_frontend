import * as XLSX from "xlsx";

/**
 * Parse bulk upload file and convert to structured data
 * Column indices are fixed based on table structure:
 * 0-3: Pipeline Details (lineNo, location, lineSize, lineClass)
 * 4-5: Drawing Details (drawingNo, spoolNo)
 * 6-8: Weld Joint Details (weldNo, jointType, initialProduction)
 * 9-10: Fit-up Info (fitupDate, fitupRFI)
 * 11-12: Weld Info (weldingDate, weldingRFI)
 * 13-19: Component 1 Info (comp1Type, comp1Material, comp1Diameter, comp1Thickness, comp1Length, comp1PipeNo, comp1HeatNo)
 * 20-26: Component 2 Info (comp2Type, comp2Material, comp2Diameter, comp2Thickness, comp2Length, comp2PipeNo, comp2HeatNo)
 * 27-28: Welding Procedure (wpsNo, weldProcess)
 */
export const parseBulkUploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert sheet to 2D array with empty string as default
        const rows = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        // Skip rows 0 and 1 (merged headers and field headers), start from row 2
        const dataRows = rows.slice(2);

        // Parse each row into structured format
        const temp = dataRows
          .map((row) => {
            // Skip completely empty rows
            if (!row || row.every((cell) => !cell || cell === "")) {
              return null;
            }

            // If first column (Line No.) is missing or empty, consider record not present
            if (!row[0] || String(row[0]).trim() === "") {
              return null;
            }

            return {
              // Pipeline Details (columns 0-3)
              lineNo: row[0] || "",
              location: row[1] || "",
              lineSize: row[2] || "",
              lineClass: row[3] || "",
              // Drawing Details (columns 4-5)
              drawingNo: row[4] || "",
              spoolNo: row[5] || "",
              // Weld Joint Details (columns 6-8)
              weldNo: row[6] || "",
              jointType: row[7] || "",
              initialProduction: row[8] || "",
              // Fit-up Info (columns 9-10)
              fitupDate: row[9] || "",
              fitupRFI: row[10] || "",
              // Weld Info (columns 11-12)
              weldingDate: row[11] || "",
              weldingRFI: row[12] || "",
              // Component 1 Info (columns 13-19)
              comp1Type: row[13] || "",
              comp1Material: row[14] || "",
              comp1Diameter: row[15] || "",
              comp1Thickness: row[16] || "",
              comp1Length: row[17] || "",
              comp1PipeNo: row[18] || "",
              comp1HeatNo: row[19] || "",
              // Component 2 Info (columns 20-26)
              comp2Type: row[20] || "",
              comp2Material: row[21] || "",
              comp2Diameter: row[22] || "",
              comp2Thickness: row[23] || "",
              comp2Length: row[24] || "",
              comp2PipeNo: row[25] || "",
              comp2HeatNo: row[26] || "",
              // Welding Procedure (columns 27-28)
              wpsNo: row[27] || "",
              weldProcess: row[28] || "",
            };
          })
          .filter((item) => item !== null); // Remove null entries from empty or invalid rows

        // Assign sequential ids after filtering
        const parsedData = temp.map((item, i) => ({ id: i + 1, ...item }));

        resolve(parsedData);
      } catch (error) {
        reject(new Error(`Failed to parse file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Validate file type
 */
export const isValidFileType = (file) => {
  const validTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
  ];

  return validTypes.includes(file.type);
};
