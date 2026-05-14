const mysql = require("mysql2/promise");
const { db } = require("./config/env");

/**
 * MySQL connection pool.
 * Use pool.query(sql, params) for simple queries.
 */
const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
});

async function pingDb() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
  } finally {
    conn.release();
  }
}

module.exports = { pool, pingDb };
