const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { sendEmail } = require("../utils/sendEmail");

const {
  postTicketing,
  getTicketing,
  assignTicket,
  updateCategoryTicket,
  getCategories,
  updateStatusTicket,
  deleteTicket,
  respondTicket,
} = require("../controller/ticketingController");

// TICKETING USER
router.get("/ticketing", getTicketing);
router.post("/ticketing", postTicketing);

// TICKETING ASSIGN
router.patch("/ticketing/:id/assign", assignTicket);
router.patch("/ticketing/:id/category", updateCategoryTicket);
router.patch("/ticketing/:id/status", updateStatusTicket);

// TICKETING CATEGORY
router.get("/categories", getCategories);

// TICKETING MANAGE
router.delete("/ticketing/:id", deleteTicket);

// TICKETING RESPONSE
router.patch("/ticketing/:id/respond", authenticate, respondTicket);

module.exports = router;
