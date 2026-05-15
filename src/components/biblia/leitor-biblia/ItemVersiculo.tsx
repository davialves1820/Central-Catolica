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
      className={`group flex gap-6 rounded-xl px-4 py-3 transition-all duration-500 ${t.versiculo} ${estaDestacado ? t.destaque : "hover:bg-primary/5"
        }`}
      style={{ fontFamily: "var(--font-reading)", lineHeight: 2.0 }}
      aria-label={`Versículo ${versiculo.versiculo}`}
    >
      <span
        className={`mt-2 shrink-0 text-[10px] font-body font-bold select-none w-6 text-right ${t.muted} opacity-40 group-hover:opacity-100 transition-opacity`}
      >
        {versiculo.versiculo}
      </span>
      <span className={`${t.texto} text-lg lg:text-xl`}>
        {ehPrimeiro ? (
          <>
            <span
              className="float-left font-heading font-medium mr-3 leading-none select-none"
              style={{
                fontSize: `${tamanhoFonte * 3.2}px`,
                lineHeight: 0.8,
                color: "hsl(var(--primary))",
                marginTop: "0.1em"
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
