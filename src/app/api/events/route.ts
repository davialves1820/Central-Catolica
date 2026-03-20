import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    const now = new Date();

    const events = await prisma.events.findMany({
      where: activeOnly
        ? {
            is_active: true,
            OR: [{ start_date: null }, { start_date: { lte: now } }],
            AND: [
              {
                OR: [{ end_date: null }, { end_date: { gte: now } }],
              },
            ],
          }
        : {},
      include: {
        pastoral: {
          select: { name: true, slug: true },
        },
        author: {
          select: { full_name: true },
        },
      },
      orderBy: { created_at: "desc" },
      take: limit,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const {
      title,
      description,
      image_url,
      start_date,
      end_date,
      type,
      pastoral_id: raw_pastoral_id,
      meeting_location,
    } = data;

    // Normalize pastoral_id to handle empty strings or "null" from frontend
    const pastoral_id =
      raw_pastoral_id === "" ||
      raw_pastoral_id === "null" ||
      raw_pastoral_id === "undefined"
        ? null
        : raw_pastoral_id;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Authorization logic
    if (session.user.role !== "ADMIN") {
      if (!pastoral_id) {
        return NextResponse.json(
          { error: "Coordinators must associate events with a pastoral" },
          { status: 403 },
        );
      }

      const isCoordinator = session.user.pastorals.some(
        (p: { id: string; role: string }) => p.id === pastoral_id && p.role === "COORDENADOR",
      );

      if (!isCoordinator) {
        return NextResponse.json(
          { error: "You can only post events for pastorals you coordinate" },
          { status: 403 },
        );
      }
    } else {
      // For ADMINs, if pastoral_id is provided, verify it exists (optional but safer)
      if (pastoral_id) {
        const pastoralExists = await prisma.pastorals.findUnique({
          where: { id: pastoral_id },
        });
        if (!pastoralExists) {
          return NextResponse.json(
            { error: "Pastoral not found" },
            { status: 404 },
          );
        }
      }
    }

    const event = await prisma.events.create({
      data: {
        title,
        description,
        image_url,
        start_date:
          start_date && !isNaN(new Date(start_date).getTime())
            ? new Date(start_date)
            : null,
        end_date:
          end_date && !isNaN(new Date(end_date).getTime())
            ? new Date(end_date)
            : null,
        type: type || "EVENT",
        meeting_location,
        pastoral_id,
        created_by_id: session.user.id,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
