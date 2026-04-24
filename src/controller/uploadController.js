const prisma = require("../model/prisma");
const fs = require("fs");
const path = require("path");

// 📁 Upload File
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "File tidak ditemukan",
      });
    }

    // 🔥 matikan semua dulu
    await prisma.fileUpload.updateMany({
      data: { isActive: false },
    });

    const saved = await prisma.fileUpload.create({
      data: {
        filename: file.filename,
        filepath: file.path.replace(/\\/g, "/"), // 🔥 fix path
        isActive: true, // 🔥 langsung aktif
      },
    });

    res.json({
      message: "Upload berhasil",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📁 Get All Files
exports.getFiles = async (req, res) => {
  try {
    const files = await prisma.fileUpload.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      data: files,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📁 Edit Nama File
exports.editFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const newFilename = req.body.filename;

    const updated = await prisma.fileUpload.update({
      where: { id: Number(fileId) },
      data: { filename: newFilename },
    });

    res.json({
      message: "File updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📁 Delete File
exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await prisma.fileUpload.findUnique({
      where: { id: Number(fileId) },
    });

    if (!file) {
      return res.status(404).json({ message: "File tidak ditemukan" });
    }

    const filePath = path.join(process.cwd(), file.filepath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.fileUpload.delete({
      where: { id: Number(fileId) },
    });

    res.json({
      message: "File deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📁 Get File Aktif
exports.sendFile = async (req, res) => {
  try {
    let file = await prisma.fileUpload.findFirst({
      where: { isActive: true },
    });

    // 🔥 fallback
    if (!file) {
      file = await prisma.fileUpload.findFirst({
        orderBy: { createdAt: "desc" },
      });
    }

    res.json({ data: file });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📁 Set Active File
exports.setActiveFile = async (req, res) => {
  try {
    const fileId = Number(req.params.id);

    await prisma.fileUpload.updateMany({
      data: { isActive: false },
    });

    const file = await prisma.fileUpload.update({
      where: { id: fileId },
      data: { isActive: true },
    });

    res.json({
      message: "PDF diganti",
      data: file,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
