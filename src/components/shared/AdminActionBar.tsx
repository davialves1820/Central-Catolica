"use client";

import Link from "next/link";
import { GraduationCap, Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";

export const AdminActionBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary border-b border-accent/20 py-3 shadow-xl relative z-40"
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
            <Settings size={18} className="text-accent" />
          </div>
          <div>
            <span className="text-white font-heading font-bold text-sm block leading-none">
              Painel Administrativo
            </span>
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest mt-1 block">
              Acesso Restrito
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catequese"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/10 text-sm font-bold group"
          >
            <GraduationCap size={18} className="text-accent group-hover:scale-110 transition-transform" />
            Painel de Catequese
          </Link>
          
          <Link
            href="/events/new"
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-gold-dark text-white rounded-lg transition-all shadow-lg shadow-black/10 text-sm font-bold group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            Novo Evento
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
