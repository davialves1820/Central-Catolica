import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const classDetails = await prisma.catechism_classes.findUnique({
      where: { id },
      include: {
        catechist: true,
        students: { include: { attendances: true } },
        attendances: true,
      },
    });

    if (!classDetails)
      return NextResponse.json({ error: "Class not found" }, { status: 404 });

    const studentsWithFrequency = classDetails.students.map((student) => {
      const total = student.attendances.length;
      const present = student.attendances.filter((a) => a.present).length;
      const frequency = total > 0 ? Math.round((present / total) * 100) : 0;

      return { ...student, frequency };
    });

    return NextResponse.json({
      ...classDetails,
      students: studentsWithFrequency,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const { id } = await context.params;
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const { name, year, catechistId } = await request.json();

    const updatedClass = await prisma.catechism_classes.update({
      where: { id },
      data: { name, year, catechist_id: catechistId },
    });

    return NextResponse.json(updatedClass);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
