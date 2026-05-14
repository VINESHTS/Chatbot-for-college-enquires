/**
 * Creates the default administrator if none exists.
 * Usage: node scripts/bootstrapAdmin.js
 */
const path = require("path");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

async function main() {
  const host = process.env.DB_HOST || "localhost";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "college_enquiry_chatbot";

  const conn = await mysql.createConnection({ host, port, user, password, database });

  const [rows] = await conn.query("SELECT admin_id FROM admins LIMIT 1");
  if (rows.length) {
    // eslint-disable-next-line no-console
    console.log("Admin already exists — skipping bootstrap.");
    await conn.end();
    return;
  }

  const username = process.env.BOOTSTRAP_ADMIN_USERNAME || "admin";
  const plain = process.env.BOOTSTRAP_ADMIN_PASSWORD || "Admin@1234";
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@college.edu";
  const hash = await bcrypt.hash(plain, 10);

  await conn.query(
    "INSERT INTO admins (username, password_hash, email, role) VALUES (?, ?, ?, ?)",
    [username, hash, email, "superadmin"]
  );

  // eslint-disable-next-line no-console
  console.log(`Created admin user "${username}" (${email}). Default password: ${plain}`);
  await conn.end();
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});




