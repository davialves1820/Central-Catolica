import Link from "next/link";
import { PropsDestaqueCategoria } from "@/types/oracao";
import { Book, Sparkles, Droplets, List, ChevronLeft } from "lucide-react";


const catIcons: Record<string, React.ReactNode> = {
    "Orações comuns": <Book className="w-5 h-5" />,
    "Orações diversas": <Sparkles className="w-5 h-5" />,
    "Comunhão": <Droplets className="w-5 h-5" />,
    "Jaculatórias": <List className="w-5 h-5" />,
};

export default function HeroCategoria({ nomeCat, config, quantidadeOracoes }: PropsDestaqueCategoria) {
    return (
        <section className="mb-16 text-center max-w-3xl mx-auto">
            <Link
                href="/oracoes"
                className="inline-flex items-center gap-2 font-label-sm text-on-surface-variant hover:text-primary transition-colors mb-10 group"
            >
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Livro de Orações
            </Link>

            <h2 className="font-headline-xl text-primary mb-6">{nomeCat}</h2>
            
            <div className="flex items-center justify-center gap-6 mb-8">
                <div className="h-[1px] w-16 bg-secondary/20"></div>
                <div className="text-secondary">
                    {catIcons[nomeCat] || <Sparkles className="w-5 h-5" />}
                </div>
                <div className="h-[1px] w-16 bg-secondary/20"></div>
            </div>

            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                {config.descricao} • {quantidadeOracoes} orações encontradas
            </p>
        </section>
    );
}

