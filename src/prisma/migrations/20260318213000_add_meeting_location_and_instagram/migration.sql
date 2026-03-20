/*
  Warnings:

  - You are about to alter the column `image_url` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Text`.
  - You are about to alter the column `image_url` on the `pastorals` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Text`.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "image_url" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "pastorals" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "meeting_location" TEXT,
ALTER COLUMN "image_url" SET DATA TYPE TEXT;
