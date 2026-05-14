const feedbackModel = require("../models/feedbackModel");

/**
 * Handles the submission of new user feedback
 */
async function submitFeedback(req, res, next) {
  try {
    const { star_rating, feedback_category, feedback_message } = req.body;

    console.log("[Feedback API] Received submission:", req.body);

    // Basic validation
    if (!star_rating || !feedback_category) {
      console.warn("[Feedback API] Validation failed: rating or category missing.");
      return res.status(400).json({ 
        ok: false, 
        error: "Star rating and category are required." 
      });
    }

    const feedbackId = await feedbackModel.createFeedback({
      star_rating: parseInt(star_rating),
      feedback_category,
      feedback_message: feedback_message || ""
    });

    console.log(`[Feedback API] Success. New entry ID: ${feedbackId}`);

    return res.status(201).json({
      ok: true,
      id: feedbackId,
      message: "Feedback submitted successfully."
    });
  } catch (err) {
    console.error("[Feedback API] Error:", err.message);
    next(err);
  }
}

/**
 * Lists feedback for the admin panel
 */
async function listFeedback(req, res, next) {
  try {
    const logs = await feedbackModel.listFeedback({ limit: req.query.limit });
    res.json({ ok: true, feedback: logs });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitFeedback,
  listFeedback
};
