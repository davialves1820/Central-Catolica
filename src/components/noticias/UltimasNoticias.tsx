import Link from "next/link";
import { buscarNoticias, formatarData } from "@/lib/server/services/noticias";
import { ExternalLink, ChevronRight, Sparkles } from "lucide-react";

export default async function UltimasNoticias() {
  const noticias = await buscarNoticias(["vaticannews"], 4);

  return (
    <section aria-labelledby="ultimas-heading" className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
        <h2
          id="ultimas-heading"
          className="font-headline-sm text-primary flex items-center gap-3"
        >
          <Sparkles className="text-secondary/40" size={18} />
          Do Vaticano
        </h2>
        <Link
          href="/noticias"
          className="font-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1 group"
        >
          VER TODAS
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-4" role="list">
        {noticias.map((n) => (
          <a
            key={n.id}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className="group flex flex-col p-5 rounded-2xl border border-secondary/5 bg-surface-container-low hover:bg-white hover:border-secondary/20 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-label-sm text-secondary opacity-60">
                {formatarData(n.publicadoEm)}
              </span>
              <ExternalLink
                size={14}
                className="text-outline-variant group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
            
            <p className="font-body-md text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-relaxed">
              {n.titulo}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}