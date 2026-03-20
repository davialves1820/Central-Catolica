/*
  Warnings:

  - The primary key for the `attendances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `catechism_classes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `catechism_meetings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `catechism_students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_catechism_meeting_id_foreign";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_catechism_student_id_foreign";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_class_id_foreign";

-- DropForeignKey
ALTER TABLE "catechism_classes" DROP CONSTRAINT "catechism_classes_catechist_id_foreign";

-- DropForeignKey
ALTER TABLE "catechism_meetings" DROP CONSTRAINT "catechism_meetings_class_id_fkey";

-- DropForeignKey
ALTER TABLE "catechism_students" DROP CONSTRAINT "catechism_students_class_id_foreign";

-- AlterTable
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "class_id" SET DATA TYPE TEXT,
ALTER COLUMN "catechism_student_id" SET DATA TYPE TEXT,
ALTER COLUMN "catechism_meeting_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "attendances_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "attendances_id_seq";

-- AlterTable
ALTER TABLE "catechism_classes" DROP CONSTRAINT "catechism_classes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "catechist_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "catechism_classes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "catechism_classes_id_seq";

-- AlterTable
ALTER TABLE "catechism_meetings" DROP CONSTRAINT "catechism_meetings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "class_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "catechism_meetings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "catechism_meetings_id_seq";

-- AlterTable
ALTER TABLE "catechism_students" DROP CONSTRAINT "catechism_students_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "class_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "catechism_students_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "catechism_students_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "pastoral_id" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "pastorals" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pastorals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" VARCHAR(255),
    "start_date" TIMESTAMPTZ(6),
    "end_date" TIMESTAMPTZ(6),
    "type" VARCHAR(50) NOT NULL DEFAULT 'EVENT',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "pastoral_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pastorals_slug_key" ON "pastorals"("slug");

-- CreateIndex
CREATE INDEX "events_pastoral_id_idx" ON "events"("pastoral_id");

-- CreateIndex
CREATE INDEX "events_start_date_end_date_idx" ON "events"("start_date", "end_date");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_pastoral_id_fkey" FOREIGN KEY ("pastoral_id") REFERENCES "pastorals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pastoral_id_fkey" FOREIGN KEY ("pastoral_id") REFERENCES "pastorals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechism_classes" ADD CONSTRAINT "catechism_classes_catechist_id_fkey" FOREIGN KEY ("catechist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechism_students" ADD CONSTRAINT "catechism_students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechism_meetings" ADD CONSTRAINT "catechism_meetings_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_catechism_meeting_id_fkey" FOREIGN KEY ("catechism_meeting_id") REFERENCES "catechism_meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_catechism_student_id_fkey" FOREIGN KEY ("catechism_student_id") REFERENCES "catechism_students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "users_email_unique" RENAME TO "users_email_key";
