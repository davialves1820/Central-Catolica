import { Noticia } from "@/types";

const FEEDS = {
  vaticannews: {
    url: 'https://www.vaticannews.va/pt.rss.xml',
    label: 'Vatican News',
  },
  /*cnbb: {
    url: 'https://www.cnbb.org.br/feed/',
    label: 'CNBB',
  },
  fides: {
    url: 'https://www.fides.org/pt/rss',
    label: 'Agência Fides',
  },*/
} as const

// Extrai texto simples de um campo XML (ignora CDATA e tags)
function texto(valor: string): string {
  return valor
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim()
}

// Tenta extrair URL da imagem de vários campos RSS comuns
function extrairImagem(item: string): string | undefined {
  const media =
    item.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ??
    item.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ??
    item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ??
    item.match(/<image>[\s\S]*?<url>([\s\S]*?)<\/url>/)?.[1]

  return media ? texto(media) : undefined
}

function parsearItem(raw: string, fonte: keyof typeof FEEDS): Noticia | null {
  const titulo = raw.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  const link = raw.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? raw.match(/<link[^>]+href="([^"]+)"/)?.[1]
  const desc = raw.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? raw.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1]
  const pubDate = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? raw.match(/<dc:date>([\s\S]*?)<\/dc:date>/)?.[1]
  const categoria = raw.match(/<category[^>]*>([\s\S]*?)<\/category>/)?.[1]

  if (!titulo || !link) {
    return null
  }

  const resumoLimpo = texto(desc ?? '').slice(0, 240)
  const resumo = resumoLimpo.length === 240 ? resumoLimpo.slice(0, resumoLimpo.lastIndexOf(' ')) + '…' : resumoLimpo

  return {
    id: Buffer.from(texto(link)).toString('base64'),
    titulo: texto(titulo),
    resumo,
    url: texto(link),
    imagem: extrairImagem(raw),
    categoria: categoria ? texto(categoria) : undefined,
    publicadoEm: pubDate
      ? new Date(texto(pubDate)).toISOString()
      : new Date().toISOString(),
    fonte,
    fonteLabel: FEEDS[fonte].label,
  }
}

export async function buscarNoticias(fontes: (keyof typeof FEEDS)[] = ['vaticannews'], limite = 12): Promise<Noticia[]> {
  const resultados = await Promise.allSettled(
    fontes.map(async (fonte) => {
      const res = await fetch(FEEDS[fonte].url, {
        next: { revalidate: 3600 }, // cache ISR: revalida a cada 1h
        headers: { 'User-Agent': 'CentralCatolica/1.0' },
      })
      if (!res.ok) {
        throw new Error(`Feed ${fonte} retornou ${res.status}`)
      }
      const xml = await res.text()

      const items = xml.match(/<item[\s>][\s\S]*?<\/item>/g) ?? []
      return items
        .map((item) => parsearItem(item, fonte))
        .filter((n): n is Noticia => n !== null)
        .slice(0, limite)
    })
  )

  // Junta resultados de todas as fontes, ordena por data desc, desduplica e limita
  const todas = resultados
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm))

  // Desduplicação por URL
  const unique = Array.from(new Map(todas.map((n) => [n.url, n])).values())

  return unique.slice(0, limite * fontes.length)
}

export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
