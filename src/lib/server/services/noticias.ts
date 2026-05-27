import { Noticia } from "@/types/noticias";
import { FEEDS, FonteNoticia } from "@/config/feeds";
import { XMLParser } from "fast-xml-parser";

// Tipo interno que representa um item bruto do RSS antes de ser validado
interface RssItem {
  title?: unknown;
  link?: unknown;
  description?: unknown;
  "content:encoded"?: unknown;
  pubDate?: unknown;
  "dc:date"?: unknown;
  category?: unknown;
  "media:content"?: RssMediaAttr | RssMediaAttr[];
  "media:thumbnail"?: RssMediaAttr | RssMediaAttr[];
  enclosure?: RssMediaAttr | RssMediaAttr[];
}

interface RssMediaAttr {
  "@_url"?: string;
}

function texto(valor: unknown): string {
  if (valor === undefined || valor === null) {
    return "";
  }
  let str = "";
  if (typeof valor === "object") {
    const valObj = valor as Record<string, unknown>;
    str =
      typeof valObj["#text"] === "string"
        ? valObj["#text"]
        : JSON.stringify(valor);
  } else {
    str = String(valor);
  }
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extrairUrlMidia(
  campo: RssMediaAttr | RssMediaAttr[] | undefined
): string | undefined {
  if (!campo) {
    return undefined;
  }
  return Array.isArray(campo) ? campo[0]?.["@_url"] : campo["@_url"];
}

function parsearItem(item: RssItem, fonte: FonteNoticia): Noticia | null {
  const titulo = item.title;
  const link = item.link;
  const desc = item.description ?? item["content:encoded"] ?? "";
  const pubDate = item.pubDate ?? item["dc:date"];
  const categoria = item.category;

  if (!titulo || !link) {
    return null;
  }

  const imagemUrl =
    extrairUrlMidia(item["media:content"]) ??
    extrairUrlMidia(item["media:thumbnail"]) ??
    extrairUrlMidia(item.enclosure) ??
    // fallback: extrai <img src="..."> da descrição
    (typeof desc === "string" ? desc.match(/<img[^>]+src="([^"]+)"/)?.[1] : undefined);

  const resumoLimpo = texto(desc ?? "").slice(0, 240);
  const resumo = resumoLimpo.length === 240 ? resumoLimpo.slice(0, resumoLimpo.lastIndexOf(" ")) + "…" : resumoLimpo;

  return {
    id: Buffer.from(texto(link)).toString("base64"),
    titulo: texto(titulo),
    resumo,
    url: texto(link),
    imagem: imagemUrl ? texto(imagemUrl) : undefined,
    categoria: categoria
      ? typeof categoria === "string"
        ? texto(categoria)
        : texto((categoria as Record<string, unknown>)["#text"] ?? "")
      : undefined,
    publicadoEm: pubDate
      ? new Date(texto(pubDate)).toISOString()
      : new Date().toISOString(),
    fonte,
    fonteLabel: FEEDS[fonte].label,
  };
}

export async function buscarNoticias(fontes: FonteNoticia[] = ["vaticannews"], limite = 12): Promise<Noticia[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: false,
  });

  const resultados = await Promise.allSettled(
    fontes.map(async (fonte) => {
      const res = await fetch(FEEDS[fonte].url, {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "CentralCatolica/1.0" },
      });

      if (!res.ok) {
        throw new Error(`Feed ${fonte} retornou ${res.status}`);
      }

      const xml = await res.text();

      // XML parse isolado em try/catch para não derrubar as outras fontes
      let obj: ReturnType<XMLParser["parse"]>;
      try {
        obj = parser.parse(xml);
      } catch (parseErr) {
        throw new Error(`Feed ${fonte}: XML inválido — ${parseErr}`);
      }

      const channel = obj.rss?.channel;
      if (!channel) {
        return [];
      }

      const rawItems = channel.item;
      const items: RssItem[] = Array.isArray(rawItems)
        ? rawItems
        : rawItems
          ? [rawItems]
          : [];

      return items
        .map((item) => parsearItem(item, fonte))
        .filter((n): n is Noticia => n !== null)
        .slice(0, limite);
    })
  );

  const todas = resultados
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

  const unique = Array.from(new Map(todas.map((n) => [n.url, n])).values());

  return unique.slice(0, limite * fontes.length);
}

export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}