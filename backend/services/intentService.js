const nlp = require("./nlp");
const faqModel = require("../models/faqModel");

const INTENT_SYNONYMS = {
  admission: ["admission", "apply", "application", "enroll", "deadline", "last date", "counselling"],
  courses: ["course", "program", "degree", "curriculum", "syllabus", "duration"],
  departments: ["department", "faculty", "hod", "head"],
  fees: ["fee", "fees", "payment", "tuition", "charge", "cost"],
  scholarships: ["scholarship", "grant", "financial aid", "waiver"],
  hostel: ["hostel", "accommodation", "mess", "room", "dorm", "boarding"],
  placements: ["placement", "job", "package", "salary", "recruiter", "internship"],
  dates: ["date", "dates", "deadline", "calendar", "schedule", "last date"],
  support: ["contact", "phone", "email", "help", "support", "office"],
};

const COURSE_TOPIC_SYNONYMS = {
  // Common courses/topics (strictly mapped to prevent broad keyword pollution).
  mba: ["mba", "m.b.a", "master of business administration", "pgdm"],
  bca: ["bca", "b.c.a", "bachelor of computer applications"],
  mca: ["mca", "m.c.a", "master of computer applications"],
  btech: ["btech", "b.tech", "b tech", "bachelor of technology"],
  mtech: ["mtech", "m.tech", "m tech", "master of technology"],
  cse: ["cse", "computer science", "b.sc computer science", "m.sc computer science"],
  ece: ["ece", "electronics", "b.tech electronics", "m.tech electronics"],
  bba: ["bba", "b.b.a", "bachelor of business administration"],
  bcom: ["bcom", "b.com", "b com", "bachelor of commerce"],
  mcom: ["mcom", "m.com", "m com", "master of commerce"],
  msc: ["msc", "m.sc", "m sc", "master of science"],
  bsc: ["bsc", "b.sc", "b sc", "bachelor of science"],
};

function normalize(text) {
  return String(text || "").toLowerCase().trim();
}

function extractFocusTerms(originalMessage) {
  const msg = String(originalMessage || "").trim();
  const lower = msg.toLowerCase();
  const tokens = nlp.tokenize(lower);
  const keywords = nlp.extractKeywords(lower);

  // Filter tokens to keep only relevant potential course terms.
  // We allow tokens up to 15 chars but exclude known non-course intent words and STOP words.
  const courseTokens = tokens
    .filter((t) => /^[a-z]{2,15}$/.test(t))
    .filter((t) => keywords.includes(t)) // Must be a keyword (non-stop word)
    .filter((t) => !["hostel", "fees", "fee", "admission", "courses", "course", "department", "departments", "process", "details", "structure", "eligibility", "duration", "syllabus", "placement", "placements", "scholarship", "scholarships", "contact", "support", "about", "tell", "please"].includes(t));

  // If the user typed uppercase acronyms (BCA/MBA), highly prioritize those.
  const upperAcronyms = (msg.match(/\b[A-Z]{2,10}\b/g) || []).map((x) => x.toLowerCase());

  // Add known course/topic matches via synonyms.
  const bySyn = [];
  for (const [key, syns] of Object.entries(COURSE_TOPIC_SYNONYMS)) {
    if (syns.some((s) => lower.includes(s))) bySyn.push(key);
  }

  // Combine and de-duplicate.
  const out = [...new Set([...upperAcronyms, ...bySyn, ...courseTokens])].slice(0, 4);
  
  // Final safety: only return terms that are actually part of the message or valid mapped keys.
  return out.filter((t) => lower.includes(t) || (COURSE_TOPIC_SYNONYMS[t] || []).some((s) => lower.includes(s)));
}

function extractKeywords(message) {
  return nlp.extractKeywords(message);
}

function fuzzyTokenMatch(message, token) {
  const parts = nlp.tokenize(message);
  const t = normalize(token);
  return parts.some((p) => {
    if (p === t) return true;
    if (p.includes(t) || t.includes(p)) return true;
    const min = Math.min(p.length, t.length);
    if (min < 4) return false;
    let same = 0;
    for (let i = 0; i < min; i += 1) if (p[i] === t[i]) same += 1;
    return same / min >= 0.75;
  });
}

function detectIntent(message) {
  const original = String(message || "");
  const lower = normalize(original);
  const keywords = extractKeywords(lower);
  const base = nlp.classifyIntentAndCategory(lower, keywords);
  const scoreMap = {};

  for (const [intent, synonyms] of Object.entries(INTENT_SYNONYMS)) {
    let score = 0;
    for (const s of synonyms) {
      if (lower.includes(s)) score += 14; // exact/partial phrase
      else if (keywords.some((k) => s.includes(k) || k.includes(s))) score += 9; // synonym
      else if (fuzzyTokenMatch(lower, s)) score += 5; // fuzzy
    }
    scoreMap[intent] = score;
  }

  // Add category/keyword classifier confidence.
  if (base.intent && base.intent !== "general") scoreMap[base.intent] = (scoreMap[base.intent] || 0) + 12;

  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  const [bestIntent, bestScore] = sorted[0] || ["general", 0];
  const category = base.category || "General";

  return {
    intent: bestScore > 0 ? bestIntent : "general",
    category,
    keywords,
    focusTerms: extractFocusTerms(original),
    confidence: Math.min(1, (bestScore || 0) / 35),
    debugScores: scoreMap,
  };
}

async function findRelatedFAQs(intent, message, keywords = [], limit = 6) {
  const rows = await faqModel.findRelatedFaqs({ message, keywords, intentHint: intent, limit });
  return rows;
}

module.exports = {
  detectIntent,
  extractKeywords,
  findRelatedFAQs,
  COURSE_TOPIC_SYNONYMS,
};

