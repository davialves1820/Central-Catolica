"use client";

import { useEffect, useRef, useState } from "react";
import { Noticia } from "@/types";

export default function NewsPreview() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // 🔥 carregar notícias
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/noticias");
                const data = await res.json();
                setNoticias(data);
            } catch (e) {
                console.error(e);
            }
        }
        load();
    }, []);

    // 🔥 animação contínua (tipo rio)
    useEffect(() => {
        const el = containerRef.current;
        if (!el || noticias.length === 0) return;

        let frame: number;
        const speed = 0.5;

        const step = () => {
            el.scrollLeft += speed;

            if (el.scrollLeft >= el.scrollWidth / 2) {
                el.scrollLeft -= el.scrollWidth / 2;
            }

            frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frame);
    }, [noticias]);

    if (!noticias.length) {
        return <div className="py-10 text-center">Carregando...</div>;
    }

    const loop = [...noticias, ...noticias];

    return (
        <div className="overflow-hidden">
            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-scroll no-scrollbar"
            >
                {loop.map((n, i) => (
                    <a
                        key={i}
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[300px] max-w-[300px] border border-border rounded-xl p-5 bg-card
                                   transition-all hover:scale-[1.03] hover:shadow-lg cursor-pointer"
                    >
                        <p className="text-xs text-primary font-bold mb-2">
                            {n.fonte?.toUpperCase() || "NOTÍCIA"}
                        </p>

                        <h3 className="font-semibold line-clamp-2">
                            {n.titulo}
                        </h3>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                            {n.resumo}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}