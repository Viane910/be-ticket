const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const ticketingRoutes = require("./routes/ticketingRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Made by Love from Dwi Oktaviane");
});

app.use("/uploads", express.static("uploads"));

app.use("/", userRoutes);
app.use("/", ticketingRoutes);
app.use("/", uploadRoutes);

module.exports = app;
