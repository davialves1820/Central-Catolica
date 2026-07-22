import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCalendarioSantos } from "@/lib/server/services/calendarioSantos";
import CalendarioSantosView from "@/components/santos/calendario/CalendarioSantosView";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Calendário dos Santos | Santoral",
  description:
    "Descubra qual santo a Igreja celebra em cada dia do ano. Navegue pelos meses ou pesquise uma data diretamente.",
};

export default async function CalendarioSantosPage() {
  const calendario = await getCalendarioSantos();

  const hoje = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  return (
    <div className="max-w-4xl mx-auto px-margin-mobile md:px-6 py-12 md:py-24">
      <Link
        href="/santos"
        className="inline-flex items-center gap-2 font-label-sm text-on-surface-variant hover:text-primary transition-colors mb-8 group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para o Santoral
      </Link>

      <section className="text-center mb-16">
        <span className="text-[12px] font-semibold text-primary uppercase tracking-[0.3em] mb-2 block">
          Sanctorale
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
          Calendário dos Santos
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body-md">
          Clique em um dia ou pesquise uma data para descobrir qual santo a Igreja celebra.
        </p>
      </section>

      <CalendarioSantosView
        calendario={calendario}
        mesInicial={hoje.getMonth() + 1}
        diaInicial={hoje.getDate()}
      />
    </div>
  );
}
