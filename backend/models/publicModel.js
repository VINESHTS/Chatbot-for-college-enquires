const { pool } = require("../db");
const { COURSE_TOPIC_SYNONYMS } = require("../services/intentService");

async function listDepartments() {
  const [rows] = await pool.query(
    `SELECT dept_id, dept_name, head_name, contact_email, contact_phone FROM departments ORDER BY dept_name`
  );
  return rows;
}

async function listCourses() {
  const [rows] = await pool.query(
    `
    SELECT
      c.course_id,
      c.course_name,
      d.dept_name AS department,
      c.duration,
      c.fee,
      c.eligibility
    FROM courses c
    LEFT JOIN departments d
      ON d.dept_id = c.dept_id
    WHERE c.status = 'active' OR c.status IS NULL
    ORDER BY c.course_name
    `
  );
  return rows;
}

async function getCourseBundleByText(text, fullMessageEn = "") {
  const raw = String(text || "").trim();
  const msg = String(fullMessageEn || "").trim().toLowerCase();

  // Normalize input: remove punctuation and extra spaces
  const normalize = (s) => s.toLowerCase().replace(/[.\/]/g, "").replace(/\s+/g, " ").trim();
  const cleanMsg = normalize(msg.replace(/\b(fee|fees|cost|price|details|structure|admission|eligibility|duration|syllabus)\b/ig, ""));
  const q = normalize(raw) || cleanMsg;

  console.log(`[DB Debug] getCourseBundleByText. q: "${q}"`);

  if (!q) return null;

  // Step 1: Try exact match first
  const [exactMatches] = await pool.query(
    `SELECT course_id, course_name, dept_id, duration, fee, eligibility FROM courses WHERE LOWER(course_name) = ? OR LOWER(REPLACE(REPLACE(course_name, '.', ''), '/', '')) = ?`,
    [q, q]
  );

  if (exactMatches.length > 0) {
    return fetchFullCourseBundle(exactMatches[0].course_id);
  }

  // Step 2: Try specific "starts with" or "contains" match for the actual input term
  // This avoids expansion to broad synonyms if the user was specific.
  const [termMatches] = await pool.query(
    `SELECT course_id, course_name, dept_id, duration, fee, eligibility 
     FROM courses 
     WHERE LOWER(course_name) LIKE ? OR LOWER(course_name) LIKE ?`,
    [`${q} %`, `% ${q}`]
  );

  // Also check if the term itself is in the course name (e.g. "MBA" in "MBA Finance")
  const filteredTermMatches = termMatches.filter(c => {
    const name = c.course_name.toLowerCase();
    const words = name.split(/\s+/);
    return words.includes(q);
  });

  if (filteredTermMatches.length > 0) {
    if (filteredTermMatches.length === 1) {
      return fetchFullCourseBundle(filteredTermMatches[0].course_id);
    }
    return { isMultiple: true, courses: filteredTermMatches };
  }

  // Step 3: Expand via synonyms but be more strict
  let queryTerms = [q];
  for (const [key, syns] of Object.entries(COURSE_TOPIC_SYNONYMS)) {
    if (key === q || syns.includes(q)) {
      queryTerms = [...new Set([key, ...syns])];
      break;
    }
  }

  // Filter out broad terms if we have specific ones
  const broadTerms = ["management", "engineering", "science", "technology", "applications", "commerce", "arts"];
  if (queryTerms.length > 1) {
    const hasSpecific = queryTerms.some(t => !broadTerms.includes(t));
    if (hasSpecific) {
      queryTerms = queryTerms.filter(t => !broadTerms.includes(t) || t === q);
    }
  }

  console.log(`[DB Debug] Filtered query terms: ${queryTerms.join(", ")}`);

  const likeParams = queryTerms.map(t => `%${t}%`);
  const placeholders = likeParams.map(() => "LOWER(course_name) LIKE ?").join(" OR ");

  const [partialMatches] = await pool.query(
    `SELECT course_id, course_name, dept_id, duration, fee, eligibility FROM courses WHERE ${placeholders}`,
    likeParams
  );

  if (partialMatches.length === 0) return null;

  // Final refinement: if multiple matches, prefer those where the term is a distinct word
  const preferredMatches = partialMatches.filter(c => {
    const name = c.course_name.toLowerCase();
    const words = name.split(/\s+/);
    return queryTerms.some(t => words.includes(t));
  });

  const finalResults = preferredMatches.length > 0 ? preferredMatches : partialMatches;

  if (finalResults.length === 1) {
    return fetchFullCourseBundle(finalResults[0].course_id);
  }

  return { isMultiple: true, courses: finalResults };
}

