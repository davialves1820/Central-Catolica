import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import { createLogger } from "@/lib/server/utils/logger";

const logger = createLogger("PastoralAPI");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const pastoral = await prisma.pastorals.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: { events: true },
        },
        events: {
          take: 3,
          orderBy: { created_at: "desc" },
          include: {
            author: {
              select: { full_name: true },
            },
          },
        },
      },
    });

    if (!pastoral) {
      return NextResponse.json(
        { error: "Pastoral not found" },
        { status: 404 },
      );
    }

    // Transform the data to match the UI expectations
    const formattedPastoral = {
      ...pastoral,
      meeting_location: pastoral.meeting_location || "",
      coordinatorIds: pastoral.members
        .filter((m) => m.role === "COORDENADOR")
        .map((m) => m.user_id),
      coordinators: pastoral.members
        .filter((m) => m.role === "COORDENADOR")
        .map((m) => ({
          id: m.user.id,
          name: m.user.full_name || m.user.email,
          email: m.user.email,
        })),
    };

    return NextResponse.json(formattedPastoral);
  } catch (error) {
    logger.error("Error fetching pastoral", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug: originalSlug } = await params;

    // Check permissions
    const existingPastoral = await prisma.pastorals.findUnique({
      where: { slug: originalSlug },
      include: {
        members: {
          where: {
            user_id: session.user.id,
            role: "COORDENADOR",
          },
        },
      },
    });

    if (!existingPastoral) {
      return NextResponse.json(
        { error: "Pastoral not found" },
        { status: 404 },
      );
    }

    const isCoordinator = existingPastoral.members.length > 0;
    const isAdmin = session.user.role === "ADMIN";

    if (!isAdmin && !isCoordinator) {
      return NextResponse.json(
        { error: "Forbidden: You are not a coordinator for this pastoral" },
        { status: 403 },
      );
    }

    const data = await request.json();
    const {
      name,
      slug: newSlug,
      description,
      image_url,
      instagram,
      meeting_location,
      coordinatorIds,
    } = data;

    const pastoral = await prisma.$transaction(async (tx) => {
      // 1. Update pastoral basic info
      const updatedPastoral = await tx.pastorals.update({
        where: { id: existingPastoral.id },
        data: {
          name,
          slug: newSlug,
          description,
          image_url,
          instagram,
          meeting_location,
        },
      });

      // 2. Sync coordinators if provided and user is ADMIN (coordinators shouldn't necessarily change other coordinators)
      // Or maybe allow coordinators to manage coworkers? User said "editar a propria pastoral",
      // usually managing coordinators is an admin task, but I'll allow admins to change it.
      if (isAdmin && coordinatorIds && Array.isArray(coordinatorIds)) {
        // Remove existing coordinators
        await tx.pastoral_members.deleteMany({
          where: {
            pastoral_id: updatedPastoral.id,
            role: "COORDENADOR",
          },
        });

        // Add new ones
        if (coordinatorIds.length > 0) {
          await tx.pastoral_members.createMany({
            data: coordinatorIds.map((userId: string) => ({
              user_id: userId,
              pastoral_id: updatedPastoral.id,
              role: "COORDENADOR",
            })),
          });
        }
      }

      return updatedPastoral;
    });

    return NextResponse.json(pastoral);
  } catch (error) {
    logger.error("Error updating pastoral", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
