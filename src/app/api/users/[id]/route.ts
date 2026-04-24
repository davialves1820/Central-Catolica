import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import bcrypt from "bcryptjs";
import { createLogger } from "@/lib/server/utils/logger";

const logger = createLogger("users-api");

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        pastoral_members: {
          include: { pastoral: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user as Record<string, unknown>;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    logger.error("Error fetching user", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // Simple authorization check - in real app, use proper RBAC
    if (
      session.user.id !== id &&
      !["ADMIN", "PADRE"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();
    const { fullName, email, role, password } = data;

    const updateData: {
      full_name: string;
      email: string;
      updated_at: Date;
      role?: string;
      password?: string;
    } = { full_name: fullName, email, updated_at: new Date() };
    if (
      role &&
      ["ADMIN", "PADRE", "SECRETARIA", "COORDENADOR", "FIEL"].includes(role)
    ) {
      updateData.role = role;
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: updateData,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser as Record<string, unknown>;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    logger.error("Error updating user", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session || !["ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.users.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    logger.error("Error deleting user", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
