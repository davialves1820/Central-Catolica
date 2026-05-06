"use client";

import { LiturgiaSidebarProps } from "../../types/liturgia";
import { Quote } from "lucide-react";

const LiturgiaSidebar = ({ liturgia }: LiturgiaSidebarProps) => {
  return (
    <div className="space-y-8">
      <div className="sticky top-24 space-y-8">
        {/* Orations Section */}
        <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-md space-y-6">
          <h3 className="text-xl font-heading font-bold text-primary border-b border-primary/10 pb-2">
            Orações do Dia
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-accent uppercase tracking-tighter mb-1">Coleta</h4>
              <p className="text-sm font-body text-slate-600 italic">
                {liturgia.dia}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-accent uppercase tracking-tighter mb-1">Sobre as Oferendas</h4>
              <p className="text-sm font-body text-slate-600 italic">
                {liturgia.oferendas}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-accent uppercase tracking-tighter mb-1">Depois da Comunhão</h4>
              <p className="text-sm font-body text-slate-600 italic">
                {liturgia.comunhao}
              </p>
            </div>
          </div>
        </div>

        {/* Antiphons */}
        <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Quote size={20} />
            <h3 className="text-xl font-heading font-bold">Antífonas</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-1 font-body">Entrada</h4>
              <p className="text-sm font-body text-slate-700">
                {liturgia.antifonas.entrada}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-1 font-body">Comunhão</h4>
              <p className="text-sm font-body text-slate-700">
                {liturgia.antifonas.comunhao}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiturgiaSidebar;
