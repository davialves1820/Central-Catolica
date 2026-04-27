"use client";

import { Leitura } from "../../types/liturgia";
import { LucideIcon } from "lucide-react";

interface ReadingSectionProps {
  title: string;
  leitura: Leitura;
  Icon: LucideIcon;
  isGospel?: boolean;
}

const ReadingSection = ({ title, leitura, Icon, isGospel }: ReadingSectionProps) => {
  const iconColorClass = isGospel ? "text-crimson" : "text-accent";
  const borderClass = isGospel ? "border-crimson/10 shadow-crimson/5" : "border-primary/5 shadow-sm";
  const titleClass = isGospel ? "text-3xl font-heading font-bold text-crimson" : "text-2xl font-heading font-bold text-foreground";
  const textClass = isGospel ? "text-xl leading-relaxed font-body text-slate-800" : "text-lg leading-relaxed font-body text-slate-700";

  return (
    <section className="space-y-6 relative">
      <div className={`flex items-center gap-3 border-b border-primary/10 pb-2`}>
        <Icon className={iconColorClass} size={isGospel ? 24 : 24} />
        <h2 className={titleClass}>
          {title}
        </h2>
      </div>
      <div className={`prose prose-slate max-w-none bg-white p-8 rounded-3xl border-2 ${borderClass} shadow-xl`}>
        <p className={`text-sm font-bold ${isGospel ? 'text-crimson' : 'text-accent'} italic mb-2`}>
          {leitura.referencia}
        </p>
        <h3 className={`text-xl md:text-2xl font-heading font-bold mb-6 ${isGospel ? 'text-crimson' : 'text-primary'}`}>
          {leitura.titulo}
        </h3>
        <div className={`${textClass} whitespace-pre-line`}>
          {leitura.texto}
        </div>
      </div>
    </section>
  );
};

export default ReadingSection;
