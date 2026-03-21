import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

function normalizeDate(date: string) {
  const d = new Date(date);

  if (isNaN(d.getTime())) return null;

  d.setHours(0, 0, 0, 0);
  return d;
}

export async function POST(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const body = await request.json();
    const { classId, date, occurred } = body;

    if (!classId || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const meetingDate = normalizeDate(date);

    if (!meetingDate) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const existing = await prisma.catechism_meetings.findFirst({
      where: {
        class_id: classId,
        date: meetingDate,
      },
    });

    if (occurred && !existing) {
      const createdMeeting = await prisma.catechism_meetings.create({
        data: { class_id: classId, date: meetingDate },
      });
      return NextResponse.json({ occurred: true, meeting: createdMeeting });
    }

    if (!occurred && existing) {
      await prisma.catechism_meetings.delete({ where: { id: existing.id } });
      return NextResponse.json({ occurred: false });
    }

    return NextResponse.json({ occurred });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const { searchParams } = new URL(request.url);

    const classId = searchParams.get("classId");
    const date = searchParams.get("date");

    if (!classId || !date) {
      return NextResponse.json({ occurred: false });
    }

    const meetingDate = normalizeDate(date);

    if (!meetingDate) {
      return NextResponse.json({ occurred: false });
    }

    const existing = await prisma.catechism_meetings.findFirst({
      where: { class_id: classId, date: meetingDate },
      select: { id: true, date: true },
    });

    return NextResponse.json({
      occurred: !!existing,
      meetingId: existing?.id || null,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
