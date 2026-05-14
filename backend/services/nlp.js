/**
 * Lightweight NLP: keyword extraction + intent/category classification.
 * Categories: Admission, Courses, Departments, Fees, Scholarships, Hostel, Placements, Dates, Support
 */

const STOP = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "to", "of", "in", "for", "on", "with", "at", "by", "from", "as", "into", "through", "during",
  "before", "after", "above", "below", "between", "under", "again", "further", "then", "once", "i", "me", "my", "we", "our", "you", "your", "he", "she", "it", "they", "them",
  "what", "which", "who", "whom", "this", "that", "these", "those", "am", "how", "when", "where", "why", "tell", "about", "please", "want", "know", "give", "get", "there", "here", "any",
  "some", "more", "most", "other", "such", "only", "own", "same", "than", "too", "very", "just", "and", "but", "if", "or", "because", "until", "while", "not", "no", "yes", "also",
  "college", "university", "institute",
]);

const CATEGORY_RULES = [
  {
    intent: "admission",
    category: "Admission",
    keys: ["admission", "apply", "application", "entrance", "eligibility", "cutoff", "counsel", "seat", "document", "enroll", "register"],
  },
  {
    intent: "courses",
    category: "Courses",
    keys: ["course", "courses", "program", "degree", "btech", "mtech", "syllabus", "curriculum", "specialization", "branch"],
  },
  {
    intent: "departments",
    category: "Departments",
    keys: ["department", "departments", "dept", "faculty", "hod", "head", "school"],
  },
  {
    intent: "fees",
    category: "Fees",
    keys: ["fee", "fees", "tuition", "cost", "payment", "installment", "finance", "charge"],
  },
  {
    intent: "scholarships",
    category: "Scholarships",
    keys: ["scholarship", "scholarships", "financial", "aid", "waiver", "grant", "merit"],
  },
  {
    intent: "hostel",
    category: "Hostel",
    keys: ["hostel", "accommodation", "dorm", "mess", "room", "boarding", "stay", "residential"],
  },
  {
    intent: "placements",
    category: "Placements",
    keys: ["placement", "placements", "job", "jobs", "recruiter", "package", "salary", "internship", "career", "company"],
  },
  {
    intent: "dates",
    category: "Dates",
    keys: ["date", "dates", "deadline", "calendar", "schedule", "when", "last day", "exam date", "event"],
  },
  {
    intent: "support",
    category: "Support",
    keys: ["contact", "phone", "email", "call", "office", "support", "helpdesk", "address", "reach"],
  },
];

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[.,?!'"();:\[\]{}]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
}

function extractKeywords(text) {
  const tokens = tokenize(text);
  return [...new Set(tokens.filter((t) => !STOP.has(t)))].slice(0, 24);
}

function classifyIntentAndCategory(messageLower, keywords) {
  const hay = `${messageLower} ${keywords.join(" ")}`;
  let best = { intent: "general", category: "General", score: 0 };

  for (const rule of CATEGORY_RULES) {
    let score = 0;
    for (const k of rule.keys) {
      if (hay.includes(k)) score += k.length > 6 ? 3 : 2;
    }
    if (score > best.score) best = { intent: rule.intent, category: rule.category, score };
  }

  return { intent: best.intent, category: best.category, confidence: Math.min(1, best.score / 10) };
}

function similarityScore(a, b) {
  const ta = new Set(tokenize(a));
  const tb = new Set(tokenize(b));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const x of ta) if (tb.has(x)) inter += 1;
  return inter / Math.sqrt(ta.size * tb.size);
}

module.exports = {
  extractKeywords,
  classifyIntentAndCategory,
  similarityScore,
  tokenize,
  CATEGORY_RULES,
};
