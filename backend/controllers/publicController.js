const publicModel = require("../models/publicModel");

async function getCourses(req, res, next) {
  try {
    const courses = await publicModel.listCourses();
    console.log(`[Public API] GET /courses - Found ${courses.length} courses`);
    res.json({ courses });
  } catch (e) {
    console.error(`[Public API] GET /courses error: ${e.message}`);
    next(e);
  }
}

async function getFeesByCourse(req, res, next) {
  try {
    const course = String(req.params.course || "").trim();
    if (!course) return res.status(400).json({ error: "course is required" });

    const fees = await publicModel.getFeesForCourse(course);
    res.json({ course, fees });
  } catch (e) {
    next(e);
  }
}

async function getScholarships(req, res, next) {
  try {
    const scholarships = await publicModel.listScholarships();
    res.json({ scholarships });
  } catch (e) {
    next(e);
  }
}

async function getHostel(req, res, next) {
  try {
    const hostel = await publicModel.getHostelInfo();
    res.json({ hostel });
  } catch (e) {
    next(e);
  }
}

async function getPlacements(req, res, next) {
  try {
    const placements = await publicModel.getPlacementSupport();
    res.json({ placements });
  } catch (e) {
    next(e);
  }
}

async function getImportantDates(req, res, next) {
  try {
    const dates = await publicModel.listImportantDates();
    res.json({ dates });
  } catch (e) {
    next(e);
  }
}

async function getContact(req, res, next) {
  try {
    const contact = await publicModel.getContactSupport();
    res.json({ contact });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getCourses,
  getFeesByCourse,
  getScholarships,
  getHostel,
  getPlacements,
  getImportantDates,
  getContact,
};

