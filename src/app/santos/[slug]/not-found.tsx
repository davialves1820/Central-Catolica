import Link from "next/link";
import Header from "@/components/shared/Header";
import { ChevronLeft } from "lucide-react";

export default function SantoNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* Cross ornament */}
        <div className="mb-8 select-none" aria-hidden="true">
          <p className="font-heading text-8xl font-bold" style={{ color: "hsl(var(--gold)/0.12)" }}>
            ✝
          </p>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Santo não encontrado
        </h1>
        <p className="font-body text-muted-foreground max-w-sm mb-10 leading-relaxed">
          Não encontramos este santo em nosso acervo. Ele pode ter sido removido
          ou o endereço está incorreto.
        </p>

        <Link
          href="/santos"
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-body font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{
            borderColor: "hsl(var(--gold)/0.35)",
            color: "hsl(var(--gold))",
            background: "hsl(var(--gold)/0.08)",
          }}
        >
          <ChevronLeft size={15} aria-hidden="true" />
          Voltar aos Santos
        </Link>
      </main>
    </div>
  );
}
