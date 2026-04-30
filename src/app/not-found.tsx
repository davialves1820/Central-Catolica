import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
            {/* Decorative cross */}
            <div className="relative mb-10 select-none">
                <span className="font-heading text-[10rem] font-bold leading-none text-primary/10 select-none">
                    404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-1 h-10 bg-accent/60 rounded-full" />
                        <div className="relative">
                            <div className="w-1 h-16 bg-accent/60 rounded-full" />
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-accent/60 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Página não encontrada
            </h1>
            <p className="font-body text-muted-foreground max-w-md mb-10 leading-relaxed">
                O caminho que você buscou não existe ou foi movido.{" "}
                <span className="italic text-accent/80">
                    &ldquo;Pedi e recebereis, buscai e encontrareis.&rdquo;
                </span>{" "}
                — Mt 7,7
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-body font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <Home size={18} />
                    Início
                </Link>
                <Link
                    href="/biblia"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-xl font-body font-bold hover:border-accent hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <BookOpen size={18} />
                    Bíblia
                </Link>
                <Link
                    href="/biblia/search"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-xl font-body font-bold hover:border-accent hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <Search size={18} />
                    Pesquisar
                </Link>
            </div>

            <p className="mt-16 text-xs text-muted-foreground/40 font-heading tracking-widest uppercase">
                Paróquia Menino Jesus de Praga
            </p>
        </div>
    );
}