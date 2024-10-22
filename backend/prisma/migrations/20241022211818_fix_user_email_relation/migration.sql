/*
  Warnings:

  - You are about to drop the column `recipient` on the `email` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `email` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "email" DROP CONSTRAINT "email_user_id_fkey";

-- AlterTable
ALTER TABLE "email" DROP COLUMN "recipient",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "user_email" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "email_id" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "user_email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_user_id_email_id_key" ON "user_email"("user_id", "email_id");

-- AddForeignKey
ALTER TABLE "user_email" ADD CONSTRAINT "user_email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_email" ADD CONSTRAINT "user_email_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
