const express = require("express");
const {
  getCourses,
  getFeesByCourse,
  getScholarships,
  getHostel,
  getPlacements,
  getImportantDates,
  getContact,
} = require("../controllers/publicController");

const router = express.Router();

router.get("/courses", getCourses);
router.get("/fees/:course", getFeesByCourse);
router.get("/scholarships", getScholarships);
router.get("/hostel", getHostel);
router.get("/placements", getPlacements);
router.get("/important-dates", getImportantDates);
router.get("/contact", getContact);

module.exports = router;
