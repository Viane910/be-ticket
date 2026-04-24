const { VALID_STATUS } = require("../status/ticketStatus");
const { body, param } = require("express-validator");

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

exports.updateStatusValidator = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status wajib diisi")
    .isIn(VALID_STATUS)
    .withMessage(`Status harus salah satu dari: ${VALID_STATUS.join(", ")}`),
];

exports.updateCategoryValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("categoryId")
    .notEmpty()
    .withMessage("Kategori wajib diisi")
    .isInt()
    .withMessage("Kategori harus angka"),
];

exports.respondTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("response").trim().notEmpty().withMessage("Response wajib diisi"),
];

exports.assignTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
  body("assignedToId")
    .notEmpty()
    .withMessage("assignedTo wajib diisi")
    .isInt()
    .withMessage("assignedTo harus angka"),
];

exports.deleteTicketValidator = [
  param("id").isInt().withMessage("ID harus angka"),
];
