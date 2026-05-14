
const { normalizeLang } = require("./languageDetectionService");

// Dictionary-based fallback for common college-related terms
const COLLEGE_DICTIONARY = {
  ml: {
    admission: "പ്രവേശനം",
    course: "കോഴ്സ്",
    hostel: "ഹോസ്റ്റൽ",
    fee: "ഫീസ്",
    scholarship: "സ്കോളർഷിപ്പ്",
    exam: "പരീക്ഷ",
    result: "ഫലം",
    department: "വകുപ്പ്",
    principal: "പ്രിൻസിപ്പൽ",
    contact: "ബന്ധപ്പെടുക",
  },
  hi: {
    admission: "प्रवेश",
    course: "पाठ्यक्रम",
    hostel: "छात्रावास",
    fee: "शुल्क",
    scholarship: "छात्रवृत्ति",
    exam: "परीक्षा",
    result: "परिणाम",
    department: "विभाग",
    principal: "प्रधानाचार्य",
    contact: "संपर्क",
  },
  ta: {
    admission: "சேர்க்கை",
    course: "படிப்பு",
    hostel: "விடுதி",
    fee: "கட்டணம்",
    scholarship: "உதவித்தொகை",
    exam: "தேர்வு",
    result: "முடிவு",
    department: "துறை",
    principal: "முதல்வர்",
    contact: "தொடர்பு",
  }
};

/**
 * Free translation using @vitalets/google-translate-api
 * No API key required.
 */
async function translateText(text, targetLang, sourceLang = "auto", attempt = 1) {
  const target = normalizeLang(targetLang);
  const source = sourceLang === "auto" ? "auto" : normalizeLang(sourceLang);
  
  if (!text || String(text).trim().length === 0 || target === source) {
    return text;
  }

  // Attempt dictionary-based translation for single words (case-insensitive)
  if (text.trim().split(/\s+/).length === 1) {
    const word = text.trim().toLowerCase();
    if (COLLEGE_DICTIONARY[target] && COLLEGE_DICTIONARY[target][word]) {
      console.log(`[Translation] Dictionary match found for "${word}" -> "${target}"`);
      return COLLEGE_DICTIONARY[target][word];
    }
    // Reverse lookup if translating to English
    if (target === "en") {
      for (const lang in COLLEGE_DICTIONARY) {
        for (const [en, local] of Object.entries(COLLEGE_DICTIONARY[lang])) {
          if (local === word) {
            console.log(`[Translation] Dictionary reverse match found for "${word}" -> en`);
            return en;
          }
        }
      }
    }
  }

  try {
    
    console.log(`[Translation] Success: ${source} -> ${target} (${text.slice(0, 20)}...)`);
    return res.text;
  } catch (err) {
    console.error(`[Translation] Error (Attempt ${attempt}): ${err.message}`);
    
    // Simple retry logic
    if (attempt < 2) {
      return translateText(text, targetLang, sourceLang, attempt + 1);
    }

    // Fallback strategy: return original text
    console.warn(`[Translation] Fallback: Returning original text for "${text.slice(0, 20)}..."`);
    return text;
  }
}

async function translateToEnglish(text, sourceLang = "auto") {
  return translateText(text, "en", sourceLang);
}

async function translateFromEnglish(text, targetLang) {
  return translateText(text, targetLang, "en");
}

module.exports = {
  translateText,
  translateToEnglish,
  translateFromEnglish,
};
