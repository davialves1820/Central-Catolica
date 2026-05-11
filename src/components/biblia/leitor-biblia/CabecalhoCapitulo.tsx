import { PropsCabecalhoCapitulo } from "@/types/biblia";

export default function CabecalhoCapitulo({ t, nomeLivro, numeroCapitulo }: PropsCabecalhoCapitulo) {
  return (
    <div className="text-center mb-10">
      <p
        className="text-xs font-bold font-body uppercase tracking-[0.3em] mb-2"
        style={{ color: "hsl(var(--gold))" }}
      >
        {nomeLivro}
      </p>
      <h2 className={`font-heading text-3xl font-semibold ${t.texto}`}>
        Capítulo {numeroCapitulo}
      </h2>
      <div
        className="mt-3 mx-auto w-14 h-px"
        style={{ background: "hsl(var(--gold)/0.4)" }}
        aria-hidden="true"
      />
    </div>
  );
}
