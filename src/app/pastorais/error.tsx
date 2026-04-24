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
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
        Algo deu errado!
      </h2>
      <p className="font-body text-muted-foreground mb-8 max-w-md">
        Desculpe pelo transtorno. Ocorreu um erro ao carregar esta página.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20"
        >
          <RotateCcw size={18} /> Tentar novamente
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white border border-primary/20 text-primary px-6 py-3 rounded-xl font-bold hover:bg-pearl transition-all"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
