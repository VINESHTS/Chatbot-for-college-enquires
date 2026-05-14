const { pool } = require("../db");

async function logUserQuery(data) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO users_queries (
        session_id,
        user_input,
        matched_intent,
        response_given,
        language_code,
        response_status,
        confidence_score
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.session_id || null,
        data.user_input,
        data.matched_intent,
        data.response_given,
        data.language_code || "en",
        data.response_status || "answered",
        data.confidence_score ?? null,
      ]
    );

    return result.insertId; // Return insertId
  } catch (error) {
    console.error("logUserQuery error:", error);
    throw error;
  }
}

async function listUserQueries({ limit = 200 } = {}) {
  const lim = Math.min(Math.max(Number(limit) || 200, 1), 500);

  const [rows] = await pool.query(
    `
    SELECT query_id, user_input, matched_intent, response_given, language_code, created_at
    FROM users_queries
    ORDER BY query_id DESC
    LIMIT ${lim}
    `
  );

  return rows;
}

async function getAnalyticsSummary() {
  const [[totals]] = await pool.query(
    `SELECT COUNT(*) AS total_queries FROM users_queries`
  );

  const [byIntent] = await pool.query(
    `
    SELECT COALESCE(matched_intent, 'unknown') AS matched_intent, COUNT(*) AS count
    FROM users_queries
    GROUP BY COALESCE(matched_intent, 'unknown')
    ORDER BY count DESC
    LIMIT 30
    `
  );

  const [byLanguage] = await pool.query(
    `
    SELECT COALESCE(language_code, 'unknown') AS language_code, COUNT(*) AS count
    FROM users_queries
    GROUP BY COALESCE(language_code, 'unknown')
    ORDER BY count DESC
    LIMIT 10
    `
  );

  return { totals, byIntent, byLanguage };
}

module.exports = {
  logUserQuery,
  listUserQueries,
  getAnalyticsSummary,
};