import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const data = await request.json();
    const { name, hasBaptism, hasFirstEucharist, status } = data;

    const updatedStudent = await prisma.catechism_students.update({
      where: { id },
      data: {
        name,
        has_baptism: hasBaptism,
        has_first_eucharist: hasFirstEucharist,
        status,
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await prisma.catechism_students.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Student removed" });
  } catch (error) {
    console.error("Error removing student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
