import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function GET() {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    // Get students missing sacraments (not DROPPED status and missing baptism or first eucharist)
    const students = await prisma.catechism_students.findMany({
      where: {
        NOT: { status: "DROPPED" },
        OR: [{ has_baptism: false }, { has_first_eucharist: false }],
      },
      include: {
        class: true,
      },
    });

    return NextResponse.json(students);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
