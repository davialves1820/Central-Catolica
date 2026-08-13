import { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/shared/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Livro de Orações",
  description:
    "Livro de Orações Católicas completo: orações comuns, jaculatórias, orações de comunhão e diversas súplicas da tradição da Igreja.",
  path: "/oracoes",
  keywords: ["livro de orações", "orações católicas", "orações comuns", "jaculatórias"],
});

export default function OracoesLayout({ children }: { children: ReactNode }) {
  return children;
}
