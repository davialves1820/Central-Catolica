import { Noticia } from "@/types/noticias";
import { XMLParser } from "fast-xml-parser";

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
function texto(valor: unknown): string {
  if (valor === undefined || valor === null) return "";
  let str = "";
  if (typeof valor === "object") {
    const valObj = valor as Record<string, unknown>;
    str = typeof valObj["#text"] === "string" ? valObj["#text"] : JSON.stringify(valor);
  } else {
    str = String(valor);
  }
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function parsearItem(item: any, fonte: keyof typeof FEEDS): Noticia | null {
  const titulo = item.title;
  const link = item.link;
  const desc = item.description ?? item["content:encoded"] ?? "";
  const pubDate = item.pubDate ?? item["dc:date"];
  const categoria = item.category;

  if (!titulo || !link) {
    return null;
  }

  // Tenta extrair URL de imagem de vários campos comuns no parsed object
  let imagemUrl: string | undefined = undefined;

  // 1. media:content
  const mediaContent = item["media:content"];
  if (mediaContent) {
    if (Array.isArray(mediaContent)) {
      imagemUrl = mediaContent[0]?.["@_url"];
    } else {
      imagemUrl = mediaContent["@_url"];
    }
  }

  // 2. media:thumbnail
  if (!imagemUrl) {
    const mediaThumbnail = item["media:thumbnail"];
    if (mediaThumbnail) {
      if (Array.isArray(mediaThumbnail)) {
        imagemUrl = mediaThumbnail[0]?.["@_url"];
      } else {
        imagemUrl = mediaThumbnail["@_url"];
      }
    }
  }

  // 3. enclosure
  if (!imagemUrl) {
    const enclosure = item.enclosure;
    if (enclosure) {
      if (Array.isArray(enclosure)) {
        imagemUrl = enclosure[0]?.["@_url"];
      } else {
        imagemUrl = enclosure["@_url"];
      }
    }
  }

  // 4. image inside description using regex if needed (as fallback)
  if (!imagemUrl && typeof desc === "string") {
    const match = desc.match(/<img[^>]+src="([^"]+)"/);
    if (match) {
      imagemUrl = match[1];
    }
  }

  const resumoLimpo = texto(desc ?? '').slice(0, 240);
  const resumo = resumoLimpo.length === 240 ? resumoLimpo.slice(0, resumoLimpo.lastIndexOf(' ')) + '…' : resumoLimpo;

  return {
    id: Buffer.from(texto(link)).toString('base64'),
    titulo: texto(titulo),
    resumo,
    url: texto(link),
    imagem: imagemUrl ? texto(imagemUrl) : undefined,
    categoria: categoria ? (typeof categoria === "string" ? texto(categoria) : texto(categoria["#text"] ?? "")) : undefined,
    publicadoEm: pubDate
      ? new Date(texto(pubDate)).toISOString()
      : new Date().toISOString(),
    fonte,
    fonteLabel: FEEDS[fonte].label,
  };
}

export async function buscarNoticias(fontes: (keyof typeof FEEDS)[] = ['vaticannews'], limite = 12): Promise<Noticia[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: false,
  });

  const resultados = await Promise.allSettled(
    fontes.map(async (fonte) => {
      const res = await fetch(FEEDS[fonte].url, {
        next: { revalidate: 3600 }, // cache ISR: revalida a cada 1h
        headers: { 'User-Agent': 'CentralCatolica/1.0' },
      });
      if (!res.ok) {
        throw new Error(`Feed ${fonte} retornou ${res.status}`);
      }
      const xml = await res.text();

      const obj = parser.parse(xml);
      const channel = obj.rss?.channel;
      if (!channel) return [];

      const rawItems = channel.item;
      const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

      return items
        .map((item) => parsearItem(item, fonte))
        .filter((n): n is Noticia => n !== null)
        .slice(0, limite);
    })
  );

  // Junta resultados de todas as fontes, ordena por data desc, desduplica e limita
  const todas = resultados
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

  // Desduplicação por URL
  const unique = Array.from(new Map(todas.map((n) => [n.url, n])).values());

  return unique.slice(0, limite * fontes.length);
}

export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
