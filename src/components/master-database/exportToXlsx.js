import * as XLSX from "xlsx";

// Approximate Tailwind colors (hex without # and uppercase for XLSX)
const COLORS = {
  red600: "B91C1C",
  red500: "EF4444",
  red200: "FECACA",
  red50: "FFF1F2",
  orange200: "FED7AA",
  orange50: "FFFBEB",
  amber200: "FDE68A",
  amber50: "FFFBEB",
  yellow200: "FEF08A",
  yellow50: "FFFBEB",
  green200: "BBF7D0",
  green50: "F0FDF4",
  blue200: "BFDBFE",
  blue50: "EFF6FF",
  purple200: "E9D5FF",
  purple50: "F5F3FF",
  pink200: "FBCFE8",
  pink50: "FFF1F2",
  white: "FFFFFF",
};

function styledCell(ws, r, c, value, fillHex, fontColorHex = "000000", bold = false) {
  const address = XLSX.utils.encode_cell({ r, c });
  ws[address] = { v: value };
  // Ensure ARGB format (prepend FF if not provided)
  const toARGB = (hex) => {
    if (!hex) return "FFFFFFFF";
    const clean = String(hex).replace("#", "").toUpperCase();
    return clean.length === 8 ? clean : `FF${clean}`;
  };

  ws[address].s = {
    fill: { patternType: "solid", fgColor: { rgb: toARGB(fillHex) } },
    font: { color: { rgb: toARGB(fontColorHex) }, bold },
    alignment: { vertical: "center", horizontal: "center", wrapText: true },
    border: {
      top: { style: "thin", color: { rgb: toARGB("D1D5DB") } },
      bottom: { style: "thin", color: { rgb: toARGB("D1D5DB") } },
      left: { style: "thin", color: { rgb: toARGB("D1D5DB") } },
      right: { style: "thin", color: { rgb: toARGB("D1D5DB") } },
    },
  };
}

