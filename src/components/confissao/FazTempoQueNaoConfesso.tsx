import { HeartHandshake } from "lucide-react";

export function FazTempoQueNaoConfesso({ titulo, pontos }: { titulo: string; pontos: string[] }) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <HeartHandshake size={20} className="text-primary" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-primary">{titulo}</h3>
      </div>
      <ul className="space-y-3">
        {pontos.map((ponto) => (
          <li key={ponto} className="font-body-md leading-relaxed text-on-surface-variant">
            {ponto}
          </li>
        ))}
      </ul>
    </div>
  );
}
