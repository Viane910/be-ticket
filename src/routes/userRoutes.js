const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const {
  createUserSchema,
  updateUserSchema,
  loginSchema,
} = require("../schemas/user.schema");

const {
  postUsers,
  getUsers,
  putUsers,
  deleteUsers,
  loginUser,
} = require("../controller/userContoller");

router.get("/users", authenticate, authorize("MASTER"), getUsers);

router.post(
  "/users",
  authenticate,
  authorize("MASTER"),
  validate(createUserSchema),
  postUsers,
);

router.put(
  "/users/:id",
  authenticate,
  authorize("MASTER"),
  validate(updateUserSchema),
  putUsers,
);

router.delete("/users/:id", authenticate, authorize("MASTER"), deleteUsers);

router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
