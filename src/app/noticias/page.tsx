import { Suspense } from "react";
import { buscarNoticias } from "@/lib/noticias";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import NoticiaDestaque from "@/components/noticias/NoticiaDestaque";
import Header from "@/components/shared/Header";
import { NoticiasSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import { Newspaper } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Notícias do Vaticano",
  description:
    "As últimas notícias do Papa e da Igreja Católica direto do Vatican News.",
};

/* Content (async) */
async function NoticiasContent() {
  const noticias = await buscarNoticias(["vaticannews"], 20);
  const [destaque, ...resto] = noticias;

  if (noticias.length === 0) {
    return (
      <div className="text-center py-24 space-y-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
          style={{ background: "hsl(var(--secondary))" }}
        >
          <Newspaper size={28} className="text-muted-foreground/30" aria-hidden="true" />
        </div>
        <p className="font-heading text-xl text-foreground/40">
          Não foi possível carregar as notícias
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Verifique sua conexão ou tente novamente em instantes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Destaque */}
      {destaque && <NoticiaDestaque noticia={destaque} />}

      {/* Grid */}
      <section aria-labelledby="ultimas-heading">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="h-px w-8"
            style={{ background: "hsl(var(--gold)/0.4)" }}
            aria-hidden="true"
          />
          <h2
            id="ultimas-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Últimas notícias
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resto.map((n) => (
            <NoticiaCard key={n.id} noticia={n} />
          ))}
        </div>
      </section>

      {/* Sources footer */}
      <div
        className="pt-8 border-t border-border text-center space-y-1"
      >
        {/* Ornamental divider */}
        <div
          className="mx-auto mb-5 h-px w-24"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold)/0.4), transparent)" }}
          aria-hidden="true"
        />
        <p className="text-xs text-muted-foreground font-body">
          Conteúdo via RSS do{" "}
          <a
            href="https://www.vaticannews.va/pt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            style={{ color: "hsl(var(--gold))" }}
          >
            Vatican News
          </a>
        </p>
      </div>
    </div>
  );
}

/* Page */
export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative border-b border-border overflow-hidden"
          style={{ background: "hsl(var(--secondary))" }}
        >
          {/* Manuscript grid */}
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
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 0%, hsl(var(--gold)/0.07) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative container mx-auto px-4 py-16 md:py-20 text-center max-w-2xl">
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-5" aria-hidden="true">
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
              <span
                className="text-xs font-body font-bold uppercase tracking-[0.25em]"
                style={{ color: "hsl(var(--gold))" }}
              >
                Ex Urbe Roma
              </span>
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              Notícias do Vaticano
            </h1>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Mensagens do Papa, acontecimentos da Igreja e notícias da Santa Sé.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Suspense fallback={<NoticiasSkeleton />}>
            <NoticiasContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
