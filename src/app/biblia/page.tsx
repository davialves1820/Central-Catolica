import { getBibleData } from "@/lib/bible";
import { BookOpen, Search, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import BibleProgress from "@/components/bible/BibleProgress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bíblia Sagrada | Paróquia Menino Jesus de Praga",
  description:
    "Leia a Bíblia Sagrada na tradução Ave Maria, acompanhe seu progresso e pesquise versículos.",
};

// Books highlighted as "popular" for the featured strip
const FEATURED_BOOKS = [
  "Gênesis", "Salmos", "Provérbios", "Isaías",
  "Mateus", "João", "Romanos", "Apocalipse",
];

export default async function BiblePage() {
  const data = await getBibleData();

  const allBooks = [
    ...data.antigoTestamento.map((b) => ({ ...b, testament: "AT" as const })),
    ...data.novoTestamento.map((b) => ({ ...b, testament: "NT" as const })),
  ];

  const featured = allBooks.filter((b) => FEATURED_BOOKS.includes(b.nome));

  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-primary">
        {/* Decorative cross grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 48px, rgba(255,255,255,0.6) 48px, rgba(255,255,255,0.6) 49px
            ), repeating-linear-gradient(
              90deg, transparent, transparent 48px, rgba(255,255,255,0.6) 48px, rgba(255,255,255,0.6) 49px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-crimson/60" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={12} />
            Tradução Ave Maria
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 leading-none">
            Bíblia Sagrada
          </h1>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto mb-10">
            Explore as escrituras, acompanhe seu progresso e mergulhe na Palavra de Deus.
          </p>

          {/* Search CTA */}
          <Link
            href="/biblia/search"
            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full font-body font-semibold transition-all duration-200 backdrop-blur-sm"
          >
            <Search size={16} className="text-accent" />
            Pesquisar versículos…
            <kbd className="hidden md:inline-block bg-white/10 text-white/50 text-[10px] px-2 py-0.5 rounded border border-white/10 font-mono">
              ⌘K
            </kbd>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-14">
        {/* ── Progress card ─────────────────────────────────────── */}
        <BibleProgress />

        {/* ── Featured books strip ──────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Star size={16} className="text-accent" />
            <h2 className="font-heading text-xl font-bold text-primary">
              Livros em destaque
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featured.map((book, i) => (
              <Link
                key={book.nome}
                href={`/biblia/${encodeURIComponent(book.nome)}/1`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white hover:border-accent/40 hover:shadow-md hover:shadow-accent/10 transition-all duration-300 p-5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">
                  {book.testament === "AT" ? "Antigo Test." : "Novo Test."}
                </span>
                <p className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {book.nome}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {book.capitulos.length} cap.
                </p>
                <ChevronRight
                  size={14}
                  className="absolute bottom-4 right-4 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Testaments grid ───────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Antigo Testamento */}
          <TestamentSection
            title="Antigo Testamento"
            books={data.antigoTestamento}
            accent="from-amber-500/10 to-amber-600/5"
            borderAccent="border-amber-200"
          />

          {/* Novo Testamento */}
          <TestamentSection
            title="Novo Testamento"
            books={data.novoTestamento}
            accent="from-primary/10 to-primary/5"
            borderAccent="border-primary/20"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Sub-component ─────────────────────────────────────────────── */
function TestamentSection({
  title,
  books,
  accent,
  borderAccent,
}: {
  title: string;
  books: { nome: string; capitulos: unknown[] }[];
  accent: string;
  borderAccent: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${accent} rounded-3xl border ${borderAccent} p-6 shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-black/5">
        <BookOpen className="text-primary w-5 h-5" />
        <h2 className="font-heading text-xl font-bold text-primary">{title}</h2>
        <span className="ml-auto text-xs text-muted-foreground font-body">
          {books.length} livros
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
        {books.map((book) => (
          <Link
            key={book.nome}
            href={`/biblia/${encodeURIComponent(book.nome)}/1`}
            className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/70 transition-all duration-150"
          >
            <span className="text-sm font-body text-foreground/80 group-hover:text-primary transition-colors truncate">
              {book.nome}
            </span>
            <ChevronRight
              size={12}
              className="shrink-0 opacity-0 group-hover:opacity-100 text-accent transition-all group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}