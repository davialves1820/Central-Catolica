const COR_MAP: Record<string, string> = {
  VERDE: "hsl(140,50%,45%)",
  ROXO: "hsl(270,50%,55%)",
  VERMELHO: "hsl(0,65%,55%)",
  BRANCO: "hsl(0,0%,88%)",
  ROSA: "hsl(330,55%,65%)",
  PRETO: "hsl(0,0%,20%)",
  DOURADO: "hsl(45,80%,55%)",
  AMARELO: "hsl(50,90%,55%)",
};

interface PropsPontoCor {
  cor: string;
  className?: string;
}

/** A small colored circle indicating the liturgical color of a day. */
export default function ColorDot({ cor, className = "" }: PropsPontoCor) {
  const bg = COR_MAP[cor] ?? COR_MAP["AMARELO"];
  return (
    <span
      className={`block w-1.5 h-1.5 rounded-full shrink-0 ${className}`}
      style={{ background: bg }}
      aria-hidden="true"
    />
  );
}
