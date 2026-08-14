/**
 * Configuração central da marca e do domínio, usada por metadata, JSON-LD,
 * manifest, sitemap e robots. Alterar aqui propaga para o site inteiro.
 */
export const siteConfig = {
  name: "Meu Canto Católico",
  shortName: "Meu Canto Católico",
  url: "https://www.meucantocatolico.com.br",
  description:
    "Portal católico com Liturgia Diária, Bíblia, Santos, Orações, Calendário Litúrgico e conteúdos da Igreja Católica.",
  locale: "pt_BR",
  themeColor: "#c9a84c",
  backgroundColor: "#fbf9f4",
  keywords: [
    "Meu Canto Católico",
    "liturgia diária",
    "liturgia diária católica",
    "bíblia católica",
    "bíblia sagrada",
    "santo do dia",
    "santoral católico",
    "orações católicas",
    "calendário litúrgico",
    "catequese católica",
    "igreja católica",
    "santo rosário",
    "terço católico",
    "vida de fé católica",
    "portal católico",
  ],
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
