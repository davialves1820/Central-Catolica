"use client";

import React from "react";
import Link from "next/link";
import oracoesData from "@/data/oracoes.json";
import { CONFIG_CAT, Oracao } from "@/types/oracao";
import OracoesHero from "@/components/oracao/OracoesHero";
import OracoesSidebar from "@/components/oracao/OracoesSidebar";

const data = oracoesData as { total: number; oracoes: Oracao[] };

import { Book, Sparkles, Droplets, List, ArrowUpRight } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
    "Orações comuns": <Book className="w-8 h-8" />,
    "Orações diversas": <Sparkles className="w-8 h-8" />,
    "Comunhão": <Droplets className="w-8 h-8" />,
    "Jaculatórias": <List className="w-8 h-8" />,
};

export default function OracoesPage() {
    const catCount: Record<string, number> = {};
    for (const o of data.oracoes) {
        catCount[o.categoria] = (catCount[o.categoria] || 0) + 1;
    }

    // Featured prayers from 'Orações comuns'
    const commonPrayers = data.oracoes.filter(o => o.categoria === "Orações comuns").slice(0, 2);

    // Other categories for the grid
    const otherCategories = Object.entries(CONFIG_CAT);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
                <OracoesHero />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
                    <OracoesSidebar />

                    <div className="md:col-span-9 space-y-12 md:space-y-16">
                        {/* Mobile Category Menu */}
                        <div className="md:hidden overflow-x-auto no-scrollbar flex gap-4 pb-4 -mx-4 px-4">
                            {Object.entries(CONFIG_CAT).map(([cat, config]) => (
                                <Link
                                    key={cat}
                                    href={`/oracoes/${config.slug}`}
                                    className="shrink-0 px-5 py-3 rounded-full bg-surface-container-low border border-secondary/10 text-label-sm text-primary flex items-center gap-2"
                                >
                                    {categoryIcons[cat] || <Sparkles className="w-4 h-4" />}
                                    {cat}
                                </Link>
                            ))}
                        </div>

                        {/* Featured Section: Orações Comuns */}
                        <section className="bg-surface-container-lowest border border-secondary/10 p-6 md:p-16 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden">
                            {/* Decoration - Hidden on very small screens to avoid overflow */}
                            <div className="absolute top-12 right-12 text-secondary/5 rotate-12 hidden sm:block">
                                <Book size={180} />
                            </div>

                            <div className="relative z-10 mb-10 md:mb-16">
                                <span className="font-label-sm text-secondary mb-2 block">Tradição da Igreja</span>
                                <h3 className="font-headline-lg text-primary text-3xl md:text-5xl">Orações Essenciais</h3>
                            </div>

                            <div className="relative z-10 space-y-12 md:space-y-16">
                                {commonPrayers.map((oracao, idx) => (
                                    <React.Fragment key={oracao.slug}>
                                        <article className="max-w-2xl group cursor-default">
                                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                                <h4 className="font-label-md text-primary tracking-[0.2em] text-xs md:text-sm">{oracao.titulo}</h4>
                                            </div>
                                            <div className="space-y-6 md:space-y-8">
                                                {oracao.texto.split("\n\n").map((para, pIdx) => (
                                                    <p
                                                        key={pIdx}
                                                        className={pIdx === 0
                                                            ? "font-headline-md italic text-on-surface leading-relaxed border-l-2 border-secondary/20 pl-4 md:pl-8 text-xl md:text-2xl"
                                                            : "font-body-lg text-on-surface-variant leading-relaxed pl-4 md:pl-8 text-base md:text-lg"
                                                        }
                                                    >
                                                        {para}
                                                    </p>
                                                ))}
                                            </div>
                                        </article>
                                        {idx < commonPrayers.length - 1 && <div className="h-[1px] w-full bg-secondary/5"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>

                        {/* Grid of Other Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-gutter">
                            {otherCategories.map(([cat, config]) => (
                                <Link
                                    key={cat}
                                    href={`/oracoes/${config.slug}`}
                                    className="bg-surface-container-low border border-secondary/5 p-8 md:p-10 rounded-2xl hover:border-secondary/30 hover:bg-white transition-all group cursor-pointer shadow-sm relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex justify-between items-start mb-8 md:mb-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                            {categoryIcons[cat] || <Sparkles className="w-6 h-6 md:w-8 md:h-8" />}
                                        </div>
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-outline opacity-0 md:group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="font-headline-md mb-2 md:mb-4 text-primary text-xl md:text-2xl">{cat}</h3>
                                        <p className="font-body-md text-on-surface-variant leading-relaxed opacity-80 text-sm md:text-base">{config.descricao}</p>
                                    </div>

                                    {/* Subtle background icon */}
                                    <div className="absolute -bottom-4 -right-4 text-primary/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                                        {categoryIcons[cat] || <Sparkles size={100} />}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


