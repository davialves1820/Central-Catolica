import { Suspense } from "react";
import Link from "next/link";
import { getSantos, getTipos } from "@/lib/server/services/santos";
import SantosGrid from "@/components/santos/SantosGrid";
import SantosFiltros from "@/components/santos/SantosFiltros";
import SantosSearch from "@/components/santos/SantosSearch";
import SantosAlfabeto from "@/components/santos/SantosAlfabeto";
import Header from "@/components/shared/Header";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Santos Católicos",
  description:
    "Conheça os santos canonizados pela Igreja Católica: biografias, datas de festa, padroeiros e muito mais.",
};

import { SantosPageProps, PaginacaoProps } from "@/types/santos";

/* Grid skeleton */
function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-2xl animate-pulse"
          style={{ background: "hsl(var(--secondary))" }}
        />
      ))}
    </div>
  );
}

/* Pagination */
function Paginacao({ pagina, totalPaginas, tipo, busca, inicial }: PaginacaoProps) {
  const href = (p: number) => {
    const q = new URLSearchParams();
    if (tipo && tipo !== "Todos") {
      q.set("tipo", tipo);
    }
    if (busca) {
      q.set("busca", busca);
    }
    if (inicial) {
      q.set("inicial", inicial);
    }
    q.set("pagina", String(p));
    return `/santos?${q.toString()}`;
  };

  const start = Math.max(1, Math.min(pagina - 3, totalPaginas - 6));
  const pages = Array.from({ length: Math.min(7, totalPaginas) }, (_, i) => start + i);

  return (
    <nav className="flex items-center justify-center gap-2 pb-20 pt-6" aria-label="Paginação">
      {pagina > 1 && (
        <Link
          href={href(pagina - 1)}
          aria-label="Página anterior"
          className="flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-body font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
          style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))" }}
        >
          <ChevronLeft size={15} aria-hidden="true" /> Anterior
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-label={`Página ${p}`}
          aria-current={p === pagina ? "page" : undefined}
          className="h-10 w-10 rounded-xl border text-sm font-body font-semibold flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
          style={p === pagina
            ? { borderColor: "hsl(var(--gold)/0.5)", background: "hsl(var(--gold)/0.12)", color: "hsl(var(--gold))" }
            : { borderColor: "hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}
        >
          {p}
        </Link>
      ))}

      {pagina < totalPaginas && (
        <Link
          href={href(pagina + 1)}
          aria-label="Próxima página"
          className="flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-body font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
          style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))" }}
        >
          Próximo <ChevronRight size={15} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}

export default async function SantosPage({ searchParams }: SantosPageProps) {
  const params = await searchParams;
  const tipo = params.tipo ?? "Todos";
  const busca = params.busca ?? "";
  const pagina = Number(params.pagina ?? 1);
  const inicial = params.inicial ?? "";

  const { santos, total, totalPaginas } = await getSantos({ tipo, busca, pagina, inicial });
  const tipos = await getTipos();

  const temFiltroAtivo = tipo !== "Todos" || busca || inicial;

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
            className="absolute inset-0 opacity-[0.03]"
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
            style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, hsl(var(--gold)/0.09) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative container mx-auto px-4 py-16 md:py-20 text-center max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5" aria-hidden="true">
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
              <Star
                size={12}
                fill="hsl(var(--gold))"
                style={{ color: "hsl(var(--gold))" }}
              />
              <span className="text-xs font-body font-bold uppercase tracking-[0.25em]" style={{ color: "hsl(var(--gold))" }}>
                Communio Sanctorum
              </span>
              <Star
                size={12}
                fill="hsl(var(--gold))"
                style={{ color: "hsl(var(--gold))" }}
              />
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              Santos Católicos
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Conheça os santos canonizados pela Igreja, suas vidas, datas de
              festa, padroeiros e o testemunho que ilumina nossa caminhada.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-lg mb-6">
              <SantosSearch valorInicial={busca} />
            </div>

            {/* Type filters */}
            <SantosFiltros tipos={tipos} tipoAtivo={tipo} busca={busca} inicial={inicial} />
          </div>
        </section>

        {/* Filtro Alfabético */}
        <div className="border-b border-border" style={{ background: "hsl(var(--card))" }}>
          <div className="container mx-auto max-w-7xl px-4">
            <SantosAlfabeto inicialAtiva={inicial} tipo={tipo} busca={busca} />
          </div>
        </div>

        {/* Count + active filters bar */}
        <div className="container mx-auto max-w-7xl px-4 pt-7 pb-2 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm font-body text-muted-foreground">
            {total === 0
              ? "Nenhum santo encontrado"
              : `${total} santo${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`}
            {busca && (
              <span style={{ color: "hsl(var(--gold))" }}> para &ldquo;{busca}&rdquo;</span>
            )}
            {inicial && (
              <span style={{ color: "hsl(var(--gold))" }}> com inicial &ldquo;{inicial}&rdquo;</span>
            )}
          </p>

          {temFiltroAtivo && (
            <Link
              href="/santos"
              className="text-xs font-body font-semibold px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
              style={{ color: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--border))", background: "hsl(var(--secondary))" }}
            >
              Limpar filtros
            </Link>
          )}
        </div>

        {/* Grid */}
        <section className="container mx-auto max-w-7xl px-4 py-6" aria-label="Lista de santos">
          <Suspense fallback={<GridSkeleton />}>
            <SantosGrid santos={santos} />
          </Suspense>
        </section>

        {/* Pagination */}
        {totalPaginas > 1 && (
          <Paginacao pagina={pagina} totalPaginas={totalPaginas} tipo={tipo} busca={busca} inicial={inicial} />
        )}
      </main>
    </div>
  );
}
