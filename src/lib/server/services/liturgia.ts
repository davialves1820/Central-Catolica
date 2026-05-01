import { LiturgiaDiaria } from "@/types/liturgia";

export async function getLiturgiaDiaria(day?:  string, month?: string, year?: string ): Promise<LiturgiaDiaria | null> {
  try {
    const url = new URL("https://liturgia.up.railway.app/");
    if (day) {
      url.searchParams.set("dia", day);
    }
    if (month) {
      url.searchParams.set("mes", month);
    }
    if (year) {
      url.searchParams.set("ano", year);
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch liturgy data");
    }

    const data: LiturgiaDiaria = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching liturgy:", error);
    return null;
  }
}
