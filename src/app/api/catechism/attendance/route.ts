import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { classId, studentId, date, present } = await request.json();

    if (!classId || !studentId || present === undefined || !date)
      return NextResponse.json(
        { error: "classId, studentId, date and present are required" },
        { status: 400 },
      );

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // 1. Busca ou cria o encontro da classe para essa data
    let meeting = await prisma.catechism_meetings.findFirst({
      where: { class_id: classId, date: attendanceDate },
    });

    if (!meeting) {
      meeting = await prisma.catechism_meetings.create({
        data: { class_id: classId, date: attendanceDate },
      });
    }

    // 2. Atualiza ou cria a presença do aluno para esse encontro
    const attendance = await prisma.attendances.upsert({
      where: {
        class_id_catechism_student_id_date: {
          class_id: classId,
          catechism_student_id: studentId,
          date: attendanceDate,
        },
      },
      update: {
        present: Boolean(present),
        catechism_meeting_id: meeting.id,
      },
      create: {
        class_id: classId,
        catechism_student_id: studentId,
        date: attendanceDate,
        present: Boolean(present),
        catechism_meeting_id: meeting.id,
      },
    });

    return NextResponse.json(attendance, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
