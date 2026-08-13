import { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/shared/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Pesquisar na Bíblia",
  description: "Busque palavras, frases ou referências bíblicas (ex: João 3,16) em toda a Bíblia Sagrada na tradução Ave Maria.",
  path: "/biblia/pesquisa",
  keywords: ["pesquisar bíblia", "buscar versículo", "referência bíblica"],
});

export default function BibliaPesquisaLayout({ children }: { children: ReactNode }) {
  return children;
}
