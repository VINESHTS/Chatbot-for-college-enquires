const express = require("express");
const { requireAdminAuth } = require("../middleware/auth");

const c = require("../controllers/adminController");

const router = express.Router();

router.post("/login", c.login);

router.use(requireAdminAuth);

router.get("/faqs", c.listFaqs);
router.post("/faqs", c.createFaq);
router.put("/faqs/:id", c.updateFaq);
router.delete("/faqs/:id", c.deleteFaq);

router.get("/admission-questions", c.listAdmission);
router.post("/admission-questions", c.createAdmission);
router.put("/admission-questions/:id", c.updateAdmission);
router.delete("/admission-questions/:id", c.deleteAdmission);

router.get("/departments", c.listDepartments);
router.post("/departments", c.createDepartment);
router.put("/departments/:id", c.updateDepartment);
router.delete("/departments/:id", c.deleteDepartment);

router.get("/courses", c.listCourses);
router.post("/courses", c.createCourse);
router.put("/courses/:id", c.updateCourse);
router.delete("/courses/:id", c.deleteCourse);

router.get("/fees", c.listFees);
router.post("/fees", c.createFee);
router.put("/fees/:id", c.updateFee);
router.delete("/fees/:id", c.deleteFee);

router.get("/scholarships", c.listScholarships);
router.post("/scholarships", c.createScholarship);
router.put("/scholarships/:id", c.updateScholarship);
router.delete("/scholarships/:id", c.deleteScholarship);

router.get("/hostels", c.listHostels);
router.post("/hostels", c.createHostel);
router.put("/hostels/:id", c.updateHostel);
router.delete("/hostels/:id", c.deleteHostel);

router.get("/placements", c.listPlacements);
router.post("/placements", c.createPlacement);
router.put("/placements/:id", c.updatePlacement);
router.delete("/placements/:id", c.deletePlacement);

router.get("/contacts", c.listContacts);
router.post("/contacts", c.createContact);
router.put("/contacts/:id", c.updateContact);
router.delete("/contacts/:id", c.deleteContact);

router.get("/important-dates", c.listDates);
router.post("/important-dates", c.createDate);
router.put("/important-dates/:id", c.updateDate);
router.delete("/important-dates/:id", c.deleteDate);

router.get("/query-logs", c.getUserQueryLogs);
router.get("/analytics", c.getAnalytics);
router.get("/admin-activity", c.getAdminActivity);
router.get("/chat-feedback", require("../controllers/feedbackController").listFeedback);

module.exports = router;
