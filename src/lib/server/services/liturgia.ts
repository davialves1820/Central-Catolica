import { LiturgiaDiaria } from "@/types/liturgia";
import { cache } from "react";

const TIMEOUT_MS = 5000;
const BASE_URL = "https://liturgia.up.railway.app/";

async function fetchComTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export const getLiturgiaDiaria = cache(async (day?: string, month?: string, year?: string): Promise<LiturgiaDiaria | null> => {
  try {
    const url = new URL(BASE_URL);
    if (day) {
      url.searchParams.set("dia", day);
    }
    if (month) {
      url.searchParams.set("mes", month);
    }
    if (year) {
      url.searchParams.set("ano", year);
    }

    const response = await fetchComTimeout(url.toString());

    if (!response.ok) {
      throw new Error(`Liturgia API retornou ${response.status}`);
    }

    const data: LiturgiaDiaria = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[liturgia] Timeout após", TIMEOUT_MS, "ms");
    } else {
      console.error("[liturgia] Erro ao buscar liturgia:", error);
    }
    return null;
  }
}
);