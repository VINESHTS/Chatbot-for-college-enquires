const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../config/env");

const adminModel = require("../models/adminModel");
const faqModel = require("../models/faqModel");
const admissionModel = require("../models/admissionModel");
const logModel = require("../models/logModel");
const publicModel = require("../models/publicModel");
const catalogModel = require("../models/catalogModel");

async function login(req, res, next) {
  try {
    const username = String(req.body?.username || "").trim();
    const password = String(req.body?.password || "");
    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const admin = await adminModel.findAdminByUsername(username);
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: admin.admin_id, username: admin.username, role: admin.role || "admin" },
      auth.jwtSecret,
      { expiresIn: auth.jwtExpiresIn }
    );

    await adminModel.updateLastLogin(admin.admin_id);
    await adminModel.logAdminActivity({
      admin_id: admin.admin_id,
      action_type: "login",
      target_table: "admins",
      target_id: String(admin.admin_id),
      details: `Admin login: ${admin.username}`,
    });

    res.json({
      token,
      admin: { admin_id: admin.admin_id, username: admin.username, email: admin.email, role: admin.role },
    });
  } catch (e) {
    next(e);
  }
}

function audit(req, action_type, target_table, target_id, details) {
  return adminModel.logAdminActivity({
    admin_id: req.user.sub,
    action_type,
    target_table,
    target_id: target_id != null ? String(target_id) : null,
    details,
  });
}

/* ---------- FAQs ---------- */
async function listFaqs(req, res, next) {
  try {
    const faqs = await faqModel.listFaqs();
    res.json({ faqs });
  } catch (e) {
    next(e);
  }
}

async function createFaq(req, res, next) {
  try {
    const { intent, question, response, category } = req.body || {};
    if (!question || !response) return res.status(400).json({ error: "question and response are required" });
    const id = await faqModel.createFaq({ intent, question, response, category });
    await audit(req, "create", "faqs", id, "Created FAQ");
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
}

async function updateFaq(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });
    const { intent, question, response, category } = req.body || {};
    const affected = await faqModel.updateFaq(id, { intent, question, response, category });
    if (!affected) return res.status(404).json({ error: "FAQ not found" });
    await audit(req, "update", "faqs", id, "Updated FAQ");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function deleteFaq(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });
    const affected = await faqModel.deleteFaq(id);
    if (!affected) return res.status(404).json({ error: "FAQ not found" });
    await audit(req, "delete", "faqs", id, "Deleted FAQ");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

/* ---------- Admissions Q&A ---------- */
async function listAdmission(req, res, next) {
  try {
    const rows = await admissionModel.listAdmissionQuestions();
    res.json({ admission_questions: rows });
  } catch (e) {
    next(e);
  }
}

