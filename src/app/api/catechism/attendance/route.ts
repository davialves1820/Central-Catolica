import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { classId, studentId, date, present } = await request.json();

    if (!classId || !studentId || present === undefined || !date)
      return NextResponse.json({ error: "classId, studentId, date and present are required" }, { status: 400 });

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // 1. Busca ou cria o encontro da classe para essa data
    let meeting = await prisma.catechism_meetings.findFirst({
      where: { class_id: Number(classId), date: attendanceDate },
    });

    if (!meeting) {
      meeting = await prisma.catechism_meetings.create({
        data: { class_id: Number(classId), date: attendanceDate },
      });
    }

    // 2. Atualiza ou cria a presença do aluno para esse encontro
    const attendance = await prisma.attendances.upsert({
      where: {
        class_id_catechism_student_id_date: {
          class_id: Number(classId),
          catechism_student_id: Number(studentId),
          date: attendanceDate,
        },
      },
      update: { present: Boolean(present) },
      create: {
        class_id: Number(classId),
        catechism_student_id: Number(studentId),
        date: attendanceDate,
        present: Boolean(present),
      },
    });

    return NextResponse.json(attendance, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}