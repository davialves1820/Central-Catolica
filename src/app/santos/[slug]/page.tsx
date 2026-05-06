import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSantoBySlug, getSantos } from "@/lib/server/services/santos";
import Header from "@/components/shared/Header";
import { Metadata } from "next";
import { ChevronLeft, Calendar, Crown, Star, Cross } from "lucide-react";
import SantoExternalLink from "@/components/santos/SantoExternalLink";

import { SantoSlugPageProps } from "@/types/santos";

export async function generateStaticParams() {
  const { santos } = await getSantos({ tipo: "Todos", busca: "", pagina: 1, porPagina: 9999 });
  return santos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SantoSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const santo = await getSantoBySlug(slug);
  if (!santo) {
    return { title: "Santo não encontrado" };
  }
  return {
    title: `${santo.nome} | Santos Católicos`,
    description: santo.resumo?.slice(0, 160),
  };
}

const TIPO_COLOR: Record<string, { color: string; border: string; bg: string; glow: string }> = {
  "Santo Mártir": {
    color: "hsl(var(--crimson-light))",
    border: "hsl(var(--crimson)/0.35)",
    bg: "hsl(var(--crimson)/0.07)",
    glow: "hsl(var(--crimson)/0.15)",
  },
};
const DEFAULT_COLOR = {
  color: "hsl(var(--gold))",
  border: "hsl(var(--gold)/0.35)",
  bg: "hsl(var(--gold)/0.07)",
  glow: "hsl(var(--gold)/0.15)",
};

const CAMPO_ICON: Record<string, React.ReactNode> = {
  "Data de Festa": <Calendar size={12} aria-hidden="true" />,
  "Padroeiro de": <Star size={12} aria-hidden="true" />,
  "Canonizado por": <Crown size={12} aria-hidden="true" />,
};

export default async function SantoPage({ params }: SantoSlugPageProps) {
  const { slug } = await params;
  const santo = await getSantoBySlug(slug);
  if (!santo) {
    notFound();
  }

  const styleColor = TIPO_COLOR[santo.tipo] ?? DEFAULT_COLOR;

  const campos = [
    { label: "Data de Festa", valor: santo.data_festa },
    { label: "Nascimento", valor: santo.nascimento },
    { label: "Morte", valor: santo.morte },
    { label: "Padroeiro de", valor: santo.padroeiro_de },
    { label: "Canonizado por", valor: santo.canonizado_por },
  ].filter((c) => c.valor);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Hero banner */}
        <div
          className="relative overflow-hidden border-b border-border"
          style={{ background: "hsl(var(--secondary))" }}
        >
          {/* Subtle glow from saint type color */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 80% at 80% 50%, ${styleColor.glow} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px),
                repeating-linear-gradient(90deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px)
              `,
            }}
          />

          <div className="relative container mx-auto max-w-5xl px-4 py-10 md:py-14">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">

              {/* Name block */}
              <div className="flex-1 min-w-0">
                {/* Type badge */}
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold font-body uppercase tracking-wider border mb-4"
                  style={{ color: styleColor.color, borderColor: styleColor.border, background: styleColor.bg }}
                >
                  {santo.tipo}
                </span>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-3">
                  {santo.nome}
                </h1>

                {/* Decorative divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-12" style={{ background: `linear-gradient(to right, ${styleColor.color}, transparent)` }} aria-hidden="true" />
                  {santo.data_festa && (
                    <p className="text-sm font-body flex items-center gap-1.5" style={{ color: styleColor.color }}>
                      <Calendar size={13} aria-hidden="true" />
                      {santo.data_festa}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[300px_1fr]">

            {/* Left: ficha + links */}
            <aside className="space-y-5">

              {/* Full image (desktop) */}
              {santo.imagem_url && (
                <div
                  className="hidden lg:block relative overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(var(--secondary))",
                    boxShadow: "0 8px 32px hsl(var(--ink)/0.12)",
                  }}
                >
                  <Image
                    src={santo.imagem_url}
                    alt={santo.nome}
                    width={400}
                    height={500}
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Ficha */}
              {campos.length > 0 && (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(var(--card))",
                    boxShadow: "0 2px 12px hsl(var(--ink)/0.06)",
                  }}
                >
                  <div
                    className="px-4 py-3 border-b"
                    style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--secondary))" }}
                  >
                    <p className="text-xs font-bold font-body uppercase tracking-widest text-muted-foreground">
                      Ficha do Santo
                    </p>
                  </div>
                  <div className="divide-y" style={{ borderColor: "hsl(var(--border)/0.5)" }}>
                    {campos.map((c) => (
                      <div key={c.label} className="px-4 py-3.5 flex gap-3">
                        <div
                          className="mt-0.5 shrink-0 flex items-center justify-center h-5 w-5 rounded"
                          style={{ color: styleColor.color, background: styleColor.bg }}
                        >
                          {CAMPO_ICON[c.label] ?? <Cross size={10} aria-hidden="true" />}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold font-body uppercase tracking-widest text-muted-foreground mb-0.5">
                            {c.label}
                          </p>
                          <p className="text-sm font-body text-foreground/80 leading-relaxed">{c.valor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* External link */}
              <SantoExternalLink href={santo.url} color={styleColor.color} border={styleColor.border} />
            </aside>

            {/* Right: content */}
            <div>
              {/* Summary */}
              {santo.resumo && (
                <div
                  className="rounded-2xl border p-6 md:p-8 mb-8"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(var(--card))",
                    boxShadow: "0 2px 12px hsl(var(--ink)/0.06)",
                  }}
                >
                  {/* Decorative quote mark */}
                  <p
                    className="font-heading text-5xl leading-none mb-4 select-none"
                    style={{ color: styleColor.color, opacity: 0.3 }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-base leading-8 text-foreground/75"
                    style={{ fontFamily: "var(--font-reading)", fontSize: "1.05rem" }}
                  >
                    {santo.resumo}
                  </p>
                </div>
              )}

              {/* Back link */}
              <Link
                href="/santos"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-body font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
                style={{
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--muted-foreground))",
                  background: "hsl(var(--card))",
                }}
              >
                <ChevronLeft size={15} aria-hidden="true" />
                Voltar aos Santos
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
