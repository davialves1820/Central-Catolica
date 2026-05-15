import { Suspense } from "react";
import Link from "next/link";
import { getSantos } from "@/lib/server/services/santos";
import GradeSantos from "@/components/santos/SantosGrid";
import FiltrosSantos from "@/components/santos/SantosFiltros";
import BuscaSantos from "@/components/santos/BuscaSantos";
import AlfabetoSantos from "@/components/santos/SantosAlfabeto";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Santoral e Hagiografia",
  description:
    "Explore a vida daqueles que nos precederam na fé através dos séculos, biografias, datas de festa e padroeiros.",
};

import { PropsPaginaSantos, PropsPaginacao } from "@/types/santos";

/* Grid skeleton */
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] bg-surface-container-high animate-pulse border border-outline-variant/30"
        />
      ))}
    </div>
  );
}

/* Pagination */
function NavegacaoPaginacao({ pagina, totalPaginas, tipo, busca, inicial }: PropsPaginacao) {
  const href = (p: number) => {
    const q = new URLSearchParams();
    if (tipo && tipo !== "Todos") q.set("tipo", tipo);
    if (busca) q.set("busca", busca);
    if (inicial) q.set("inicial", inicial);
    q.set("pagina", String(p));
    return `/santos?${q.toString()}`;
  };

  const start = Math.max(1, Math.min(pagina - 2, totalPaginas - 4));
  const pages = Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => start + i);

  return (
    <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Paginação">
      {pagina > 1 && (
        <Link
          href={href(pagina - 1)}
          className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          className={`w-10 h-10 flex items-center justify-center font-label-sm text-label-sm transition-all border ${
            p === pagina
              ? "bg-primary text-on-primary border-primary"
              : "border-outline-variant hover:border-primary text-on-surface"
          }`}
        >
          {String(p).padStart(2, "0")}
        </Link>
      ))}

      {pagina < totalPaginas && (
        <Link
          href={href(pagina + 1)}
          className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </nav>
  );
}

export default async function PaginaSantos({ searchParams }: PropsPaginaSantos) {
  const params = await searchParams;
  const tipo = params.tipo ?? "Todos";
  const busca = params.busca ?? "";
  const pagina = Number(params.pagina ?? 1);
  const inicial = params.inicial ?? "";

  const { santos, total, totalPaginas } = await getSantos({ tipo, busca, pagina, inicial });

  return (
    <div className="max-w-4xl mx-auto px-margin-mobile md:px-6 py-12 md:py-24">
      {/* Directory Header Centralized */}
      <section className="text-center mb-16">
        <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Santoral e Hagiografia</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body-md">
          Explore a vida daqueles que nos precederam na fé através dos séculos, biografias, datas de festa e padroeiros.
        </p>

        {/* Search & Simplified Filters */}
        <div className="mt-12 max-w-2xl mx-auto space-y-8">
          <BuscaSantos valorInicial={busca} />
          <FiltrosSantos tipos={["Todos", "Doutor"]} tipoAtivo={tipo} busca={busca} inicial={inicial} />
          <div className="border-t border-outline-variant/30 pt-4">
            <AlfabetoSantos inicialAtiva={inicial} tipo={tipo} busca={busca} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center w-full my-12">
        <div className="flex-1 h-px bg-secondary/30"></div>
        <span className="px-4 text-secondary">
          <Sparkles size={20} />
        </span>
        <div className="flex-1 h-px bg-secondary/30"></div>
      </div>

      {/* Grid Area Centralized */}
      <div className="w-full">
        {total === 0 ? (
          <div className="py-20 text-center border border-dashed border-outline-variant">
            <p className="text-on-surface-variant font-body-md">Nenhum santo encontrado para os filtros selecionados.</p>
            <Link href="/santos" className="text-secondary font-label-sm mt-4 inline-block uppercase tracking-widest hover:underline">
              Limpar todos os filtros
            </Link>
          </div>
        ) : (
          <>
            <Suspense fallback={<GridSkeleton />}>
              <GradeSantos santos={santos} />
            </Suspense>

            {/* Pagination */}
            {totalPaginas > 1 && (
              <NavegacaoPaginacao pagina={pagina} totalPaginas={totalPaginas} tipo={tipo} busca={busca} inicial={inicial} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
