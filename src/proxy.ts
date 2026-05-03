import { NextResponse } from "next/server";
import { auth } from "@/lib/server/auth";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

export const proxy = auth((req) => {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  const { pathname } = req.nextUrl;

  // Rate limiting for auth routes
  if (pathname.startsWith("/api/auth/register") || pathname.startsWith("/api/auth/login")) {
    const now = Date.now();
    const limit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - limit.lastReset > RATE_LIMIT_WINDOW) {
      limit.count = 1;
      limit.lastReset = now;
    } else {
      limit.count++;
    }

    rateLimitMap.set(ip, limit);

    if (limit.count > MAX_REQUESTS) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }
});

export const config = {
  matcher: ["/api/auth/register", "/api/auth/login"],
};
