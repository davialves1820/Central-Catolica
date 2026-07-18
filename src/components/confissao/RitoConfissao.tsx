import type { PassoRito } from "@/types/confissao";

export function RitoConfissao({ passos }: { passos: PassoRito[] }) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6">
      <h3 className="font-heading text-xl font-semibold mb-1 text-primary">Como se confessar</h3>
      <p className="mb-4 font-body-sm text-on-surface-variant">Passo a passo do Rito da Confissão.</p>
      <ol className="space-y-4">
        {passos.map((passo) => (
          <li key={passo.titulo}>
            <p className="font-body-sm font-semibold text-on-surface">{passo.titulo}</p>
            <p className="mt-0.5 font-body-md leading-relaxed text-on-surface-variant">{passo.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
