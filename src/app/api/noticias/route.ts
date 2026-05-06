import { NextResponse } from "next/server";
import { buscarNoticias } from "@/lib/server/services/noticias";

export async function GET() {
  const noticias = await buscarNoticias(["vaticannews"], 10);

  return NextResponse.json(noticias);
}

/*// Revalida o cache a cada 1 hora
export const revalidate = 3600

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const fontes = (searchParams.get('fontes') ?? 'vaticannews').split(',') as any[]
  const limite = Number(searchParams.get('limite') ?? 12)

  try {
    const noticias = await buscarNoticias(fontes, limite)
    return NextResponse.json(
      { noticias, total: noticias.length, atualizadoEm: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (err) {
    console.error('[/api/noticias]', err)
    return NextResponse.json({ erro: 'Falha ao buscar notícias' }, { status: 500 })
  }
}
*/