/**
 * Helper to fetch full course details with fees and department
 */
async function fetchFullCourseBundle(courseId) {
  const [rows] = await pool.query(
    `
    SELECT
      c.course_id, c.course_name, c.dept_id, c.duration, c.fee, c.eligibility,
      d.dept_id AS department_id, d.dept_name AS department_name,
      d.head_name AS department_head, d.contact_email AS department_email, d.contact_phone AS department_phone,
      f.fee_id, f.fee_type, f.amount, f.duration AS fee_duration, f.description AS fee_description
    FROM courses c
    LEFT JOIN departments d ON d.dept_id = c.dept_id
    LEFT JOIN fee_structure f ON f.course_id = c.course_id
    WHERE c.course_id = ?
    ORDER BY f.fee_id ASC
    `,
    [courseId]
  );

  if (!rows.length) return null;

  const courseInfo = {
    course_id: rows[0].course_id,
    course_name: rows[0].course_name,
    duration: rows[0].duration,
    fee: rows[0].fee,
    eligibility: rows[0].eligibility,
    dept_id: rows[0].dept_id,
    department_id: rows[0].department_id,
    department_name: rows[0].department_name,
    department_head: rows[0].department_head,
    department_email: rows[0].department_email,
    department_phone: rows[0].department_phone,
  };

  const fees = rows
    .filter((r) => r.fee_id != null)
    .map((r) => ({
      fee_id: r.fee_id,
      fee_type: r.fee_type,
      amount: r.amount,
      duration: r.fee_duration,
      description: r.fee_description,
    }));

  return { course: courseInfo, fees };
}

async function findBestCourseMatchByText(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;
  const normalize = (s) => s.toLowerCase().replace(/[.\/]/g, "").replace(/\s+/g, " ").trim();
  const q = normalize(raw);

  // Step 1: Exact match
  const [exact] = await pool.query(
    `SELECT c.*, d.dept_name AS department_name FROM courses c LEFT JOIN departments d ON d.dept_id = c.dept_id WHERE LOWER(c.course_name) = ? OR LOWER(REPLACE(REPLACE(c.course_name, '.', ''), '/', '')) = ? LIMIT 1`,
    [q, q]
  );
  if (exact[0]) return exact[0];

  // Step 2: Synonym expansion (filtered)
  let queryTerms = [q];
  for (const [key, syns] of Object.entries(COURSE_TOPIC_SYNONYMS)) {
    if (key === q || syns.includes(q)) {
      queryTerms = [...new Set([key, ...syns])];
      break;
    }
  }

  const broadTerms = ["management", "engineering", "science", "technology", "applications", "commerce", "arts"];
  if (queryTerms.length > 1) {
    const hasSpecific = queryTerms.some(t => !broadTerms.includes(t));
    if (hasSpecific) {
      queryTerms = queryTerms.filter(t => !broadTerms.includes(t) || t === q);
    }
  }

  const likeParams = queryTerms.map(t => `%${t}%`);
  const placeholders = likeParams.map(() => "LOWER(c.course_name) LIKE ?").join(" OR ");

  const [rows] = await pool.query(
    `
    SELECT
      c.course_id, c.dept_id, c.course_name, c.duration, c.fee, c.eligibility,
      d.dept_id AS department_id, d.dept_name AS department_name,
      d.head_name AS department_head, d.contact_email AS department_email, d.contact_phone AS department_phone
    FROM courses c
    LEFT JOIN departments d ON d.dept_id = c.dept_id
    WHERE ${placeholders}
    ORDER BY
      CASE
        WHEN LOWER(c.course_name) = ? THEN 0
        WHEN LOWER(c.course_name) LIKE ? THEN 1
        WHEN LOWER(c.course_name) LIKE ? THEN 2
        ELSE 3
      END,
      c.course_id DESC
    `,
    [...likeParams, q, `${q} %`, `% ${q}`]
  );

  if (!rows.length) return null;

  // Prefer word-boundary match
  const bestMatch = rows.find(r => {
    const name = r.course_name.toLowerCase();
    const words = name.split(/\s+/);
    return queryTerms.some(t => words.includes(t));
  });

  return bestMatch || rows[0];
}

async function listFeesExactForCourseName(courseName) {
  const name = String(courseName || "").trim();
  if (!name) return [];

  const [rows] = await pool.query(
    `
    SELECT
      f.fee_id,
      c.course_name,
      f.fee_type,
      f.amount,
      f.duration,
      f.description
    FROM fee_structure f
    JOIN courses c
      ON c.course_id = f.course_id
    WHERE LOWER(c.course_name) = ?
    ORDER BY f.fee_id ASC
    `,
    [name.toLowerCase()]
  );

  return rows;
}

