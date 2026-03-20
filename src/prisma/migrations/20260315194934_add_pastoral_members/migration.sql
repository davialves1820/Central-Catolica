/*
  Warnings:

  - You are about to drop the column `pastoral_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_pastoral_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "pastoral_id";

-- CreateTable
CREATE TABLE "pastoral_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pastoral_id" TEXT NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pastoral_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pastoral_members_user_id_pastoral_id_key" ON "pastoral_members"("user_id", "pastoral_id");

-- AddForeignKey
ALTER TABLE "pastoral_members" ADD CONSTRAINT "pastoral_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pastoral_members" ADD CONSTRAINT "pastoral_members_pastoral_id_fkey" FOREIGN KEY ("pastoral_id") REFERENCES "pastorals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
