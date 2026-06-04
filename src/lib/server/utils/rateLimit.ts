import { NextRequest, NextResponse } from "next/server";

interface Janela {
  count: number;
  resetAt: number;
}

const store = new Map<string, Janela>();

setInterval(() => {
  const agora = Date.now();
  for (const [key, janela] of store.entries()) {
    if (janela.resetAt < agora) {
      store.delete(key);
    }
  }
}, 60_000);

interface OpsRateLimit {
  limite?: number;
  janela?: number;
}

export function verificarRateLimit(
  request: NextRequest,
  { limite = 30, janela = 60_000 }: OpsRateLimit = {}
): NextResponse | null {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const agora = Date.now();
  const entrada = store.get(ip);

  if (!entrada || entrada.resetAt < agora) {
    store.set(ip, { count: 1, resetAt: agora + janela });
    return null;
  }

  if (entrada.count >= limite) {
    const retryAfter = Math.ceil((entrada.resetAt - agora) / 1000);
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em instantes." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limite),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(entrada.resetAt / 1000)),
        },
      }
    );
  }

  entrada.count++;
  return null;
}
