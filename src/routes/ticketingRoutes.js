const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { sendEmail } = require("../utils/sendEmail");
const {
  createTicketValidator,
  assignTicketValidator,
  updateCategoryValidator,
  updateStatusValidator,
  respondTicketValidator,
  deleteTicketValidator,
} = require("../middleware/ticketValidatorMiddleware");

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
router.post("/ticketing", createTicketValidator, postTicketing);

// TICKETING ASSIGN
router.patch("/ticketing/:id/assign", assignTicketValidator, assignTicket);
router.patch(
  "/ticketing/:id/category",
  updateCategoryValidator,
  updateCategoryTicket,
);
router.patch(
  "/ticketing/:id/status",
  updateStatusValidator,
  updateStatusTicket,
);

// TICKETING CATEGORY
router.get("/categories", getCategories);

// TICKETING MANAGE
router.delete("/ticketing/:id", deleteTicketValidator, deleteTicket);

router.patch(
  "/ticketing/:id/respond",
  authenticate,
  respondTicketValidator,
  respondTicket,
);

module.exports = router;
