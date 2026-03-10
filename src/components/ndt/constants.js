export const NDT_RESULT_OPTIONS = ["10%", "100%"];
export const RT_RESULT_OPTIONS = ["Acc", "R", "R/S", "RW"];
export const RT_TRACER_OPTIONS = ["FW", "SW"];
export const REVIEW_OPTIONS = ["agr", "dagr"];
export const UT_TYPE_OPTIONS = ["UT", "UTT", "PAUT", "AUT"];

export const normalizeNdtList = (data) => {
  // api wrapper returns response.data already; backend may return different shapes.
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.rts)) return data.rts;
  if (Array.isArray(data.uts)) return data.uts;
  if (Array.isArray(data.results)) return data.results;
  // Sometimes APIs return { list: [...] }
  if (Array.isArray(data.list)) return data.list;
  return [];
};

