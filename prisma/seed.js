const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  await prisma.category.createMany({
    data: [
      {
        category: "Pendaftaran",
      },
      {
        category: "Pembayaran",
      },
      {
        category: "Diklat",
      },
      {
        category: "Lainnya",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: [
      {
        username: "Master_Admin",
        name: "Master Admin",
        role: "MASTER",
        password: await bcrypt.hash("54321", 10),
      },
      {
        username: "Ketua_Alami",
        name: "Ketua Alami",
        role: "MASTER",
        password: await bcrypt.hash("user54321", 10),
      },
    ],
    skipDuplicates: true,
  });
  console.log("Data seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
