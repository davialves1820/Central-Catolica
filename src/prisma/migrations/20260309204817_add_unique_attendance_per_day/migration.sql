/*
  Warnings:

  - A unique constraint covering the columns `[class_id,catechism_student_id,date]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendances_class_id_catechism_student_id_date_key" ON "attendances"("class_id", "catechism_student_id", "date");
