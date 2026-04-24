-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "answeredAt" TIMESTAMP(3),
ADD COLUMN     "answeredById" INTEGER,
ADD COLUMN     "response" TEXT;
