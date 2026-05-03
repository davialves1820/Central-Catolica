import Link from "next/link";
import { BookOpen, Sun, CalendarDays, ChevronRight, Search } from "lucide-react";
import Header from "@/components/shared/Header";
import { getLiturgiaDiaria } from "@/lib/server/services/liturgia";
import { Suspense } from "react";

/* Dados da liturgia de hoje para o teaser */
async function TodayLiturgyTeaser() {
  const today = new Date();
  const liturgia = await getLiturgiaDiaria(
    String(today.getDate()),
    String(today.getMonth() + 1),
    String(today.getFullYear()),
  ).catch(() => null);

  if (!liturgia) {
    return null;
  }

  const corMap: Record<string, string> = {
    verde: "Verde", roxo: "Roxo", vermelho: "Vermelho",
    branco: "Branco", rosa: "Rosa", preto: "Preto",
    dourado: "Dourado",
  };
  const normalized = liturgia.cor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const corLabel = Object.entries(corMap).find(([k]) => normalized.includes(k))?.[1] ?? liturgia.cor;

  return (
    <Link
      href="/liturgia"
      className="group block border border-border hover:border-primary/40 rounded-xl p-5 transition-all duration-300 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-body font-bold uppercase tracking-widest text-primary mb-1">
            Liturgia de Hoje
          </p>
          <p className="font-heading text-lg font-semibold text-foreground truncate">
            {liturgia.liturgia}
          </p>
          <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-2 italic">
            {liturgia.evangelho?.titulo}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
            {corLabel}
          </span>
          <ChevronRight
            size={16}
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

/* Versículo da página */
const PAGE_VERSE = {
  text: "A verdade vos libertará.",
  ref: "João 8,32",
};

/* Feature cards */
const FEATURES = [
  {
    href: "/biblia",
    icon: BookOpen,
    label: "Bíblia Sagrada",
    description:
      "Leia as Escrituras na tradução Ave Maria. Pesquise versículos, acompanhe seu progresso e mergulhe na Palavra de Deus.",
    cta: "Abrir a Bíblia",
    accent: "gold",   /* ouro */
  },
  {
    href: "/liturgia",
    icon: Sun,
    label: "Liturgia Diária",
    description:
      "Leituras, salmo responsorial, evangelho e orações de cada dia. Acompanhe o ritmo da Igreja ao longo do ano litúrgico.",
    cta: "Ver a Liturgia",
    accent: "cobalt", /* azul cobalto */
  },
  {
    href: "/calendario",
    icon: CalendarDays,
    label: "Calendário Litúrgico",
    description:
      "Solenidades, festas, memórias e tempos do ano litúrgico organizados em um calendário interativo.",
    cta: "Abrir o Calendário",
    accent: "crimson", /* rubrica */
  },
] as const;

type Accent = "gold" | "cobalt" | "crimson";

const ACCENT_STYLES: Record<Accent, { icon: string; badge: string; cta: string; border: string }> = {
  gold: {
    icon: "bg-primary/10 text-primary border border-primary/20",
    badge: "text-primary",
    cta: "bg-primary text-primary-foreground hover:bg-gold-light",
    border: "hover:border-primary/40",
  },
  cobalt: {
    icon: "bg-cobalt/10 text-cobalt-light border border-cobalt/20",
    badge: "text-cobalt-light",
    cta: "bg-cobalt text-accent-foreground hover:bg-cobalt-light",
    border: "hover:border-cobalt/40",
  },
  crimson: {
    icon: "bg-crimson/10 text-crimson-light border border-crimson/20",
    badge: "text-crimson-light",
    cta: "bg-crimson text-foreground hover:bg-crimson-light",
    border: "hover:border-crimson/30",
  },
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-border"
          aria-labelledby="hero-heading"
        >
          {/* Fundo: padrão de cruz em grade fina */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg,   transparent, transparent 47px, hsl(var(--gold)) 47px, hsl(var(--gold)) 48px),
                repeating-linear-gradient(90deg,  transparent, transparent 47px, hsl(var(--gold)) 47px, hsl(var(--gold)) 48px)
              `,
            }}
          />
          {/* Vinheta central */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--gold)/0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative container mx-auto px-4 py-24 md:py-36 text-center max-w-3xl">

            <h1
              id="hero-heading"
              className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-[1.05] mb-6"
            >

              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--gold))" }}
              >
                Central Católica
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, hsl(var(--gold)/0.6), transparent)",
                  }}
                />
              </span>
            </h1>

            <p className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
              Ensinamentos e Tradição Católica Apostólica Romana ao alcance de cada dia.
            </p>

            {/* Versículo */}
            <div className="mt-8 mb-10 inline-block">
              <p
                className="font-reading text-xl md:text-2xl italic text-foreground/80"
                style={{ fontStyle: "italic" }}
              >
                &ldquo;{PAGE_VERSE.text}&rdquo;
              </p>
              <p className="font-body text-xs uppercase tracking-widest text-primary mt-2">
                {PAGE_VERSE.ref}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/biblia/search"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-bold text-sm bg-primary text-primary-foreground hover:bg-gold-light transition-all shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Pesquisar na Bíblia Sagrada"
              >
                <Search size={16} aria-hidden="true" />
                Pesquisar na Bíblia
              </Link>
              <Link
                href="/liturgia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-bold text-sm border border-border text-foreground hover:border-primary/50 hover:bg-secondary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Ver liturgia de hoje"
              >
                <Sun size={16} aria-hidden="true" />
                Liturgia de hoje
              </Link>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section
          className="container mx-auto px-4 py-20 max-w-5xl"
          aria-labelledby="features-heading"
        >
          <div className="text-center mb-14">
            <h2
              id="features-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              Recursos Espirituais
            </h2>
            <div
              className="mx-auto w-16 h-px"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(var(--gold)/0.6), transparent)",
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const s = ACCENT_STYLES[f.accent];
              return (
                <article
                  key={f.href}
                  className={`group relative bg-card border border-border ${s.border} rounded-xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${s.icon}`}
                    aria-hidden="true"
                  >
                    <f.icon size={22} />
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <h3 className={`font-heading text-xl font-semibold ${s.badge}`}>
                      {f.label}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  <Link
                    href={f.href}
                    className={`inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-lg text-sm font-body font-bold transition-all ${s.cta} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card`}
                    aria-label={f.cta}
                  >
                    {f.cta}
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Divisor ornamental */}
        <div className="container mx-auto px-4 max-w-5xl" aria-hidden="true">
          <div className="gold-divider" />
        </div>

        {/* Liturgia de Hoje teaser */}
        <section
          className="container mx-auto px-4 py-16 max-w-3xl"
          aria-labelledby="liturgy-teaser-heading"
        >
          <div className="text-center mb-8">
            <h2
              id="liturgy-teaser-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2"
            >
              Liturgia de Hoje
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <Suspense
            fallback={
              <div className="border border-border rounded-xl p-5 animate-pulse space-y-3">
                <div className="h-4 bg-secondary rounded w-32" />
                <div className="h-5 bg-secondary rounded w-64" />
                <div className="h-4 bg-secondary rounded w-48" />
              </div>
            }
          >
            <TodayLiturgyTeaser />
          </Suspense>

          <div className="mt-4 text-center">
            <Link
              href="/calendario"
              className="inline-flex items-center gap-2 text-sm font-body font-bold text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <CalendarDays size={14} aria-hidden="true" />
              Ver calendário litúrgico completo
            </Link>
          </div>
        </section>

        {/* Frase de São Thomas de Aquino */}
        <section
          className="border-t border-border bg-secondary/40"
          aria-label="Citação de São Tomás de Aquino"
        >
          <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
            <p
              className="font-reading text-2xl md:text-3xl italic text-foreground/75 leading-relaxed mb-4"
              style={{ fontStyle: "italic" }}
            >
              &ldquo;A fé é um hábito da mente, pelo qual começa em nós a vida eterna,
              fazendo o intelecto assentir ao que não aparece.&rdquo;
            </p>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
              São Tomás de Aquino, Suma Teológica II-II, q. 4, a. 1
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
