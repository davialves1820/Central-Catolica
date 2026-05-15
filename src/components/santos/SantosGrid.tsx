"use client";

import Image from "next/image";
import Link from "next/link";
import { PropsGradeSantos, PropsCartaoSanto } from "@/types/santos";

export default function GradeSantos({ santos }: PropsGradeSantos) {
  if (santos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p
          className="font-headline-xl text-7xl mb-6 opacity-10"
          aria-hidden="true"
        >
          ✝
        </p>
        <p className="text-on-surface-variant font-body-md text-base mb-1">Nenhum santo encontrado.</p>
        <p className="text-on-surface-variant/60 font-body-md text-sm mb-6">Tente ajustar os filtros ou a busca.</p>
        <Link
          href="/santos"
          className="text-label-sm font-label-sm rounded-none px-6 py-2 border border-primary transition-all hover:bg-primary hover:text-on-primary"
        >
          Limpar filtros
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {santos.map((santo) => <CartaoSanto key={santo.slug} santo={santo} />)}
    </div>
  );
}

function CartaoSanto({ santo }: PropsCartaoSanto) {
  return (
    <Link
      href={`/santos/${santo.slug}`}
      className="group cursor-pointer block"
      aria-label={santo.nome}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/30 bg-surface-container">
        {santo.imagem_url ? (
          <Image
            src={santo.imagem_url}
            alt={santo.nome}
            fill
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-headline-xl text-5xl opacity-10" aria-hidden="true">✝</span>
          </div>
        )}
      </div>
      <p className="font-label-sm text-label-sm text-secondary mb-1">
        {santo.tipo}
      </p>
      <h5 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors line-clamp-1">
        {santo.nome}
      </h5>
      <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 font-body-md">
        {santo.resumo}
      </p>
    </Link>
  );
}