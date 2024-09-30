/*
  Warnings:

  - You are about to drop the column `event_id` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contest_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_event_id_fkey";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "event_id",
ADD COLUMN     "contest_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "event";

-- CreateTable
CREATE TABLE "contest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