async function createAdmission(req, res, next) {
  try {
    const { question, answer, category } = req.body || {};
    if (!question || !answer) return res.status(400).json({ error: "question and answer are required" });
    const id = await admissionModel.createAdmissionQuestion({ question, answer, category });
    await audit(req, "create", "admission_questions", id, "Created admission Q");
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
}

async function updateAdmission(req, res, next) {
  try {
    const id = Number(req.params.id);
    const affected = await admissionModel.updateAdmissionQuestion(id, req.body || {});
    if (!affected) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "admission_questions", id, "Updated admission Q");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function deleteAdmission(req, res, next) {
  try {
    const id = Number(req.params.id);
    const affected = await admissionModel.deleteAdmissionQuestion(id);
    if (!affected) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "admission_questions", id, "Deleted admission Q");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

/* ---------- Catalog reads ---------- */
async function listDepartments(req, res, next) {
  try {
    res.json({ departments: await publicModel.listDepartments() });
  } catch (e) {
    next(e);
  }
}
async function listCourses(req, res, next) {
  try {
    res.json({ courses: await publicModel.listCourses() });
  } catch (e) {
    next(e);
  }
}
async function listFees(req, res, next) {
  try {
    res.json({ fees: await publicModel.listAllFees() });
  } catch (e) {
    next(e);
  }
}
async function listScholarships(req, res, next) {
  try {
    res.json({ scholarships: await publicModel.listScholarships() });
  } catch (e) {
    next(e);
  }
}
async function listHostels(req, res, next) {
  try {
    res.json({ hostels: await publicModel.listHostels() });
  } catch (e) {
    next(e);
  }
}
async function listPlacements(req, res, next) {
  try {
    res.json({ placements: await publicModel.listPlacements() });
  } catch (e) {
    next(e);
  }
}
async function listContacts(req, res, next) {
  try {
    res.json({ contacts: await publicModel.listContacts() });
  } catch (e) {
    next(e);
  }
}
async function listDates(req, res, next) {
  try {
    res.json({ dates: await publicModel.listImportantDates() });
  } catch (e) {
    next(e);
  }
}

/* ---------- Catalog writes ---------- */
async function createDepartment(req, res, next) {
  try {
    const id = await catalogModel.createDepartment(req.body || {});
    await audit(req, "create", "departments", id, "Created department");
    res.status(201).json({ dept_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateDepartment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateDepartment(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "departments", id, "Updated department");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteDepartment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteDepartment(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "departments", id, "Deleted department");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createCourse(req, res, next) {
  try {
    const id = await catalogModel.createCourse(req.body || {});
    await audit(req, "create", "courses", id, "Created course");
    res.status(201).json({ course_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateCourse(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateCourse(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "courses", id, "Updated course");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteCourse(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteCourse(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "courses", id, "Deleted course");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createFee(req, res, next) {
  try {
    const id = await catalogModel.createFee(req.body || {});
    await audit(req, "create", "fee_structure", id, "Created fee row");
    res.status(201).json({ fee_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateFee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateFee(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "fee_structure", id, "Updated fee row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteFee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteFee(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "fee_structure", id, "Deleted fee row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createScholarship(req, res, next) {
  try {
    const id = await catalogModel.createScholarship(req.body || {});
    await audit(req, "create", "scholarships", id, "Created scholarship");
    res.status(201).json({ scholarship_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateScholarship(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateScholarship(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "scholarships", id, "Updated scholarship");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteScholarship(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteScholarship(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "scholarships", id, "Deleted scholarship");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createHostel(req, res, next) {
  try {
    const id = await catalogModel.createHostel(req.body || {});
    await audit(req, "create", "hostel_information", id, "Created hostel row");
    res.status(201).json({ hostel_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateHostel(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateHostel(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "hostel_information", id, "Updated hostel row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteHostel(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteHostel(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "hostel_information", id, "Deleted hostel row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createPlacement(req, res, next) {
  try {
    const id = await catalogModel.createPlacement(req.body || {});
    await audit(req, "create", "placement_support", id, "Created placement row");
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
}
async function updatePlacement(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updatePlacement(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "placement_support", id, "Updated placement row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deletePlacement(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deletePlacement(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "placement_support", id, "Deleted placement row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createContact(req, res, next) {
  try {
    const id = await catalogModel.createContact(req.body || {});
    await audit(req, "create", "contact_support", id, "Created contact row");
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
}
async function updateContact(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateContact(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "contact_support", id, "Updated contact row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteContact(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteContact(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "contact_support", id, "Deleted contact row");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function createDate(req, res, next) {
  try {
    const id = await catalogModel.createImportantDate(req.body || {});
    await audit(req, "create", "important_dates", id, "Created important date");
    res.status(201).json({ event_id: id });
  } catch (e) {
    next(e);
  }
}
async function updateDate(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.updateImportantDate(id, req.body || {});
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "update", "important_dates", id, "Updated important date");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
async function deleteDate(req, res, next) {
  try {
    const id = Number(req.params.id);
    const n = await catalogModel.deleteImportantDate(id);
    if (!n) return res.status(404).json({ error: "Not found" });
    await audit(req, "delete", "important_dates", id, "Deleted important date");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

/* ---------- Logs ---------- */
async function getUserQueryLogs(req, res, next) {
  try {
    const logs = await logModel.listUserQueries({ limit: req.query.limit });
    res.json({ logs });
  } catch (e) {
    next(e);
  }
}

async function getAnalytics(req, res, next) {
  try {
    const analytics = await logModel.getAnalyticsSummary();
    res.json({ analytics });
  } catch (e) {
    next(e);
  }
}

async function getAdminActivity(req, res, next) {
  try {
    const logs = await adminModel.listAdminActivity({ limit: req.query.limit });
    res.json({ admin_activity: logs });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  login,
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  listAdmission,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  listDepartments,
  listCourses,
  listFees,
  listScholarships,
  listHostels,
  listPlacements,
  listContacts,
  listDates,
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
  createDate,
  updateDate,
  deleteDate,
  getUserQueryLogs,
  getAnalytics,
  getAdminActivity,
};
