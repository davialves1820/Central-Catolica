import { PropsCabecalhoCapitulo } from "@/types/biblia";
import { Sparkles } from "lucide-react";

export default function CabecalhoCapitulo({ t, nomeLivro, numeroCapitulo }: PropsCabecalhoCapitulo) {
  return (
    <div className="text-center mb-16">
      <p className="font-body text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-primary opacity-80">
        {nomeLivro}
      </p>
      <h2 className={`font-heading text-5xl lg:text-7xl font-medium ${t.texto}`}>
        Capítulo {numeroCapitulo}
      </h2>
      <div className="sacred-divider" aria-hidden="true">
        <Sparkles size={16} />
      </div>
    </div>
  );
}
