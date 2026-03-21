// app/api/catechism/meetings/all/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function GET(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId");
    if (!classId) return NextResponse.json([]);

    const meetings = await prisma.catechism_meetings.findMany({
      where: { class_id: classId },
      select: { id: true, date: true },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(meetings);
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
