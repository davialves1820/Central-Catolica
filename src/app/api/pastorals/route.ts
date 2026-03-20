import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

export async function GET() {
  try {
    const pastorals = await prisma.pastorals.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(pastorals);
  } catch (error) {
    console.error("Error fetching pastorals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();
    const { slug, name, description, image_url, instagram, coordinatorIds } =
      data;

    if (!slug || !name) {
      return NextResponse.json(
        { error: "Slug and Name are required" },
        { status: 400 },
      );
    }

    const pastoral = await prisma.$transaction(async (tx) => {
      const p = await tx.pastorals.create({
        data: {
          slug,
          name,
          description,
          image_url,
          instagram,
        },
      });

      if (
        coordinatorIds &&
        Array.isArray(coordinatorIds) &&
        coordinatorIds.length > 0
      ) {
        await tx.pastoral_members.createMany({
          data: coordinatorIds.map((userId: string) => ({
            user_id: userId,
            pastoral_id: p.id,
            role: "COORDENADOR",
          })),
        });
      }

      return p;
    });

    return NextResponse.json(pastoral, { status: 201 });
  } catch (error) {
    console.error("Error creating pastoral:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
