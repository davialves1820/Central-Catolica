"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CarouselNoticiasProps } from "@/types/noticias";

export default function CarouselNoticias({ noticias }: CarouselNoticiasProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: number) => {
        if (!carouselRef.current) return;

        const width = carouselRef.current.clientWidth;

        carouselRef.current.scrollBy({
            left: dir * width * 0.8,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            {/* ← */}
            <button
                onClick={() => scroll(-1)}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur border border-border rounded-full p-2 shadow hover:bg-secondary transition"
            >
                <ChevronLeft size={18} />
            </button>

            {/* → */}
            <button
                onClick={() => scroll(1)}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur border border-border rounded-full p-2 shadow hover:bg-secondary transition"
            >
                <ChevronRight size={18} />
            </button>

            {/* Carrossel */}
            <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            >
                {noticias.map((n, i) => (
                    <a
                        key={i}
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="snap-start shrink-0 w-[280px] md:w-[320px] group border border-border rounded-xl p-5 hover:border-primary/40 transition-all hover:bg-secondary/50"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                            NOTÍCIA
                        </p>

                        <h3 className="font-heading text-base font-semibold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {n.titulo}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {n.resumo}
                        </p>

                        <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                            Ler mais
                            <ChevronRight size={12} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}