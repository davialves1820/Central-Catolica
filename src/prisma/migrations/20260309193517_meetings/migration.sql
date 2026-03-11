-- CreateTable
CREATE TABLE "attendances" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER,
    "date" DATE NOT NULL,
    "present" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "catechism_student_id" INTEGER,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catechism_classes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "catechist_id" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "catechism_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catechism_students" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "class_id" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "has_baptism" BOOLEAN NOT NULL DEFAULT false,
    "has_first_eucharist" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "catechism_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catechism_meetings" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catechism_meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255),
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL DEFAULT 'FIEL',
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catechism_meetings_class_id_date_key" ON "catechism_meetings"("class_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_catechism_student_id_foreign" FOREIGN KEY ("catechism_student_id") REFERENCES "catechism_students"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_class_id_foreign" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catechism_classes" ADD CONSTRAINT "catechism_classes_catechist_id_foreign" FOREIGN KEY ("catechist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catechism_students" ADD CONSTRAINT "catechism_students_class_id_foreign" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "catechism_meetings" ADD CONSTRAINT "catechism_meetings_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "catechism_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
