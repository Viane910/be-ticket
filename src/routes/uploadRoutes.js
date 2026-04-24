const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadFile,
  getFiles,
  editFile,
  deleteFile,
  sendFile,
  setActiveFile,
} = require("../controller/uploadController");

router.post("/upload_file", upload.single("file"), uploadFile);
router.get("/files", getFiles);
router.get("/files/latest", sendFile);
router.put("/file/:id", editFile);
router.delete("/file/:id", deleteFile);
router.put("/files/:id/active", setActiveFile);

module.exports = router;
