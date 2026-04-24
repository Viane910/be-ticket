const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const userRoutes = require("./routes/userRoutes.js");
const ticketingRoutes = require("./routes/ticketingRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

dotenv.config();

let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Made with ❤️ by Dwi Oktaviane");
});

app.use("/uploads", express.static("uploads"));
app.use("/", userRoutes);
app.use("/", ticketingRoutes);
app.use("/", uploadRoutes);

module.exports = app;
