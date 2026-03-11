import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

function normalizeDate(date: string) {
  const d = new Date(date)

  if (isNaN(d.getTime())) return null

  d.setHours(0, 0, 0, 0)
  return d
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { classId, date, occurred } = body

    const parsedClassId = Number(classId)

    if (!parsedClassId || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const meetingDate = normalizeDate(date)

    if (!meetingDate) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 })
    }

    const existing = await prisma.catechism_meetings.findFirst({
      where: {
        class_id: parsedClassId,
        date: meetingDate,
      },
    })

    if (occurred && !existing) {
      const createdMeeting = await prisma.catechism_meetings.create({
        data: { class_id: parsedClassId, date: meetingDate },
      });
      return NextResponse.json({ occurred: true, meeting: createdMeeting });
    }

    if (!occurred && existing) {
      await prisma.catechism_meetings.delete({ where: { id: existing.id } });
      return NextResponse.json({ occurred: false });
    }

    return NextResponse.json({ occurred })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const classId = searchParams.get("classId")
    const date = searchParams.get("date")

    const parsedClassId = Number(classId)

    if (!parsedClassId || !date) {
      return NextResponse.json({ occurred: false })
    }

    const meetingDate = normalizeDate(date)

    if (!meetingDate) {
      return NextResponse.json({ occurred: false })
    }

    const existing = await prisma.catechism_meetings.findFirst({
      where: { class_id: parsedClassId, date: meetingDate },
      select: { id: true, date: true },
    });

    return NextResponse.json({
      occurred: !!existing,
      meetingId: existing?.id || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}