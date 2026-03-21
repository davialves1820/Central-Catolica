import { auth } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export async function checkCatequeseAccess() {
  const session = await auth();
  
  if (!session) {
    return { authorized: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const isAuthorizedRole = ["ADMIN", "PADRE"].includes(session.user.role || "");
  const isCrismaCoordinator = session.user.pastorals?.some(
    (p: { slug: string; role: string }) => p.slug === "crisma" && p.role === "COORDENADOR"
  );

  if (!isAuthorizedRole && !isCrismaCoordinator) {
    return { authorized: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { authorized: true, session };
}
