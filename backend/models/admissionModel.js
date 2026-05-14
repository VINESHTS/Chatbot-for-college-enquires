const { pool } = require("../db");
const nlp = require("../services/nlp");

async function searchAdmissionQuestions({ text, limit = 5 }) {
  const raw = String(text || "").trim();
  const like = `%${raw.toLowerCase()}%`;

  const lim = Math.min(Math.max(Number(limit) || 5, 1), 20);
  const [rows] = await pool.query(
    `
    SELECT
      aq.id,
      aq.category,
      aq.question,
      aq.answer
    FROM admission_questions aq
    WHERE
      LOWER(aq.question) LIKE ?
      OR LOWER(aq.answer) LIKE ?
    ORDER BY aq.id DESC
    LIMIT ${lim}
    `,
    [like, like]
  );

  if (rows.length) return rows;

  const [all] = await pool.query(
    `
    SELECT
      aq.id,
      aq.category,
      aq.question,
      aq.answer
    FROM admission_questions aq
    `
  );

  return all
    .map((r) => ({ ...r, _score: nlp.similarityScore(raw, `${r.question} ${r.answer}`) }))
    .filter((r) => r._score > 0.12)
    .sort((a, b) => b._score - a._score)
    .slice(0, lim)
    .map(({ _score, ...r }) => r);
}

async function listAdmissionQuestions() {
  const [rows] = await pool.query(
    `SELECT id, question, answer, category, created_at FROM admission_questions ORDER BY id DESC`
  );
  return rows;
}

async function createAdmissionQuestion({ question, answer, category }) {
  const [r] = await pool.query(
    `INSERT INTO admission_questions (question, answer, category) VALUES (?, ?, ?)`,
    [question, answer, category || "Admission"]
  );
  return r.insertId;
}

async function updateAdmissionQuestion(id, { question, answer, category }) {
  const [r] = await pool.query(
    `
    UPDATE admission_questions SET
      question = COALESCE(?, question),
      answer = COALESCE(?, answer),
      category = COALESCE(?, category)
    WHERE id = ?
    `,
    [question ?? null, answer ?? null, category ?? null, Number(id)]
  );
  return r.affectedRows;
}

async function deleteAdmissionQuestion(id) {
  const [r] = await pool.query(`DELETE FROM admission_questions WHERE id = ?`, [Number(id)]);
  return r.affectedRows;
}

async function suggestAdmissionQuestions(prefix, limit = 8) {
  const pref = String(prefix || "").trim();
  const p = `%${pref.toLowerCase()}%`;
  if (pref.length < 2) return [];
  const lim = Math.min(Math.max(Number(limit) || 8, 1), 30);
  const [rows] = await pool.query(
    `SELECT DISTINCT question FROM admission_questions WHERE LOWER(question) LIKE ? ORDER BY id DESC LIMIT ${lim}`,
    [p]
  );
  return rows.map((r) => r.question);
}

async function getAdmissionQuestion(id) {
  const [rows] = await pool.query(`SELECT * FROM admission_questions WHERE id = ? LIMIT 1`, [Number(id)]);
  return rows[0] || null;
}

module.exports = {
  searchAdmissionQuestions,
  suggestAdmissionQuestions,
  listAdmissionQuestions,
  createAdmissionQuestion,
  updateAdmissionQuestion,
  deleteAdmissionQuestion,
  getAdmissionQuestion,
};
