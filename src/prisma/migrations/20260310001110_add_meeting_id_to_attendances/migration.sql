-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "catechism_meeting_id" INTEGER;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_catechism_meeting_id_foreign" FOREIGN KEY ("catechism_meeting_id") REFERENCES "catechism_meetings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
