import { searchBible } from "@/lib/server/services/bible";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchBible(query);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Failed to search Bible" }, { status: 500 });
  }
}
