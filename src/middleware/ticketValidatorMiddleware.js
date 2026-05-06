const { VALID_STATUS } = require("../status/ticketStatus");
const { body, param } = require("express-validator");

// Create Ticket Validator
exports.createTicketValidator = [
  body("name").trim().notEmpty().withMessage("Nama wajib diisi"),

  body("email").isEmail().withMessage("Email tidak valid").normalizeEmail(),

  body("message").trim().notEmpty().withMessage("Pesan wajib diisi"),

  body("categoryId")
    .notEmpty()
    .withMessage("Kategori wajib dipilih")
    .isInt()
    .withMessage("Kategori harus berupa angka"),
];

// CreateAt Validator
exports.createAtValidator = [
  param("id").isInt().withMessage("ID harus angka"),
];

// AnswerAt Validator
exports.answerAtValidator = [
  param("id").isInt().withMessage("ID harus angka"),
];

// Update Status Validator
exports.updateStatusValidator = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status wajib diisi")
    .isIn(VALID_STATUS)
    .withMessage(`Status harus salah satu dari: ${VALID_STATUS.join(", ")}`),
];

// Update Category Validator
exports.updateCategoryValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("categoryId")
    .notEmpty()
    .withMessage("Kategori wajib diisi")
    .isInt()
    .withMessage("Kategori harus angka"),
];

// Respond Ticket Validator
exports.respondTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("response").trim().notEmpty().withMessage("Response wajib diisi"),
];

// Assign Ticket Validator
exports.assignTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("assignedToId")
    .notEmpty()
    .withMessage("assignedTo wajib diisi")
    .isInt()
    .withMessage("assignedTo harus angka"),
];

// Delete Ticket Validator
exports.deleteTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
];
