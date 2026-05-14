const express = require("express");
const { chat, suggestions } = require("../controllers/chatController");
const { submitFeedback } = require("../controllers/feedbackController");
const multilingualMiddleware = require("../middleware/multilingualMiddleware");

const router = express.Router();

router.post("/", multilingualMiddleware, chat);
router.get("/suggestions", multilingualMiddleware, suggestions);
router.post("/feedback", submitFeedback);

module.exports = router;
