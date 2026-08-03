import { ShieldCheck } from "lucide-react";
import type { SacramentoConfissao } from "@/types/confissao";

function BlocoExplicativo({ titulo, texto, exemplo }: { titulo: string; texto: string; exemplo?: string }) {
  return (
    <div>
      <p className="font-body-md font-semibold text-on-surface">{titulo}</p>
      <p className="mt-0.5 font-body-sm leading-relaxed text-on-surface-variant">{texto}</p>
      {exemplo && (
        <p className="mt-1.5 rounded-lg bg-surface-container-low px-3 py-2 font-body-sm italic leading-relaxed text-on-surface-variant">
          Por exemplo: {exemplo}
        </p>
      )}
    </div>
  );
}

export function SacramentoInfo({ sacramento }: { sacramento: SacramentoConfissao }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#c9a84c]/25 bg-surface-container-lowest p-5 md:p-6">
        <p className="font-reading text-lg italic leading-relaxed text-on-surface">“{sacramento.citacao.texto}”</p>
        <p className="mt-3 font-label-sm text-secondary">— {sacramento.citacao.autor}</p>
      </div>

      <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6">
        <h3 className="font-heading text-xl font-semibold mb-1 text-primary">Quando há pecado mortal?</h3>
        <p className="mb-4 font-body-sm text-on-surface-variant">
          Três condições precisam estar juntas para que haja pecado mortal.
        </p>
        <div className="space-y-4">
          {sacramento.condicoesPecadoMortal.map((condicao) => (
            <BlocoExplicativo key={condicao.titulo} {...condicao} />
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-3.5 py-2.5">
          <p className="font-body-sm leading-relaxed text-on-surface-variant">{sacramento.obsPecadoMortal}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6">
        <h3 className="font-heading text-xl font-semibold mb-1 text-primary">
          Os cinco requisitos de uma confissão válida
        </h3>
        <p className="mb-4 font-body-sm text-on-surface-variant">
          Para sermos realmente perdoados, a confissão precisa reunir estes cinco passos.
        </p>
        <div className="space-y-4">
          {sacramento.requisitos.map((requisito) => (
            <BlocoExplicativo key={requisito.titulo} {...requisito} />
          ))}
        </div>
      </div>

      <div
        className="flex items-start gap-2.5 rounded-xl border border-[#c9a84c]/25 bg-white px-4 py-3.5"
        role="note"
      >
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
        <p className="font-body-sm leading-relaxed text-on-surface-variant">{sacramento.sigilo}</p>
      </div>

      <div className="rounded-2xl border border-[#c9a84c]/25 bg-surface-container-lowest p-5 md:p-6">
        <h3 className="font-heading text-xl font-semibold mb-3 text-primary">{sacramento.oracaoPreparatoria.titulo}</h3>
        <p className="font-reading text-lg leading-relaxed whitespace-pre-line text-on-surface">
          {sacramento.oracaoPreparatoria.texto}
        </p>
      </div>

      <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6">
        <h3 className="font-heading text-xl font-semibold mb-1 text-primary">Perguntas iniciais</h3>
        <p className="mb-4 font-body-sm text-on-surface-variant">
          Antes de entrar no exame por mandamento, uma reflexão sobre suas confissões anteriores.
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          {sacramento.perguntasIniciais.map((pergunta) => (
            <li key={pergunta} className="font-body-md leading-relaxed text-on-surface-variant">
              {pergunta}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