async function findAdmissionLastDate() {
  const [rows] = await pool.query(
    `
    SELECT event_id, event_name, date, description
    FROM important_dates
    WHERE LOWER(event_name) LIKE '%last date%'
       OR LOWER(event_name) LIKE '%last day%'
       OR LOWER(event_name) LIKE '%deadline%'
    ORDER BY date DESC
    LIMIT 1
    `
  );
  return rows[0] || null;
}

async function listFeesForCourseName(partialName) {
  const course = await findBestCourseMatchByText(partialName);
  if (!course?.course_id) return [];
  const [rows] = await pool.query(
    `
    SELECT
      f.fee_id,
      c.course_name,
      f.fee_type,
      f.amount,
      COALESCE(f.duration, '') AS duration,
      f.description
    FROM fee_structure f
    JOIN courses c
      ON c.course_id = f.course_id
    WHERE f.course_id = ?
      AND (f.status = 'active' OR f.status IS NULL)
    ORDER BY
      COALESCE(f.semester_no, 99) ASC,
      f.fee_id ASC
    `,
    [Number(course.course_id)]
  );
  return rows;
}

async function listAllFees() {
  const [rows] = await pool.query(
    `
    SELECT
      f.fee_id,
      c.course_name,
      f.fee_type,
      f.amount,
      COALESCE(f.duration, '') AS duration,
      f.description
    FROM fee_structure f
    JOIN courses c
      ON c.course_id = f.course_id
    WHERE (f.status = 'active' OR f.status IS NULL)
    ORDER BY c.course_name, f.fee_id
    `
  );
  return rows;
}

async function listScholarships() {
  const [rows] = await pool.query(
    `
    SELECT scholarship_id, course_id, name, eligibility, amount, application_deadline, description, status
    FROM scholarships
    WHERE (status = 'active' OR status IS NULL)
    ORDER BY name
    `
  );
  return rows;
}

async function listHostels() {
  const [rows] = await pool.query(
    `
    SELECT hostel_id, type, fee, facilities, total_rooms, available_rooms, warden_name, status
    FROM hostel_information
    WHERE (status = 'active' OR status IS NULL)
    ORDER BY hostel_id
    `
  );
  return rows;
}

async function listPlacements() {
  const [rows] = await pool.query(
    `
    SELECT placement_id AS id, course_id, company_name, package, success_rate, roles_offered, hiring_year, status
    FROM placement_support
    WHERE (status = 'active' OR status IS NULL)
    ORDER BY company_name
    `
  );
  return rows;
}

async function listImportantDates() {
  const [rows] = await pool.query(
    `
    SELECT event_id, course_id, event_type, event_name, date, description, status
    FROM important_dates
    WHERE (status = 'active' OR status IS NULL)
    ORDER BY date ASC
    `
  );
  return rows;
}

async function listContacts() {
  const [rows] = await pool.query(
    `
    SELECT
      c.id,
      d.dept_name AS department,
      c.contact_person,
      c.email,
      c.phone,
      c.office_hours,
      c.status
    FROM contact_support c
    JOIN departments d
      ON d.dept_id = c.dept_id
    WHERE (c.status = 'active' OR c.status IS NULL)
    ORDER BY d.dept_name
    `
  );
  return rows;
}

// Backward-compatible API used by publicController routes
async function getFeesForCourse(courseNameOrCode) {
  return listFeesForCourseName(courseNameOrCode);
}

async function getHostelInfo() {
  const rows = await listHostels();
  return rows[0] || null;
}

async function getPlacementSupport() {
  const rows = await listPlacements();
  return rows[0] || null;
}

async function getContactSupport() {
  const rows = await listContacts();
  return rows[0] || null;
}

function pickCourseFromMessage(messageLower, courses) {
  return (
    courses.find((c) => messageLower.includes(String(c.course_name || "").toLowerCase())) ||
    courses.find((c) => {
      const parts = String(c.course_name || "").toLowerCase().split(/\s+/);
      return parts.some((p) => p.length > 3 && messageLower.includes(p));
    }) ||
    null
  );
}

module.exports = {
  listDepartments,
  listCourses,
  getCourseBundleByText,
  findBestCourseMatchByText,
  listFeesExactForCourseName,
  findAdmissionLastDate,
  listFeesForCourseName,
  listAllFees,
  listScholarships,
  listHostels,
  listPlacements,
  listImportantDates,
  listContacts,
  getFeesForCourse,
  getHostelInfo,
  getPlacementSupport,
  getContactSupport,
  pickCourseFromMessage,
};
