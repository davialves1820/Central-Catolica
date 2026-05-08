import Link from "next/link";
import { BookOpen, Sun, CalendarDays, ChevronRight, Search, Newspaper, Heart, Leaf } from "lucide-react";
import Header from "@/components/shared/Header";
import { Suspense } from "react";
import NewsPreview from "@/components/noticias/NewsPreview";
import "./globals.css";

const PAGE_VERSE = {
  text: "A verdade vos libertará.",
  ref: "João 8,32",
};

const FEATURES = [
  {
    href: "/biblia",
    icon: BookOpen,
    label: "Bíblia Sagrada",
    description:
      "Leia as Escrituras na tradução Ave Maria. Pesquise versículos, acompanhe seu progresso e mergulhe na Palavra de Deus.",
    cta: "Abrir a Bíblia",
    accent: "gold",
  },
  {
    href: "/liturgia",
    icon: Sun,
    label: "Liturgia Diária",
    description:
      "Leituras, salmo responsorial, evangelho e orações de cada dia. Acompanhe o ritmo da Igreja ao longo do ano litúrgico.",
    cta: "Ver a Liturgia",
    accent: "cobalt",
  },
  {
    href: "/calendario",
    icon: CalendarDays,
    label: "Calendário Litúrgico",
    description:
      "Solenidades, festas, memórias e tempos do ano litúrgico organizados em um calendário interativo.",
    cta: "Abrir o Calendário",
    accent: "emerald",
  },
  {
    href: "/oracoes",
    icon: Heart,
    label: "Orações",
    description:
      "Orações tradicionais da Igreja: Pai-Nosso, Ave-Maria, Credo e muitas outras para sua vida espiritual diária.",
    cta: "Ver Orações",
    accent: "violet",
  },
  {
    href: "/noticias",
    icon: Newspaper,
    label: "Notícias do Vaticano",
    description:
      "Acompanhe as últimas notícias retiradas diretamente do VaticanoNews.",
    cta: "Ver Notícias",
    accent: "crimson",
  },
  {
    href: "/santos",
    icon: Leaf,
    label: "Santos",
    description:
      "Conheça os santos e mártires da Igreja Católica.",
    cta: "Ver Santos",
    accent: "saint",
  },
] as const;

type Accent = "gold" | "cobalt" | "crimson" | "violet" | "emerald" | "saint";

const ACCENT_STYLES: Record<Accent, { icon: string; badge: string; cta: string; border: string }> = {
  gold: { icon: "bg-primary/10 text-primary border border-primary/20", badge: "text-primary", cta: "bg-primary text-white hover:bg-gold-light", border: "hover:border-primary/40" },
  cobalt: { icon: "bg-cobalt/10 text-cobalt-light border border-cobalt/20", badge: "text-cobalt-light", cta: "bg-cobalt text-accent-foreground hover:bg-cobalt-light", border: "hover:border-cobalt/40" },
  crimson: { icon: "bg-crimson/10 text-crimson-light border border-crimson/20", badge: "text-crimson-light", cta: "bg-crimson text-foreground hover:bg-crimson-light", border: "hover:border-crimson/30" },
  violet: { icon: "bg-violet/10 text-violet-light border border-violet/20", badge: "text-violet-light", cta: "bg-violet text-accent-foreground hover:bg-violet-light", border: "hover:border-violet/40" },
  emerald: { icon: "bg-emerald/10 text-emerald-light border border-emerald/20", badge: "text-emerald-light", cta: "bg-emerald text-accent-foreground hover:bg-emerald-light", border: "hover:border-emerald/40" },
  saint: { icon: "bg-saint/15 text-saint-light border border-saint/30", badge: "text-saint-light", cta: "bg-saint text-white hover:bg-saint-light", border: "hover:border-saint/40" },
};

/** Skeleton shown while NewsPreview streams in from the server */
function NewsPreviewSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[300px] rounded-xl border border-border p-5 space-y-3 animate-pulse"
          style={{ background: "hsl(var(--card))" }}
        >
          <div className="h-3 rounded w-20" style={{ background: "hsl(var(--secondary))" }} />
          <div className="h-5 rounded w-full" style={{ background: "hsl(var(--secondary))" }} />
          <div className="h-4 rounded w-4/5" style={{ background: "hsl(var(--secondary))" }} />
          <div className="h-4 rounded w-3/5" style={{ background: "hsl(var(--secondary))" }} />
        </div>
      ))}
    </div>
  );
}

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

            <div className="mt-8 mb-10 inline-block">
              <p
                className="font-reading text-xl md:text-2xl italic text-foreground/80"
              >
                &ldquo;{PAGE_VERSE.text}&rdquo;
              </p>
              <p className="font-body text-xs uppercase tracking-widest text-primary mt-2">
                {PAGE_VERSE.ref}
              </p>
            </div>

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
            <div className="mt-4 text-center">
              <Link
                href="/calendario"
                className="inline-flex items-center gap-2 text-sm font-body font-bold text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <CalendarDays size={14} aria-hidden="true" />
                Ver calendário litúrgico completo
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

        {/* Notícias Católicas */}
        <section
          className="container mx-auto px-4 py-16 max-w-5xl"
          aria-labelledby="news-heading"
        >
          <div className="text-center mb-10">
            <h2
              id="news-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2"
            >
              Vaticano News
            </h2>
          </div>

          <Suspense fallback={<NewsPreviewSkeleton />}>
            <NewsPreview />
          </Suspense>
        </section>

        {/* Citação */}
        <section
          className="border-t border-border bg-secondary/40"
          aria-label="Citação de São Tomás de Aquino"
        >
          <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
            <p
              className="font-reading text-2xl md:text-3xl italic text-foreground/75 leading-relaxed mb-4"
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