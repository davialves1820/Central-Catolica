import Image from "next/image";
import { Noticia } from "@/types/noticias";
import { formatarData } from "@/lib/server/services/noticias";
import { ExternalLink, Sparkles } from "lucide-react";

export default function NoticiaDestaque({ noticia }: { noticia: Noticia }) {
  if (!noticia) return null;

  return (
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col md:flex-row min-h-[400px] md:min-h-[500px] overflow-hidden rounded-3xl border border-secondary/10 bg-surface-container-lowest transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5"
    >
      {/* Image Container */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
        {noticia.imagem ? (
          <Image
            src={noticia.imagem}
            alt={noticia.titulo}
            fill
            className="object-cover transition duration-1000 group-hover:scale-110"
            unoptimized
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-surface-container-low flex items-center justify-center">
            <Sparkles className="text-secondary/20" size={60} />
          </div>
        )}
        {/* Subtle inner shadow on image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:block hidden" />
      </div>

      {/* Content Container */}
      <div className="relative flex-1 p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
        {/* Ornamental Top Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

        <div className="mb-8 flex items-center gap-4">
            <span className="px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary font-label-sm">
                {noticia.fonteLabel}
            </span>
            {noticia.categoria && (
                <span className="font-label-sm text-outline-variant">{noticia.categoria}</span>
            )}
        </div>

        <h2 className="font-headline-lg text-primary mb-6 leading-tight group-hover:text-secondary transition-colors duration-500">
          {noticia.titulo}
        </h2>

        {noticia.resumo && (
          <p className="font-body-md text-on-surface-variant mb-10 line-clamp-3 leading-relaxed opacity-80">
            {noticia.resumo}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <p className="font-label-md text-primary flex items-center gap-2 group/btn">
                    LER NA ÍNTEGRA
                    <ExternalLink
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                </p>
            </div>
            <span className="font-label-sm text-outline-variant">
                {formatarData(noticia.publicadoEm)}
            </span>
        </div>
      </div>
    </a>
  );
}