"use client";

import { WifiOff, BookOpen, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
            <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center mb-8">
                <WifiOff size={36} className="text-muted-foreground" aria-hidden="true" />
            </div>

            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
                Você está offline
            </h1>
            <p className="font-body text-muted-foreground max-w-sm mb-10 leading-relaxed">
                Não foi possível conectar à internet. Algumas páginas visitadas
                anteriormente podem estar disponíveis no cache.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
                <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <RefreshCw size={18} aria-hidden="true" />
                    Tentar novamente
                </button>
                <Link
                    href="/biblia"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-xl font-bold hover:border-accent hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    <BookOpen size={18} aria-hidden="true" />
                    Bíblia (cache)
                </Link>
            </div>

            <p className="mt-16 text-xs text-muted-foreground/40 font-heading tracking-widest uppercase">
                Paróquia Menino Jesus de Praga
            </p>
        </div>
    );
}