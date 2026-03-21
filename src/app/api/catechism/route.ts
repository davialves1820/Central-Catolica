import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { checkCatequeseAccess } from "@/lib/server/utils/auth-checks";

export async function GET() {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const classes = await prisma.catechism_classes.findMany({
      include: {
        catechist: true,
        students: true,
        attendances: true,
      },
    });

    return NextResponse.json(classes);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const data = await request.json();
    const { name, year, catechistId } = data;

    const newClass = await prisma.catechism_classes.create({
      data: {
        name,
        year,
        catechist_id: catechistId,
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { authorized, response } = await checkCatequeseAccess();
    if (!authorized) {
      return response!;
    }

    const data = await request.json();
    const { id, name, year, catechistId } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Class id is required" },
        { status: 400 },
      );
    }

    const updatedClass = await prisma.catechism_classes.update({
      where: {
        id,
      },
      data: {
        name,
        year,
        catechist_id: catechistId,
      },
    });

    return NextResponse.json(updatedClass);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
