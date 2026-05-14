const SUPPORTED = new Set(["en", "hi", "ta", "ml"]);

/**
 * Detect script/language hints from Unicode ranges (coarse).
 * Malayalam: \u0D00-\u0D7F
 * Hindi: \u0900-\u097F
 * Tamil: \u0B80-\u0BFF
 */
function detectLanguage(text = "", fallback = "en") {
  const s = String(text || "");
  if (/[\u0D00-\u0D7F]/.test(s)) return "ml";
  if (/[\u0900-\u097F]/.test(s)) return "hi";
  if (/[\u0B80-\u0BFF]/.test(s)) return "ta";
  
  const f = normalizeLang(fallback);
  return f;
}

function normalizeLang(code) {
  const c = String(code || "en").toLowerCase().slice(0, 2);
  return SUPPORTED.has(c) ? c : "en";
}

module.exports = {
  detectLanguage,
  normalizeLang,
  SUPPORTED,
};
