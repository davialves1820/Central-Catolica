import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";

interface StudentsByYear {
  year: number;
  total: number;
}

interface MetricsResponse {
  studentsByYear: StudentsByYear[];
  totalStudents: number;
  completionRate: number;
  activeClasses: number;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MetricsResponse | { error: string }>> {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const year = yearParam ? parseInt(yearParam) : undefined;

    // Get all classes with their students
    const classes = await prisma.catechism_classes.findMany({
      where: year ? { year } : undefined,
      include: { students: true },
    });

    // Calculate total students
    let totalStudents = 0;
    for (const cls of classes) {
      totalStudents += cls.students.length;
    }

    // Calculate completed students
    let completedStudents = 0;
    for (const cls of classes) {
      for (const student of cls.students) {
        if (student.status === "COMPLETED") {
          completedStudents += 1;
        }
      }
    }

    // Group students by year
    const studentsByYearMap = new Map<number, number>();
    for (const cls of classes) {
      const currentTotal = studentsByYearMap.get(cls.year) || 0;
      studentsByYearMap.set(cls.year, currentTotal + cls.students.length);
    }

    const studentsByYear: StudentsByYear[] = Array.from(
      studentsByYearMap.entries(),
    ).map(([year, total]) => ({
      year,
      total,
    }));

    // Calculate completion rate
    const completionRate =
      totalStudents > 0 ? (completedStudents / totalStudents) * 100 : 0;
    const activeClasses = classes.length;

    const response: MetricsResponse = {
      studentsByYear,
      totalStudents,
      completionRate: Math.round(completionRate * 100) / 100,
      activeClasses,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
