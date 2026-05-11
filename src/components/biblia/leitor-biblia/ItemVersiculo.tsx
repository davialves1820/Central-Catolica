import { PropsItemVersiculo } from "@/types/biblia";

export default function ItemVersiculo({
  versiculo,
  t,
  tamanhoFonte,
  ehPrimeiro,
  estaDestacado,
  refVersiculo,
}: PropsItemVersiculo) {
  return (
    <p
      id={`v-${versiculo.versiculo}`}
      ref={refVersiculo}
      className={`group flex gap-4 rounded-lg px-3 py-2 transition-all duration-500 ${t.versiculo} ${estaDestacado ? t.destaque : ""
        }`}
      style={{ fontFamily: "var(--font-reading)", lineHeight: 1.9 }}
      aria-label={`Versículo ${versiculo.versiculo}`}
    >
      <span
        className={`mt-1 shrink-0 text-xs font-mono select-none w-6 text-right ${t.muted} opacity-50`}
      >
        {versiculo.versiculo}
      </span>
      <span className={t.texto}>
        {ehPrimeiro ? (
          <>
            <span
              className="float-left font-heading font-bold mr-2 leading-none"
              style={{
                fontSize: `${tamanhoFonte * 2.8}px`,
                lineHeight: 0.85,
                color: "hsl(var(--gold))",
              }}
            >
              {versiculo.texto.charAt(0)}
            </span>
            {versiculo.texto.slice(1)}
          </>
        ) : (
          versiculo.texto
        )}
      </span>
    </p>
  );
}
