import { NextResponse } from "next/server";
import { signOut } from "@/lib/server/auth";

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
