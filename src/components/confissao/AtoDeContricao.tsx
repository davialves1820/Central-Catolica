import type { Oracao } from "@/types/confissao";

export function AtoDeContricao({ oracao }: { oracao: Oracao }) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/25 bg-surface-container-lowest p-5 md:p-6">
      <h3 className="font-heading text-xl font-semibold mb-3 text-primary">{oracao.titulo}</h3>
      <p className="font-reading text-lg leading-relaxed whitespace-pre-line text-on-surface">{oracao.texto}</p>
    </div>
  );
}
