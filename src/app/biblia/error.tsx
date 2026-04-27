"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100">
          <AlertCircle size={30} />
        </div>

        <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
          Algo deu errado
        </h2>
        <p className="font-body text-muted-foreground mb-8 leading-relaxed">
          Não foi possível carregar esta página da Bíblia. Tente novamente ou volte ao início.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold font-body hover:bg-crimson-light transition-all shadow-lg shadow-primary/20"
          >
            <RotateCcw size={16} />
            Tentar novamente
          </button>
          <Link
            href="/biblia"
            className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-6 py-3 rounded-xl font-bold font-body hover:bg-pearl transition-all"
          >
            <BookOpen size={16} />
            Voltar à Bíblia
          </Link>
        </div>
      </motion.div>
    </div>
  );
}