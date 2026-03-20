import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");

    if (!classId || !studentId) {
      return NextResponse.json(
        { error: "classId and studentId required" },
        { status: 400 },
      );
    }

    const attendances = await prisma.attendances.findMany({
      where: {
        class_id: classId,
        catechism_student_id: studentId,
      },
    });

    const total = attendances.length;
    const presentCount = attendances.filter((a) => a.present === true).length;
    const frequency = total > 0 ? (presentCount / total) * 100 : 0;

    return NextResponse.json({ frequency });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
