import { PropsLinkContinuarLeitura } from "@/types/biblia";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LinkContinuarLeitura({ nomeLivro, capitulo }: PropsLinkContinuarLeitura) {
    return (
        <Link
            href={`/biblia/${encodeURIComponent(nomeLivro)}/${capitulo}`}
            aria-label={`Continuar lendo ${nomeLivro}, capítulo ${capitulo}`}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-body font-bold text-xs uppercase tracking-widest transition-all group bg-foreground text-background hover:bg-primary hover:text-white shadow-lg shadow-foreground/5"
        >
            <span>
                {nomeLivro} · {capitulo}
            </span>
            <ChevronRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
            />
        </Link>
    );
}