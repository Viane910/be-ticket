const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendEmail } = require("../utils/sendEmail");
const { validationResult } = require("express-validator");

// =========================
// CREATE TICKET
// =========================
exports.postTicketing = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message, categoryId } = req.body;

    const createdTicketing = await prisma.ticket.create({
      data: {
        name,
        email,
        message,
        categoryId: Number(categoryId),
      },
    });

    res.json({
      data: createdTicketing,
      message: "Ticketing created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// GET TICKETS (WITH ASSIGN)
// =========================
exports.getTicketing = async (req, res) => {
  try {
    const ticketing = await prisma.ticket.findMany({
      include: {
        category: true,
        assignedTo: true,
      },
      orderBy: { createAt: "desc" },
    });

    const formatted = ticketing.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      message: item.message,
      response: item.response,
      status: item.status,
      category: item.category.category,
      assignedTo: item.assignedTo?.username || null,
      assignedToId: item.assignedToId,
    }));

    res.json({ data: formatted, message: "Success get ticketing" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ASSIGN TICKET
// =========================
exports.assignTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { assignedToId } = req.body;

    const updated = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        assignedToId: Number(assignedToId),
        status: "Diproses", // ✅ TAMBAH INI
      },
    });

    res.json({ data: updated, message: "Ticket berhasil di-assign" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE CATEGORY
// =========================
exports.updateCategoryTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { categoryId } = req.body;

    const updated = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        categoryId: Number(categoryId),
        status: "Diproses", // ✅ TAMBAH INI
      },
      include: { category: true },
    });

    res.json({ data: updated, message: "Category berhasil diupdate" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// GET CATEGORIES
// =========================
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });

    res.json({ data: categories, message: "Success get categories" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE STATUS TICKET
// =========================
exports.updateStatusTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.ticket.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json({ data: updated, message: "Status berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// DELETE TICKET
// =========================

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket tidak ditemukan",
      });
    }

    await prisma.ticket.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      success: true,
      message: "Ticket berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete Ticket Error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// =========================
// RESPOND TICKETING
// =========================
exports.respondTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { response } = req.body;
    const userId = req.user.id;

    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    if (!ticket || ticket.assignedToId !== userId) {
      return res.status(403).json({
        message: "Tidak punya akses ke ticket ini",
      });
    }

    const updated = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        response,
        answeredAt: new Date(),
        answeredById: userId,
        status: "Sudah Dijawab",
      },
    });

    await sendEmail(
      ticket.email,
      "Halo, Terimakasih telah Menghubungi Layanan Ticketing BP2TL Jakarta. Ini adalah Jawaban Ticket Anda",
      `
  <div style="font-family:sans-serif">
    <h2>Halo ${ticket.name} 👋</h2>

    <p><b>Pertanyaan Anda:</b></p>
    <p>${ticket.message}</p>

    <hr/>

    <p><b>Jawaban Admin:</b></p>
    <p>${response}</p>

    <br/>
    <p>Terima kasih 🙏</p>
  </div>
  `,
    );

    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
