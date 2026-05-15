import { Sparkles } from "lucide-react";

export default function OracoesHero() {
  return (
    <div className="mb-16 text-center max-w-3xl mx-auto px-4">
      <h2 className="font-headline-xl text-primary mb-6">Orações</h2>
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="h-[1px] w-16 bg-secondary/20"></div>
        <Sparkles className="text-secondary w-5 h-5 fill-secondary/20" />
        <div className="h-[1px] w-16 bg-secondary/20"></div>
      </div>
      <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
        Entre no silêncio do seu coração e encontre-se com o Divino através das palavras que atravessam os séculos.
      </p>
    </div>
  );
}

