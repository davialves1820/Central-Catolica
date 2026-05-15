import { Suspense } from "react";
import { buscarNoticias } from "@/lib/server/services/noticias";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import NoticiaDestaque from "@/components/noticias/NoticiaDestaque";
import { NoticiasSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import { Newspaper, Sparkles } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Notícias do Vaticano | Central Católica",
  description:
    "As últimas notícias do Papa e da Igreja Católica direto do Vatican News.",
};

/* Content (async) */
async function NoticiasContent() {
  const noticias = await buscarNoticias(["vaticannews"], 20);
  const [destaque, ...resto] = noticias;

  if (noticias.length === 0) {
    return (
      <div className="text-center py-24 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-surface-container-low flex items-center justify-center mx-auto border border-secondary/10">
          <Newspaper size={28} className="text-secondary/40" />
        </div>
        <div className="space-y-2">
            <p className="font-headline-md text-primary">
                Não foi possível carregar as notícias
            </p>
            <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
                Verifique sua conexão ou tente novamente em instantes.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Destaque */}
      {destaque && <NoticiaDestaque noticia={destaque} />}

      {/* Grid */}
      <section aria-labelledby="ultimas-heading">
        <div className="flex items-center gap-6 mb-12">
          <h2
            id="ultimas-heading"
            className="font-headline-lg text-primary whitespace-nowrap"
          >
            Últimas notícias
          </h2>
          <div className="h-[1px] flex-1 bg-secondary/10" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resto.map((n) => (
            <NoticiaCard key={n.id} noticia={n} />
          ))}
        </div>
      </section>

      {/* Sources footer */}
      <div className="pt-16 border-t border-secondary/5 text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-secondary/20"></div>
            <Sparkles className="text-secondary/30" size={20} />
            <div className="h-[1px] w-12 bg-secondary/20"></div>
        </div>
        <p className="font-label-sm text-outline">
          Conteúdo via RSS do{" "}
          <a
            href="https://www.vaticannews.va/pt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-secondary/30"
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
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-24">
          {/* Subtle grid and radial glow */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 0%, var(--color-secondary) 0.08, transparent 70%)",
            }}
          />

          <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            {/* Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-secondary/30" />
              <span className="font-label-sm text-secondary uppercase tracking-[0.3em]">
                Ex Urbe Roma
              </span>
              <div className="h-[1px] w-10 bg-secondary/30" />
            </div>

            <h1 className="font-headline-xl text-primary mb-6">
              Notícias do Vaticano
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Mensagens do Papa, acontecimentos da Igreja e notícias da Santa Sé para alimentar sua fé e conhecimento.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
          <Suspense fallback={<NoticiasSkeleton />}>
            <NoticiasContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
