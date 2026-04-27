"use client";

import { Salmo } from "../../types/liturgia";
import { Music } from "lucide-react";

interface PsalmSectionProps {
  salmo: Salmo;
}

const PsalmSection = ({ salmo }: PsalmSectionProps) => {
  return (
    <section className="space-y-6 bg-pearl p-8 rounded-2xl border border-primary/5">
      <div className="flex items-center gap-3 border-b border-primary/10 pb-2">
        <Music className="text-accent" size={24} />
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Salmo Responsorial
        </h2>
      </div>
      <div className="space-y-6 text-center">
        <p className="text-sm font-bold text-accent italic">
          {salmo.referencia}
        </p>
        <div className="text-xl font-heading font-bold text-primary italic bg-white p-6 rounded-xl border border-accent/20 shadow-sm">
          R. {salmo.refrao}
        </div>
        <div className="text-lg leading-relaxed font-body text-slate-700 whitespace-pre-line italic">
          {salmo.texto}
        </div>
      </div>
    </section>
  );
};

export default PsalmSection;
