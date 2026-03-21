import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function POST(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const data = await request.json();
    const { classId, name, hasBaptism, hasFirstEucharist } = data;

    const newStudent = await prisma.catechism_students.create({
      data: {
        class_id: classId,
        name,
        has_baptism: hasBaptism || false,
        has_first_eucharist: hasFirstEucharist || false,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
