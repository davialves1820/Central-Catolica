import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { RECURSOS } from "@/config/recursos";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { pageMetadata } from "@/lib/shared/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Recursos",
  description:
    "Ferramentas devocionais e páginas de referência do Meu Canto Católico: Rosário interativo, preparação para a Confissão, Catequese, Calendário litúrgico e Santoral.",
  path: "/recursos",
  keywords: ["recursos católicos", "ferramentas devocionais", "rosário interativo"],
});

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <Breadcrumb items={[{ label: "Recursos" }]} className="mb-6 justify-center" />
          <p className="font-label-sm mb-2 text-secondary">Meu Canto Católico</p>
          <h1 className="font-headline-xl text-primary mb-6">Recursos</h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Ferramentas devocionais e páginas de referência para acompanhar a sua vida de fé no dia a dia.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECURSOS.map(({ href, icone: Icone, titulo, descricao }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-2xl border border-primary/30 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <Icone size={28} className="text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
              <h2 className="font-heading text-xl font-semibold text-primary">{titulo}</h2>
              <p className="font-body-sm leading-relaxed text-on-surface-variant flex-1">{descricao}</p>
              <span className="inline-flex items-center gap-1.5 font-label-sm text-secondary">
                Acessar
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
