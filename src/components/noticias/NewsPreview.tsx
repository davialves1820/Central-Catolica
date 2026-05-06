import { buscarNoticias } from "@/lib/server/services/noticias";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function NewsPreview() {
    const noticias = await buscarNoticias(["vaticannews"], 10);

    if (!noticias.length) {
        return (
            <div className="py-10 text-center text-muted-foreground font-body text-sm">
                Não foi possível carregar as notícias.
            </div>
        );
    }

    const loop = [...noticias, ...noticias];

    return (
        <div className="overflow-hidden relative">
            {/* fade masks */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
                style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
                style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
                aria-hidden="true"
            />

            <div className="flex gap-4 animate-carousel">
                {loop.map((n, i) => (
                    <a
                        key={i}
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[300px] max-w-[300px] border border-border rounded-xl p-5 bg-card
                       transition-all hover:scale-[1.03] hover:shadow-lg hover:border-primary/40 cursor-pointer"
                    >
                        <p className="text-xs text-primary font-bold mb-2">
                            {n.fonte?.toUpperCase() ?? "NOTÍCIA"}
                        </p>
                        <h3 className="font-semibold line-clamp-2 text-foreground">
                            {n.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                            {n.resumo}
                        </p>
                    </a>
                ))}
            </div>

            <div className="mt-6 text-center">
                <Link
                    href="/noticias"
                    className="inline-flex items-center gap-1.5 text-sm font-body font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    style={{ color: "hsl(var(--gold))" }}
                >
                    Ver todas as notícias
                    <ChevronRight size={14} aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}