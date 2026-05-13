"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/shared/Header";
import oracoesData from "@/data/oracoes.json";
import { CONFIG_CAT } from "@/types/oracao";

const data = oracoesData as { total: number; oracoes: { categoria: string }[] };

export default function OracoesPage() {
    const catCount: Record<string, number> = {};
    for (const o of data.oracoes) {
        catCount[o.categoria] = (catCount[o.categoria] || 0) + 1;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section
                    className="relative border-b border-border overflow-hidden"
                    style={{ background: "hsl(var(--secondary))" }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        aria-hidden="true"
                        style={{
                            backgroundImage: `
                repeating-linear-gradient(0deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px),
                repeating-linear-gradient(90deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px)
              `,
                        }}
                    />
                    <div className="relative container mx-auto px-4 py-16 md:py-20 text-center max-w-2xl">
                        <div className="flex items-center justify-center gap-3 mb-5" aria-hidden="true">
                            <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
                            <span
                                className="text-xs font-body font-bold uppercase tracking-[0.25em]"
                                style={{ color: "hsl(var(--gold))" }}
                            >
                                Orações Católicas
                            </span>
                            <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
                            Livro de Orações
                        </h1>
                        <p className="font-body text-muted-foreground max-w-md mx-auto">
                            {data.total} orações organizadas por categoria, da tradição da Igreja Católica.
                        </p>
                    </div>
                </section>

                {/* Category cards */}
                <section className="container mx-auto px-4 py-12 max-w-4xl">
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-8 text-center">
                        Escolha uma categoria
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(CONFIG_CAT).map(([cat, c]) => (
                            <Link
                                key={cat}
                                href={`/oracoes/${c.slug}`}
                                aria-label={`Ver ${cat} — ${catCount[cat]} orações`}
                                className="oracao-cat-card group relative flex items-center gap-5 p-6 rounded-2xl border border-border text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                style={{
                                    background: "hsl(var(--card))",
                                    "--c-border": c.borda,
                                    "--c-glow": c.cor,
                                } as React.CSSProperties}
                            >

                                {/* Emoji icon */}
                                <div
                                    className="text-3xl w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{ border: `1px solid ${c.borda}` }}
                                    aria-hidden="true"
                                >
                                    {c.emoji}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1 gap-2">
                                        <h3 className="font-heading text-lg font-semibold" style={{ color: c.cor }}>
                                            {cat}
                                        </h3>
                                        <span
                                            className="text-xs font-bold font-body px-2.5 py-0.5 rounded-full shrink-0"
                                            style={{ color: c.cor, border: `1px solid ${c.borda}` }}
                                        >
                                            {catCount[cat]} orações
                                        </span>
                                    </div>
                                    <p className="text-sm font-body text-muted-foreground leading-relaxed">
                                        {c.descricao}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={18}
                                    className="shrink-0 opacity-30 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all"
                                    style={{ color: c.borda }}
                                    aria-hidden="true"
                                />
                            </Link>
                        ))}
                    </div>

                    <p className="text-center text-xs text-muted-foreground font-body mt-10">
                        ✦ {data.total} orações no total ✦
                    </p>
                </section>
            </main>
        </div>
    );
}