const { pool } = require("../db");
const nlp = require("../services/nlp");
const CACHE_TTL_MS = 60 * 1000;
let faqCache = { data: null, expiresAt: 0 };

async function searchFaqSimilar({ text, limit = 5 }) {
  const raw = String(text || "").trim();
  if (!raw) return [];

  const like = `%${raw.toLowerCase()}%`;
  const lim = Math.min(Math.max(Number(limit) || 5, 1), 20);
  const [rows] = await pool.query(
    `
    SELECT
      f.id,
      f.intent,
      f.category,
      f.question,
      f.response
    FROM faqs f
    WHERE
      LOWER(f.question) LIKE ?
      OR LOWER(f.response) LIKE ?
    ORDER BY f.id DESC
    LIMIT ${lim}
    `,
    [like, like]
  );

  if (rows.length) return rows;

  // Fulltext retrieval can be significantly faster on larger FAQ sets.
  try {
    const [ftRows] = await pool.query(
      `
      SELECT
        f.id,
        f.intent,
        f.category,
        f.question,
        f.response
      FROM faqs f
      WHERE MATCH(f.question, f.response) AGAINST (? IN NATURAL LANGUAGE MODE)
      LIMIT ${lim}
      `,
      [raw]
    );
    if (ftRows.length) return ftRows;
  } catch {
    // Fulltext index may not exist in some environments; continue to semantic fallback.
  }

  const [all] = await pool.query(
    `
    SELECT
      f.id,
      f.intent,
      f.category,
      f.question,
      f.response
    FROM faqs f
    `
  );

  const scored = all
    .map((r) => ({
      ...r,
      _score: nlp.similarityScore(raw, `${r.question} ${r.response}`),
    }))
    .filter((r) => r._score > 0.12)
    .sort((a, b) => b._score - a._score)
    .slice(0, lim);

  return scored.map(({ _score, ...r }) => r);
}

async function listFaqKnowledge({ useCache = true } = {}) {
  if (useCache && faqCache.data && Date.now() < faqCache.expiresAt) return faqCache.data;
  const [rows] = await pool.query(
    `
    SELECT
      f.id,
      f.intent,
      f.category,
      f.question,
      f.response
    FROM faqs f
    ORDER BY f.id DESC
    `
  );
  faqCache = { data: rows, expiresAt: Date.now() + CACHE_TTL_MS };
  return rows;
}

function scoreFaqRelevance({ message, keywords, intentHint, row }) {
  const q = String(row.question || "").toLowerCase();
  const r = String(row.response || "").toLowerCase();
  const i = String(row.intent || "").toLowerCase();
  const c = String(row.category || "").toLowerCase();
  const messageLower = String(message || "").toLowerCase();
  const keys = keywords || [];

  let score = 0;
  if (intentHint && (i.includes(intentHint) || c.includes(intentHint))) score += 30;
  if (i && messageLower.includes(i.replaceAll("_", " "))) score += 12;
  if (c && messageLower.includes(c)) score += 10;

  let hitCount = 0;
  for (const k of keys) {
    if (q.includes(k) || r.includes(k) || i.includes(k) || c.includes(k)) {
      hitCount += 1;
      score += k.length >= 6 ? 7 : 5;
    }
  }
  if (hitCount >= 3) score += 8;

  score += Math.round(nlp.similarityScore(messageLower, `${q} ${r}`) * 40);
  return score;
}

async function findRelatedFaqs({ message, keywords = [], intentHint, limit = 6 }) {
  const lim = Math.min(Math.max(Number(limit) || 6, 1), 20);
  const rows = await listFaqKnowledge({ useCache: true });
  return rows
    .map((row) => ({
      ...row,
      relevance_score: scoreFaqRelevance({ message, keywords, intentHint, row }),
    }))
    .filter((row) => row.relevance_score > 8)
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, lim);
}

async function listFaqs() {
  const [rows] = await pool.query(
    `SELECT id, intent, question, response, category, created_at FROM faqs ORDER BY id DESC`
  );
  return rows;
}

async function getFaq(id) {
  const [rows] = await pool.query(`SELECT * FROM faqs WHERE id = ? LIMIT 1`, [Number(id)]);
  return rows[0] || null;
}

async function createFaq({ intent, question, response, category }) {
  const [result] = await pool.query(
    `INSERT INTO faqs (intent, question, response, category) VALUES (?, ?, ?, ?)`,
    [intent || null, question, response, category || "general"]
  );
  faqCache = { data: null, expiresAt: 0 };
  return result.insertId;
}

async function updateFaq(id, { intent, question, response, category }) {
  const [result] = await pool.query(
    `
    UPDATE faqs SET
      intent = COALESCE(?, intent),
      question = COALESCE(?, question),
      response = COALESCE(?, response),
      category = COALESCE(?, category)
    WHERE id = ?
    `,
    [intent ?? null, question ?? null, response ?? null, category ?? null, Number(id)]
  );
  faqCache = { data: null, expiresAt: 0 };
  return result.affectedRows;
}

async function deleteFaq(id) {
  const [result] = await pool.query(`DELETE FROM faqs WHERE id = ?`, [Number(id)]);
  faqCache = { data: null, expiresAt: 0 };
  return result.affectedRows;
}

async function suggestFaqQuestions(prefix, limit = 8) {
  const pref = String(prefix || "").trim();
  const p = `%${pref.toLowerCase()}%`;
  if (pref.length < 2) return [];
  const lim = Math.min(Math.max(Number(limit) || 8, 1), 30);
  const [rows] = await pool.query(
    `SELECT DISTINCT question FROM faqs WHERE LOWER(question) LIKE ? ORDER BY id DESC LIMIT ${lim}`,
    [p]
  );
  return rows.map((r) => r.question);
}

module.exports = {
  searchFaqSimilar,
  listFaqKnowledge,
  findRelatedFaqs,
  listFaqs,
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
  suggestFaqQuestions,
};
