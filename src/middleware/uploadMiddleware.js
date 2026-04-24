const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.replace(/\s+/g, "_");
    const uniqueName = Date.now() + "_" + name;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
