import { Landmark, Link2, Quote, Sparkles } from "lucide-react";
import { PropsInsightsLiturgicos } from "@/types/liturgia";

export default function LiturgiaInsightsCard({ insights }: PropsInsightsLiturgicos) {
  if (!insights) return null;

  return (
    <section id="exegese-meditacao" className="space-y-10 scroll-mt-28">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/5" aria-hidden="true">
          <Sparkles size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
            Exegese &amp; Meditação
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Contexto histórico e eco patrístico à luz da Tradição da Igreja.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-card/40 backdrop-blur-sm p-8 md:p-10 border border-border/40 rounded-[2rem] shadow-2xl shadow-foreground/5">
          <div className="flex items-center gap-3 mb-6">
            <Landmark size={16} aria-hidden="true" className="text-primary" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Contexto Histórico &amp; Cultural
            </h3>
          </div>
          <p className="text-foreground/90 text-base md:text-lg leading-[1.7] font-reading">
            {insights.contextoHistoricoCultural}
          </p>
        </div>

        <div className="bg-card/40 backdrop-blur-sm p-8 md:p-10 border border-border/40 rounded-[2rem] shadow-2xl shadow-foreground/5">
          <div className="flex items-center gap-3 mb-6">
            <Link2 size={16} aria-hidden="true" className="text-primary" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Harmonia Litúrgica &amp; Teológica
            </h3>
          </div>
          <p className="text-foreground/90 text-base md:text-lg leading-[1.7] font-reading">
            {insights.conexoesTeologicas}
          </p>
        </div>
      </div>

      {insights.ecoPatristico.length > 0 && (
        <div className="bg-card/40 backdrop-blur-sm p-8 md:p-10 border border-border/40 rounded-[2rem] shadow-2xl shadow-foreground/5 space-y-8">
          <div className="flex items-center gap-3">
            <Quote size={16} aria-hidden="true" className="text-primary" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              A Voz dos Padres da Igreja
            </h3>
          </div>
          <div className="space-y-6">
            {insights.ecoPatristico.map((item, idx) => (
              <blockquote
                key={idx}
                className="border-l-4 border-primary/40 pl-6 bg-pearl/40 rounded-r-xl py-4"
              >
                <p className="text-foreground/90 text-base md:text-lg leading-[1.7] font-reading italic">
                  &ldquo;{item.citacaoOuResumo}&rdquo;
                </p>
                <footer className="mt-3 text-xs font-bold not-italic uppercase tracking-widest text-primary/70">
                  {item.autor}
                  {item.obraReferencia && (
                    <span className="text-muted-foreground font-normal normal-case tracking-normal"> ({item.obraReferencia})</span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {insights.aplicacaoPratica.length > 0 && (
        <div className="bg-pearl/40 backdrop-blur-sm p-8 md:p-10 border border-primary/10 rounded-[2rem] space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
            Para Meditar no Dia a Dia (Lectio Divina)
          </h3>
          <ul className="space-y-3">
            {insights.aplicacaoPratica.map((pergunta, idx) => (
              <li key={idx} className="flex items-start gap-3 text-foreground/90 font-reading text-base md:text-lg">
                <span className="text-primary font-bold mt-1">•</span>
                <span>{pergunta}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
