import { NextResponse } from "next/server";
import { buscarNoticias } from "@/lib/server/services/noticias";

export async function GET() {
  const noticias = await buscarNoticias(["vaticannews"], 10);

  return NextResponse.json(noticias);
}