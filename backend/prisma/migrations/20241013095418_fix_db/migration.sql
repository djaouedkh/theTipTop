/*
  Warnings:

  - You are about to drop the column `issued_date` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `prize_id` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ref` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `prize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prize_distribution` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gain_id` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prize_distribution" DROP CONSTRAINT "prize_distribution_prize_id_fkey";

-- DropForeignKey
ALTER TABLE "prize_distribution" DROP CONSTRAINT "prize_distribution_store_id_fkey";

-- DropForeignKey
ALTER TABLE "prize_distribution" DROP CONSTRAINT "prize_distribution_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_prize_id_fkey";

-- DropIndex
DROP INDEX "ticket_ref_key";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "issued_date",
DROP COLUMN "prize_id",
DROP COLUMN "ref",
DROP COLUMN "status",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gain_id" INTEGER NOT NULL,
ADD COLUMN     "is_delivered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropTable
DROP TABLE "prize";

-- DropTable
DROP TABLE "prize_distribution";

-- CreateTable
CREATE TABLE "gain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "gain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gain_delivery" (
    "id" SERIAL NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "store_id" INTEGER,

    CONSTRAINT "gain_delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gain_delivery_ticket_id_key" ON "gain_delivery"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_code_key" ON "ticket"("code");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_gain_id_fkey" FOREIGN KEY ("gain_id") REFERENCES "gain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gain_delivery" ADD CONSTRAINT "gain_delivery_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gain_delivery" ADD CONSTRAINT "gain_delivery_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
