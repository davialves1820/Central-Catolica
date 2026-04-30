"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-border"
        style={{ background: "hsl(var(--secondary))", color: "hsl(var(--crimson-light))" }}>
        <AlertCircle size={28} aria-hidden="true" />
      </div>
      <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
        Algo deu errado
      </h2>
      <p className="font-body text-muted-foreground mb-8 max-w-md">
        Ocorreu um erro ao carregar esta página. Tente novamente.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <RotateCcw size={16} aria-hidden="true" /> Tentar novamente
        </button>
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm border border-border text-foreground hover:border-primary/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}