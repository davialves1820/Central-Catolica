// app/api/catechism/meetings/all/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"


export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const classId = Number(searchParams.get("classId"))
    if (!classId) return NextResponse.json({ data: [] })

    const meetings = await prisma.catechism_meetings.findMany({
      where: { class_id: classId },
      select: { id: true, date: true },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(meetings)
  } catch (err) {
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}