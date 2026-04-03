import { getBibleData } from "@/lib/bible";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import BibleProgress from "@/components/bible/BibleProgress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bíblia Sagrada | Paróquia Manager",
  description: "Leia a Bíblia Sagrada na tradução Ave Maria, acompanhe seu progresso e pesquise versículos.",
};

export default async function BiblePage() {
  const data = await getBibleData();

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary font-heading">Bíblia Sagrada</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto font-body">
          Explore as escrituras sagradas, registre seu progresso e aprofunde-se na palavra de Deus.
        </p>
      </header>

      <BibleProgress />

      <section className="grid md:grid-cols-2 gap-8">
        {/* Antigo Testamento */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <BookOpen className="text-primary w-5 h-5" />
            <h2 className="text-2xl font-semibold">Antigo Testamento</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.antigoTestamento.map((book) => (
              <Link 
                key={book.nome}
                href={`/biblia/${encodeURIComponent(book.nome)}/1`}
                className="text-sm p-2 hover:bg-muted rounded-md transition-colors flex items-center justify-between group"
              >
                <span>{book.nome}</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Novo Testamento */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <BookOpen className="text-primary w-5 h-5" />
            <h2 className="text-2xl font-semibold">Novo Testamento</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.novoTestamento.map((book) => (
              <Link 
                key={book.nome}
                href={`/biblia/${encodeURIComponent(book.nome)}/1`}
                className="text-sm p-2 hover:bg-muted rounded-md transition-colors flex items-center justify-between group"
              >
                <span>{book.nome}</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder for Search - will be replaced by a client component */}
      <section className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
        <h3 className="text-xl font-medium mb-4">Procurando algum versículo específico?</h3>
        <p className="mb-6 text-muted-foreground">Use nossa ferramenta de busca para encontrar passagens rapidamente.</p>
        <Link 
          href="/biblia/search"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Pesquisar na Bíblia
        </Link>
      </section>
    </div>
  );
}
