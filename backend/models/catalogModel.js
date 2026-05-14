const { pool } = require("../db");

async function findDeptIdByName(deptName) {
  const name = String(deptName || "").trim();
  if (!name) return null;
  const [[row]] = await pool.query(`SELECT dept_id FROM departments WHERE dept_name = ? LIMIT 1`, [name]);
  return row?.dept_id || null;
}

async function findCourseIdByName(courseName) {
  const name = String(courseName || "").trim();
  if (!name) return null;
  const [[row]] = await pool.query(`SELECT course_id FROM courses WHERE course_name = ? LIMIT 1`, [name]);
  return row?.course_id || null;
}

/* ---------- departments ---------- */
async function createDepartment({ dept_name, head_name, contact_email, contact_phone }) {
  const [r] = await pool.query(
    `INSERT INTO departments (dept_name, head_name, contact_email, contact_phone) VALUES (?, ?, ?, ?)`,
    [dept_name, head_name || null, contact_email || null, contact_phone || null]
  );
  return r.insertId;
}

async function updateDepartment(dept_id, fields) {
  const [r] = await pool.query(
    `
    UPDATE departments SET
      dept_name = COALESCE(?, dept_name),
      head_name = COALESCE(?, head_name),
      contact_email = COALESCE(?, contact_email),
      contact_phone = COALESCE(?, contact_phone)
    WHERE dept_id = ?
    `,
    [fields.dept_name ?? null, fields.head_name ?? null, fields.contact_email ?? null, fields.contact_phone ?? null, Number(dept_id)]
  );
  return r.affectedRows;
}

async function deleteDepartment(dept_id) {
  const [r] = await pool.query(`DELETE FROM departments WHERE dept_id = ?`, [Number(dept_id)]);
  return r.affectedRows;
}