export function exportToXlsx(data = [], filename = "master-database.xlsx") {
  // Build AOA (array of arrays)
  // total columns = 29 (0..28)
  const cols = 29;
  const aoa = [];

  // Row 0: section headers (place at specific col starts)
  const headerRow1 = new Array(cols).fill("");
  headerRow1[0] = "Pipeline Details"; // colSpan 0-3
  headerRow1[4] = "Drawing Details"; // 4-5
  headerRow1[6] = "Weld Joint Details"; // 6-8
  headerRow1[9] = "Fit-up Info"; //9-10
  headerRow1[11] = "Weld Info"; //11-12
  headerRow1[13] = "Component 1 Info"; //13-19
  headerRow1[20] = "Component 2 Info"; //20-26
  headerRow1[27] = "Welding Procedure"; //27-28
  aoa.push(headerRow1);

  // Row 1: column headers
  const headerRow2 = [
    "Line No.",
    "Location",
    "Line Size",
    "Line Class",
    "Drawing No.",
    "Spool No.",
    "Weld No.",
    "Joint Type",
    "Initial Production",
    "Fit-up Date",
    "Fit-up RFI",
    "Welding Date",
    "Welding RFI",
    "Type",
    "Material",
    "Diameter",
    "Thickness",
    "Length",
    "Pipe No.",
    "Heat No.",
    "Type",
    "Material",
    "Diameter",
    "Thickness",
    "Length",
    "Pipe No.",
    "Heat No.",
    "WPS No.",
    "Weld Process",
  ];
  aoa.push(headerRow2);

  // Body rows
  data.forEach((row) => {
    const r = new Array(cols).fill("");
    r[0] = row.lineNo || "";
    r[1] = row.location || "";
    r[2] = row.lineSize || "";
    r[3] = row.lineClass || "";
    r[4] = row.drawingNo || "";
    r[5] = row.spoolNo || "";
    r[6] = row.weldNo || "";
    r[7] = row.jointType || "";
    r[8] = row.initialProduction || "";
    r[9] = row.fitupDate || "";
    r[10] = row.fitupRFI || "";
    r[11] = row.weldingDate || "";
    r[12] = row.weldingRFI || "";
    r[13] = row.comp1Type || "";
    r[14] = row.comp1Material || "";
    r[15] = row.comp1Diameter || "";
    r[16] = row.comp1Thickness || "";
    r[17] = row.comp1Length || "";
    r[18] = row.comp1PipeNo || "";
    r[19] = row.comp1HeatNo || "";
    r[20] = row.comp2Type || "";
    r[21] = row.comp2Material || "";
    r[22] = row.comp2Diameter || "";
    r[23] = row.comp2Thickness || "";
    r[24] = row.comp2Length || "";
    r[25] = row.comp2PipeNo || "";
    r[26] = row.comp2HeatNo || "";
    r[27] = row.wpsNo || "";
    r[28] = row.weldProcess || "";
    aoa.push(r);
  });

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // Apply merges for headerRow1 sections
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Pipeline Details
    { s: { r: 0, c: 4 }, e: { r: 0, c: 5 } }, // Drawing Details
    { s: { r: 0, c: 6 }, e: { r: 0, c: 8 } }, // Weld Joint
    { s: { r: 0, c: 9 }, e: { r: 0, c: 10 } }, // Fit-up
    { s: { r: 0, c: 11 }, e: { r: 0, c: 12 } }, // Weld Info
    { s: { r: 0, c: 13 }, e: { r: 0, c: 19 } }, // Comp1
    { s: { r: 0, c: 20 }, e: { r: 0, c: 26 } }, // Comp2
    { s: { r: 0, c: 27 }, e: { r: 0, c: 28 } }, // Welding Procedure
  ];

  // Style header row1 (section headers)
  const headerStyles = [
    { start: 0, end: 3, color: COLORS.red200, textColor: COLORS.red600 },
    { start: 4, end: 5, color: COLORS.orange200, textColor: COLORS.red600 },
    { start: 6, end: 8, color: COLORS.amber200, textColor: COLORS.red600 },
    { start: 9, end: 10, color: COLORS.yellow200, textColor: COLORS.red600 },
    { start: 11, end: 12, color: COLORS.green200, textColor: COLORS.white },
    { start: 13, end: 19, color: COLORS.blue200, textColor: COLORS.white },
    { start: 20, end: 26, color: COLORS.purple200, textColor: COLORS.white },
    { start: 27, end: 28, color: COLORS.pink200, textColor: COLORS.white },
  ];

  headerStyles.forEach((hs) => {
    for (let c = hs.start; c <= hs.end; c++) {
      styledCell(ws, 0, c, aoa[0][c], hs.color.replace("#", ""), hs.textColor.replace("#", ""), true);
    }
  });

  // Style header row2 (column headers) - darker shades
  const header2Styles = [
    { cols: [0, 1, 2, 3], color: COLORS.red500 || COLORS.red500, textColor: COLORS.white },
    { cols: [4, 5], color: COLORS.orange200, textColor: COLORS.white },
    { cols: [6, 7, 8], color: COLORS.amber200, textColor: COLORS.white },
    { cols: [9, 10], color: COLORS.yellow200, textColor: COLORS.white },
    { cols: [11, 12], color: COLORS.green200, textColor: COLORS.white },
    { cols: [13, 14, 15, 16, 17, 18, 19], color: COLORS.blue200, textColor: COLORS.white },
    { cols: [20, 21, 22, 23, 24, 25, 26], color: COLORS.purple200, textColor: COLORS.white },
    { cols: [27, 28], color: COLORS.pink200, textColor: COLORS.white },
  ];

  header2Styles.forEach((hs) => {
    hs.cols.forEach((c) => {
      styledCell(ws, 1, c, aoa[1][c], hs.color.replace("#", ""), hs.textColor.replace("#", ""), true);
    });
  });

  // Style body cells with light tints matching sections
  const bodyStart = 2;
  for (let r = bodyStart; r < aoa.length; r++) {
    // Pipeline (0-3) red-50
    for (let c = 0; c <= 3; c++) styledCell(ws, r, c, aoa[r][c], COLORS.red50, "000000", false);
    // Drawing (4-5) orange-50
    for (let c = 4; c <= 5; c++) styledCell(ws, r, c, aoa[r][c], COLORS.orange50, "000000", false);
    // Weld Joint (6-8) amber-50
    for (let c = 6; c <= 8; c++) styledCell(ws, r, c, aoa[r][c], COLORS.amber50, "000000", false);
    // Fit-up (9-10) yellow-50
    for (let c = 9; c <= 10; c++) styledCell(ws, r, c, aoa[r][c], COLORS.yellow50, "000000", false);
    // Weld Info (11-12) green-50
    for (let c = 11; c <= 12; c++) styledCell(ws, r, c, aoa[r][c], COLORS.green50, "000000", false);
    // Comp1 (13-19) blue-50
    for (let c = 13; c <= 19; c++) styledCell(ws, r, c, aoa[r][c], COLORS.blue50, "000000", false);
    // Comp2 (20-26) purple-50
    for (let c = 20; c <= 26; c++) styledCell(ws, r, c, aoa[r][c], COLORS.purple50, "000000", false);
    // Welding Procedure (27-28) pink-50
    for (let c = 27; c <= 28; c++) styledCell(ws, r, c, aoa[r][c], COLORS.pink50, "000000", false);
  }

  // Auto-width approx: set column widths
  const colWidths = new Array(cols).fill({ wch: 12 });
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "MasterDatabase");

  // Write file with cellStyles enabled so fills/fonts are preserved
  try {
    XLSX.writeFile(wb, filename, { bookType: "xlsx", cellStyles: true });
  } catch {
    // Fallback to default write if cellStyles option is not supported in environment
    XLSX.writeFile(wb, filename);
  }
}
