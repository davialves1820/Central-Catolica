import type { Oracao, TipoConta } from "@/types/rosario";
import oracoesData from "@/data/oracoes.json";

/**
 * Orações do terço que já existem em src/data/oracoes.json, indexadas por slug.
 * Reaproveitamos o conteúdo existente em vez de duplicar texto.
 */
const ORACOES_COMUNS: Record<string, Oracao> = Object.fromEntries(
  (oracoesData.oracoes as { titulo: string; slug: string; texto: string }[])
    .filter((o) => o.texto)
    .map((o) => [o.slug, { titulo: o.titulo, slug: o.slug, texto: o.texto }])
);

/**
 * Orações do terço que não constam em oracoes.json (Credo e a oração de Fátima
 * "Ó meu Jesus", que na fonte original aparece junto de outra oração distinta).
 */
const ORACOES_EXTRA: Record<string, Oracao> = {
  creio: {
    titulo: "Creio (Credo dos Apóstolos)",
    slug: "creio",
    texto:
      "Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.",
  },
  "o-meu-jesus": {
    titulo: "Ó Meu Jesus (Oração de Fátima)",
    slug: "o-meu-jesus",
    texto:
      "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o céu, principalmente as que mais precisarem.",
  },
};

const SLUGS_ORACOES: Record<TipoConta, string> = {
  cruz: "sinal-da-cruz",
  creio: "creio",
  "pai-nosso": "pai-nosso",
  "ave-maria": "ave-maria",
  gloria: "gloria-ao-pai",
  "o-meu-jesus": "o-meu-jesus",
  "salve-rainha": "salve-rainha",
};

export function obterOracao(tipo: TipoConta): Oracao {
  const slug = SLUGS_ORACOES[tipo];
  const oracao = ORACOES_COMUNS[slug] ?? ORACOES_EXTRA[slug];
  if (!oracao) {
    throw new Error(`Oração não encontrada para o tipo de conta "${tipo}" (slug "${slug}")`);
  }
  return oracao;
}

const HOJE_POR_INDICE = [
  "gloriosos", // domingo
  "gozosos", // segunda
  "dolorosos", // terça
  "gloriosos", // quarta
  "luminosos", // quinta
  "dolorosos", // sexta
  "gozosos", // sábado
] as const;

/** Mistério tradicionalmente rezado no dia da semana atual. */
export function misterioDeHoje(data: Date = new Date()): (typeof HOJE_POR_INDICE)[number] {
  return HOJE_POR_INDICE[data.getDay()];
}
