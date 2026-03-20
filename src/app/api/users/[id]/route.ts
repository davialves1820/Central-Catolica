import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import bcrypt from "bcryptjs";

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

    // Remove password
    const { password: _password, ...userWithoutPassword } = user;
    if (_password) {
    } // "Use" to avoid lint warning

    return NextResponse.json(userWithoutPassword);
  } catch {
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

    const { password: _pw, ...userWithoutPassword } = updatedUser;
    if (_pw) {
    }

    return NextResponse.json(userWithoutPassword);
  } catch {
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
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
