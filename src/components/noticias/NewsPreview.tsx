import { buscarNoticias } from "@/lib/server/services/noticias";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export default async function NewsPreview() {
    const noticias = await buscarNoticias(["vaticannews"], 10);

    if (!noticias.length) {
        return (
            <div className="py-12 text-center text-outline-variant font-body text-sm italic">
                Não foi possível carregar as notícias.
            </div>
        );
    }

    const loop = [...noticias, ...noticias];

    return (
        <div className="relative">
            {/* fade masks */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 hidden md:block"
                style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 hidden md:block"
                style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
                aria-hidden="true"
            />

            <div className="overflow-x-auto no-scrollbar pb-8">
                <div className="flex gap-6 animate-carousel w-max px-4">
                    {loop.map((n, i) => (
                        <a
                            key={i}
                            href={n.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-[280px] max-w-[280px] border border-secondary/5 rounded-2xl p-6 bg-surface-container-lowest
                           transition-all duration-500 hover:shadow-xl hover:shadow-secondary/5 hover:border-secondary/20 cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="text-secondary/30" size={12} />
                                <p className="font-label-sm text-secondary">
                                    {n.fonteLabel?.toUpperCase() ?? "VATICANO"}
                                </p>
                            </div>
                            <h3 className="font-headline-sm text-primary mb-3 line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                                {n.titulo}
                            </h3>
                            <p className="font-body-sm text-on-surface-variant line-clamp-2 opacity-70 leading-relaxed">
                                {n.resumo}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/noticias"
                    className="inline-flex items-center gap-2 font-label-md text-secondary hover:text-primary transition-colors group"
                >
                    VER TODAS AS NOTÍCIAS
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}