/* ---------- courses ---------- */
async function createCourse({
  dept_id,
  department, // backward compatible input (dept name)
  course_name,
  course_description,
  duration,
  fee,
  eligibility,
  intake_capacity,
  admission_start_date,
  admission_end_date,
  status,
}) {
  const resolvedDeptId = dept_id != null ? Number(dept_id) : await findDeptIdByName(department);
  if (!resolvedDeptId) {
    const e = new Error("dept_id (or valid department name) is required");
    e.statusCode = 400;
    throw e;
  }
  const [r] = await pool.query(
    `
    INSERT INTO courses (
      dept_id,
      course_name,
      course_description,
      duration,
      fee,
      eligibility,
      intake_capacity,
      admission_start_date,
      admission_end_date,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      resolvedDeptId,
      course_name,
      course_description || null,
      duration || null,
      fee ?? null,
      eligibility || null,
      intake_capacity ?? null,
      admission_start_date || null,
      admission_end_date || null,
      status || "active",
    ]
  );
  return r.insertId;
}

async function updateCourse(course_id, fields) {
  const resolvedDeptId =
    fields.dept_id != null
      ? Number(fields.dept_id)
      : fields.department
        ? await findDeptIdByName(fields.department)
        : null;
  const [r] = await pool.query(
    `
    UPDATE courses SET
      course_name = COALESCE(?, course_name),
      dept_id = COALESCE(?, dept_id),
      duration = COALESCE(?, duration),
      fee = COALESCE(?, fee),
      eligibility = COALESCE(?, eligibility),
      course_description = COALESCE(?, course_description),
      intake_capacity = COALESCE(?, intake_capacity),
      admission_start_date = COALESCE(?, admission_start_date),
      admission_end_date = COALESCE(?, admission_end_date),
      status = COALESCE(?, status)
    WHERE course_id = ?
    `,
    [
      fields.course_name ?? null,
      resolvedDeptId,
      fields.duration ?? null,
      fields.fee ?? null,
      fields.eligibility ?? null,
      fields.course_description ?? null,
      fields.intake_capacity ?? null,
      fields.admission_start_date ?? null,
      fields.admission_end_date ?? null,
      fields.status ?? null,
      Number(course_id),
    ]
  );
  return r.affectedRows;
}

async function deleteCourse(course_id) {
  const [r] = await pool.query(`DELETE FROM courses WHERE course_id = ?`, [Number(course_id)]);
  return r.affectedRows;
}

/* ---------- fee_structure ---------- */
async function createFee({ course_id, course_name, semester_no, fee_type, amount, duration, description, status }) {
  const resolvedCourseId = course_id != null ? Number(course_id) : await findCourseIdByName(course_name);
  if (!resolvedCourseId) {
    const e = new Error("course_id (or valid course_name) is required");
    e.statusCode = 400;
    throw e;
  }
  const [r] = await pool.query(
    `
    INSERT INTO fee_structure (course_id, semester_no, fee_type, amount, duration, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [resolvedCourseId, semester_no ?? null, fee_type, amount, duration || null, description || null, status || "active"]
  );
  return r.insertId;
}

async function updateFee(fee_id, fields) {
  const resolvedCourseId = fields.course_id != null ? Number(fields.course_id) : await findCourseIdByName(fields.course_name);
  const [r] = await pool.query(
    `
    UPDATE fee_structure SET
      course_id = COALESCE(?, course_id),
      semester_no = COALESCE(?, semester_no),
      fee_type = COALESCE(?, fee_type),
      amount = COALESCE(?, amount),
      duration = COALESCE(?, duration),
      description = COALESCE(?, description),
      status = COALESCE(?, status)
    WHERE fee_id = ?
    `,
    [
      resolvedCourseId,
      fields.semester_no ?? null,
      fields.fee_type ?? null,
      fields.amount ?? null,
      fields.duration ?? null,
      fields.description ?? null,
      fields.status ?? null,
      Number(fee_id),
    ]
  );
  return r.affectedRows;
}

async function deleteFee(fee_id) {
  const [r] = await pool.query(`DELETE FROM fee_structure WHERE fee_id = ?`, [Number(fee_id)]);
  return r.affectedRows;
}

/* ---------- scholarships ---------- */
async function createScholarship({ course_id, course_name, name, eligibility, amount, application_deadline, description, status }) {
  const resolvedCourseId = course_id != null ? Number(course_id) : await findCourseIdByName(course_name);
  const [r] = await pool.query(
    `
    INSERT INTO scholarships (course_id, name, eligibility, amount, application_deadline, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [resolvedCourseId || null, name, eligibility || null, amount || null, application_deadline || null, description || null, status || "active"]
  );
  return r.insertId;
}

async function updateScholarship(scholarship_id, fields) {
  const resolvedCourseId = fields.course_id != null ? Number(fields.course_id) : await findCourseIdByName(fields.course_name);
  const [r] = await pool.query(
    `
    UPDATE scholarships SET
      course_id = COALESCE(?, course_id),
      name = COALESCE(?, name),
      eligibility = COALESCE(?, eligibility),
      amount = COALESCE(?, amount),
      application_deadline = COALESCE(?, application_deadline),
      description = COALESCE(?, description),
      status = COALESCE(?, status)
    WHERE scholarship_id = ?
    `,
    [
      resolvedCourseId ?? null,
      fields.name ?? null,
      fields.eligibility ?? null,
      fields.amount ?? null,
      fields.application_deadline ?? null,
      fields.description ?? null,
      fields.status ?? null,
      Number(scholarship_id),
    ]
  );
  return r.affectedRows;
}

async function deleteScholarship(scholarship_id) {
  const [r] = await pool.query(`DELETE FROM scholarships WHERE scholarship_id = ?`, [Number(scholarship_id)]);
  return r.affectedRows;
}

/* ---------- hostel ---------- */
async function createHostel({ type, fee, facilities, total_rooms, available_rooms, warden_name, status }) {
  const [r] = await pool.query(
    `
    INSERT INTO hostel_information (type, fee, facilities, total_rooms, available_rooms, warden_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [type, fee ?? null, facilities || null, total_rooms ?? null, available_rooms ?? null, warden_name || null, status || "active"]
  );
  return r.insertId;
}

async function updateHostel(hostel_id, fields) {
  const [r] = await pool.query(
    `
    UPDATE hostel_information SET
      type = COALESCE(?, type),
      fee = COALESCE(?, fee),
      facilities = COALESCE(?, facilities),
      total_rooms = COALESCE(?, total_rooms),
      available_rooms = COALESCE(?, available_rooms),
      warden_name = COALESCE(?, warden_name),
      status = COALESCE(?, status)
    WHERE hostel_id = ?
    `,
    [
      fields.type ?? null,
      fields.fee ?? null,
      fields.facilities ?? null,
      fields.total_rooms ?? null,
      fields.available_rooms ?? null,
      fields.warden_name ?? null,
      fields.status ?? null,
      Number(hostel_id),
    ]
  );
  return r.affectedRows;
}

async function deleteHostel(hostel_id) {
  const [r] = await pool.query(`DELETE FROM hostel_information WHERE hostel_id = ?`, [Number(hostel_id)]);
  return r.affectedRows;
}

/* ---------- placements ---------- */
async function createPlacement({ course_id, course_name, company_name, package, success_rate, roles_offered, hiring_year, status }) {
  const resolvedCourseId = course_id != null ? Number(course_id) : await findCourseIdByName(course_name);
  const safeCompany = String(company_name || "").trim() || "Unknown Company";
  const [r] = await pool.query(
    `
    INSERT INTO placement_support (course_id, company_name, package, success_rate, roles_offered, hiring_year, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      resolvedCourseId || null,
      safeCompany,
      package || null,
      success_rate || null,
      roles_offered || null,
      hiring_year || new Date().getFullYear(),
      status || "active",
    ]
  );
  return r.insertId;
}

async function updatePlacement(id, fields) {
  const resolvedCourseId = fields.course_id != null ? Number(fields.course_id) : await findCourseIdByName(fields.course_name);
  const [r] = await pool.query(
    `
    UPDATE placement_support SET
      course_id = COALESCE(?, course_id),
      company_name = COALESCE(?, company_name),
      package = COALESCE(?, package),
      success_rate = COALESCE(?, success_rate),
      roles_offered = COALESCE(?, roles_offered),
      hiring_year = COALESCE(?, hiring_year),
      status = COALESCE(?, status)
    WHERE placement_id = ?
    `,
    [
      resolvedCourseId ?? null,
      fields.company_name ?? null,
      fields.package ?? null,
      fields.success_rate ?? null,
      fields.roles_offered ?? null,
      fields.hiring_year ?? null,
      fields.status ?? null,
      Number(id),
    ]
  );
  return r.affectedRows;
}

async function deletePlacement(id) {
  const [r] = await pool.query(`DELETE FROM placement_support WHERE placement_id = ?`, [Number(id)]);
  return r.affectedRows;
}

/* ---------- contacts ---------- */
async function createContact({ dept_id, department, contact_person, email, phone, office_hours, status }) {
  const resolvedDeptId = dept_id != null ? Number(dept_id) : await findDeptIdByName(department);
  if (!resolvedDeptId) {
    const e = new Error("dept_id (or valid department name) is required");
    e.statusCode = 400;
    throw e;
  }
  const [r] = await pool.query(
    `
    INSERT INTO contact_support (dept_id, department, contact_person, email, phone, office_hours, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [resolvedDeptId, department || null, contact_person || null, email || null, phone || null, office_hours || null, status || "active"]
  );
  return r.insertId;
}

async function updateContact(id, fields) {
  const resolvedDeptId =
    fields.dept_id != null
      ? Number(fields.dept_id)
      : fields.department
        ? await findDeptIdByName(fields.department)
        : null;
  const [r] = await pool.query(
    `
    UPDATE contact_support SET
      dept_id = COALESCE(?, dept_id),
      department = COALESCE(?, department),
      contact_person = COALESCE(?, contact_person),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      office_hours = COALESCE(?, office_hours),
      status = COALESCE(?, status)
    WHERE id = ?
    `,
    [
      resolvedDeptId,
      fields.department ?? null,
      fields.contact_person ?? null,
      fields.email ?? null,
      fields.phone ?? null,
      fields.office_hours ?? null,
      fields.status ?? null,
      Number(id),
    ]
  );
  return r.affectedRows;
}

async function deleteContact(id) {
  const [r] = await pool.query(`DELETE FROM contact_support WHERE id = ?`, [Number(id)]);
  return r.affectedRows;
}

/* ---------- important dates ---------- */
async function createImportantDate({ course_id, course_name, event_type, event_name, date, description, status }) {
  const resolvedCourseId = course_id != null ? Number(course_id) : await findCourseIdByName(course_name);
  const [r] = await pool.query(
    `
    INSERT INTO important_dates (course_id, event_type, event_name, date, description, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [resolvedCourseId || null, event_type || "general", event_name, date, description || null, status || "active"]
  );
  return r.insertId;
}

async function updateImportantDate(event_id, fields) {
  const resolvedCourseId = fields.course_id != null ? Number(fields.course_id) : await findCourseIdByName(fields.course_name);
  const [r] = await pool.query(
    `
    UPDATE important_dates SET
      course_id = COALESCE(?, course_id),
      event_type = COALESCE(?, event_type),
      event_name = COALESCE(?, event_name),
      date = COALESCE(?, date),
      description = COALESCE(?, description),
      status = COALESCE(?, status)
    WHERE event_id = ?
    `,
    [
      resolvedCourseId ?? null,
      fields.event_type ?? null,
      fields.event_name ?? null,
      fields.date ?? null,
      fields.description ?? null,
      fields.status ?? null,
      Number(event_id),
    ]
  );
  return r.affectedRows;
}

async function deleteImportantDate(event_id) {
  const [r] = await pool.query(`DELETE FROM important_dates WHERE event_id = ?`, [Number(event_id)]);
  return r.affectedRows;
}

module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  createCourse,
  updateCourse,
  deleteCourse,
  createFee,
  updateFee,
  deleteFee,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  createHostel,
  updateHostel,
  deleteHostel,
  createPlacement,
  updatePlacement,
  deletePlacement,
  createContact,
  updateContact,
  deleteContact,
  createImportantDate,
  updateImportantDate,
  deleteImportantDate,
};
