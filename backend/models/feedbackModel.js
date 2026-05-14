const { pool } = require("../db");

/**
 * Creates a new feedback entry in user_experience_feedback
 */
async function createFeedback({ star_rating, feedback_category, feedback_message }) {
  const sql = `
    INSERT INTO user_experience_feedback (star_rating, feedback_category, feedback_message)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.query(sql, [
    star_rating,
    feedback_category,
    feedback_message || null
  ]);
  return result.insertId;
}

/**
 * Lists the latest feedback (for admin dashboard)
 */
async function listFeedback({ limit = 100 } = {}) {
  const [rows] = await pool.query(
    `SELECT * FROM user_experience_feedback ORDER BY id DESC LIMIT ?`,
    [Number(limit) || 100]
  );
  return rows;
}

module.exports = {
  createFeedback,
  listFeedback
};
