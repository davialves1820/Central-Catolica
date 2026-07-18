import { Metadata } from "next";
import { ConfissaoApp } from "@/components/confissao/ConfissaoApp";

export const metadata: Metadata = {
  title: "Preparação para a Confissão — Exame de Consciência",
  description:
    "Prepare-se para o Sacramento da Confissão com um exame de consciência interativo pelos Dez Mandamentos, o passo a passo do rito, o Ato de Contrição e orientação para quem está há muito tempo sem se confessar. Nada é salvo nem enviado: tudo fica só no seu aparelho.",
};

export default function PaginaConfissao() {
  return <ConfissaoApp />;
}
