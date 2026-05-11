import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PropsDestaqueCategoria } from "@/types/oracao";

export default function HeroCategoria({ nomeCat, config, quantidadeOracoes }: PropsDestaqueCategoria) {
    return (
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

            <div className="relative container mx-auto px-4 py-12 max-w-4xl">
                <Link
                    href="/oracoes"
                    className="inline-flex items-center gap-2 text-sm font-body font-bold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
                >
                    <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                    Todas as categorias
                </Link>

                <div className="flex items-center gap-4">
                    <div
                        className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: config.brilho, border: `1px solid ${config.borda}` }}
                    >
                        {config.emoji}
                    </div>

                    <div>
                        <h1
                            className="font-heading text-3xl md:text-4xl font-bold"
                            style={{ color: config.cor }}
                        >
                            {nomeCat}
                        </h1>

                        <p className="text-sm font-body text-muted-foreground mt-0.5">
                            {quantidadeOracoes} orações
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}