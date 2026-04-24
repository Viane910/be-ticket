const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMIN_BISPRO").required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  name: Joi.string(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("ADMIN_BISPRO"),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginSchema,
};
