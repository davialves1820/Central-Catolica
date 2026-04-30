import { getBibleData } from "@/lib/bible";
import { BookOpen, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import BibleProgress from "@/components/bible/BibleProgress";
import { BibleIndexSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bíblia Sagrada",
  description: "Leia a Bíblia Sagrada na tradução Ave Maria, acompanhe seu progresso e pesquise versículos.",
};

export const revalidate = 86400;


async function BibleContent() {
  const data = await getBibleData();


  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl mb-14 border border-border"
        style={{ background: "hsl(var(--secondary))" }}>
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px)`,
          }} />
        <div className="relative px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-body font-bold uppercase tracking-widest mb-5 border"
            style={{ borderColor: "hsl(var(--gold)/0.3)", color: "hsl(var(--gold))", background: "hsl(var(--gold)/0.06)" }}>
            <BookOpen size={11} aria-hidden="true" />
            Tradução Ave Maria
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Bíblia Sagrada
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Explore as escrituras, acompanhe seu progresso e mergulhe na Palavra de Deus.
          </p>
          <Link href="/biblia/search" aria-label="Pesquisar versículos"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-body font-bold text-sm border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-primary/40"
            style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold)/0.3)", color: "hsl(var(--foreground))" }}>
            <Search size={15} aria-hidden="true" style={{ color: "hsl(var(--gold))" }} />
            Pesquisar versículos…
            <kbd className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded border font-mono"
              style={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
              aria-label="Atalho Command K">⌘K</kbd>
          </Link>
        </div>
      </div>

      <div className="space-y-14">
        <BibleProgress />
        {/* Testaments */}
        <div className="grid md:grid-cols-2 gap-8">
          <TestamentSection title="Antigo Testamento" books={data.antigoTestamento}
            accentColor="hsl(var(--gold)/0.06)" accentBorder="hsl(var(--gold)/0.18)" />
          <TestamentSection title="Novo Testamento" books={data.novoTestamento}
            accentColor="hsl(var(--cobalt)/0.06)" accentBorder="hsl(var(--cobalt)/0.18)" />
        </div>
      </div>
    </div>
  );
}

export default function BiblePage() {
  return (
    <Suspense fallback={<BibleIndexSkeleton />}>
      <BibleContent />
    </Suspense>
  );
}

function TestamentSection({ title, books, accentColor, accentBorder }: {
  title: string; books: { nome: string; capitulos: unknown[] }[];
  accentColor: string; accentBorder: string;
}) {
  return (
    <section className="rounded-2xl border p-6"
      style={{ background: accentColor, borderColor: accentBorder }}
      aria-labelledby={`t-${title.replace(/\s/g, "-")}`}>
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/30">
        <BookOpen className="w-5 h-5" aria-hidden="true" style={{ color: "hsl(var(--gold))" }} />
        <h2 id={`t-${title.replace(/\s/g, "-")}`} className="font-heading text-xl font-semibold text-foreground">{title}</h2>
        <span className="ml-auto text-xs text-muted-foreground font-body">{books.length} livros</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {books.map((book) => (
          <Link key={book.nome}
            href={`/biblia/${encodeURIComponent(book.nome)}/1`}
            aria-label={book.nome}
            className="group flex items-center justify-between px-3 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-background/40">
            <span className="text-sm font-body text-foreground/75 group-hover:text-foreground transition-colors truncate">{book.nome}</span>
            <ChevronRight size={11} className="shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              style={{ color: "hsl(var(--gold))" }} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}