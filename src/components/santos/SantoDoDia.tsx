import Image from "next/image";
import Link from "next/link";
import { getSantoDoDia } from "@/lib/server/services/santoDoDia";
import { ChevronRight, Sparkles } from "lucide-react";

export default async function SantoDoDia() {
    const santo = await getSantoDoDia();
    if (!santo) {
        return null;
    }

    return (
        <section className="px-5 md:px-16 py-12">
            {/* Section header */}
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-[#d0c4be] pb-4">
                <div>
                    <span className="text-[12px] font-semibold text-primary uppercase tracking-[0.3em] mb-2 block">
                        Sanctus Diei
                    </span>
                    <h2 className="font-heading text-4xl text-primary">Santo do Dia</h2>
                </div>
                <Link
                    href="/santos"
                    className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#4d4540] hover:text-primary flex items-center gap-2 mt-4 md:mt-0 transition-colors"
                >
                    Ver todos os santos <ChevronRight size={14} />
                </Link>
            </div>

            {/* Card */}
            <Link
                href={`/santos/${santo.slug}`}
                className="group flex flex-col md:flex-row gap-0 bg-card hover:bg-pearl border border-primary/20 hover:border-primary/35 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
                {/* Image */}
                <div className="relative w-full md:w-56 aspect-[3/2] md:aspect-auto shrink-0 overflow-hidden bg-[#f5f3ee]">
                    {santo.imagem_url ? (
                        <Image
                            src={santo.imagem_url}
                            alt={`Imagem de ${santo.nome}`}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 224px"
                            unoptimized
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span
                                className="font-heading text-6xl opacity-10 text-primary"
                                aria-hidden="true"
                            >
                                ✝
                            </span>
                        </div>
                    )}
                    {/* Overlay gradient on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        {/* Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={13} className="text-primary/60" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                                {santo.tipo}
                            </span>
                        </div>

                        {/* Name */}
                        <h3 className="font-heading text-3xl md:text-4xl text-[#1b1c19] group-hover:text-primary transition-colors duration-300 mb-3 leading-tight">
                            {santo.nome}
                        </h3>

                        {/* Feast day */}
                        {santo.data_festa && (
                            <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mb-5">
                                {santo.data_festa}
                            </p>
                        )}

                        {/* Summary */}
                        {santo.resumo && (
                            <p className="text-[#4d4540] font-reading italic text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4">
                                {santo.resumo}
                            </p>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all flex items-center gap-2">
                            Ler hagiografia
                            <ChevronRight
                                size={14}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </span>
                    </div>
                </div>

                {/* Right accent bar */}
                <div className="hidden md:block w-1 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 self-stretch shrink-0" />
            </Link>
        </section>
    );
}