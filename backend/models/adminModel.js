const { pool } = require("../db");

async function findAdminByUsername(username) {
  const [rows] = await pool.query(
    `
    SELECT admin_id, username, password_hash, email, role, created_at, last_login
    FROM admins
    WHERE LOWER(username) = LOWER(?)
    LIMIT 1
    `,
    [String(username || "").trim()]
  );
  return rows[0] || null;
}

async function updateLastLogin(adminId) {
  await pool.query(`UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE admin_id = ?`, [
    Number(adminId),
  ]);
}

async function logAdminActivity({ admin_id, action_type, target_table, target_id, details }) {
  await pool.query(
    `
    INSERT INTO admin_activity_logs (admin_id, action_type, target_table, target_id, details)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      Number(admin_id),
      String(action_type),
      target_table || null,
      target_id != null ? String(target_id) : null,
      details || null,
    ]
  );
}

async function listAdminActivity({ limit = 200 } = {}) {
  const lim = Math.min(Math.max(Number(limit) || 200, 1), 500);
  const [rows] = await pool.query(
    `
    SELECT l.log_id, l.admin_id, a.username, l.action_type, l.target_table, l.target_id, l.timestamp, l.details
    FROM admin_activity_logs l
    JOIN admins a ON a.admin_id = l.admin_id
    ORDER BY l.log_id DESC
    LIMIT ${lim}
    `
  );
  return rows;
}

module.exports = {
  findAdminByUsername,
  updateLastLogin,
  logAdminActivity,
  listAdminActivity,
};
