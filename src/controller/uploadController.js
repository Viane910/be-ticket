const supabase = require("../supabase");
const prisma = require("../model/prisma");
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

    const fileName = Date.now() + "_" + file.originalname;

    // 🔥 upload ke supabase storage
    const { data, error } = await supabase.storage
      .from("files") // nama bucket
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    // 🔥 ambil public URL
    const { data: publicData } = supabase.storage
      .from("files")
      .getPublicUrl(fileName);

    const publicUrl = publicData.publicUrl;

    // 🔥 matikan semua dulu
    await prisma.fileUpload.updateMany({
      data: { isActive: false },
    });

    const saved = await prisma.fileUpload.create({
      data: {
        filename: fileName,
        filepath: publicUrl,
        isActive: true,
      },
    });

    res.json({
      message: "Upload berhasil",
      data: saved,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
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

    // 🔥 ambil nama file dari URL
    const fileName = file.filename;

    // 🔥 hapus dari Supabase
    const { error } = await supabase.storage.from("files").remove([fileName]);

    if (error) throw error;

    // 🔥 hapus dari DB
    await prisma.fileUpload.delete({
      where: { id: Number(fileId) },
    });

    res.json({
      message: "File deleted",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
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
