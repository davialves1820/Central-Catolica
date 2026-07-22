"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react";
import { PropsCalendarioSantosView } from "@/types/santos";
import { MESES, DIAS_NO_MES, chaveDia } from "@/lib/shared/calendarioSantos";

export default function CalendarioSantosView({
  calendario,
  mesInicial,
  diaInicial,
}: PropsCalendarioSantosView) {
  const [mes, setMes] = useState(mesInicial);
  const [diaSelecionado, setDiaSelecionado] = useState(diaInicial);
  const [diaBusca, setDiaBusca] = useState("");

  const diasNoMes = DIAS_NO_MES[mes - 1];
  const dias = useMemo(
    () => Array.from({ length: diasNoMes }, (_, i) => i + 1),
    [diasNoMes]
  );

  const santosDoDia = calendario[chaveDia(mes, diaSelecionado)] ?? [];

  const mudarMes = (delta: number) => {
    const novoMes = ((mes - 1 + delta + 12) % 12) + 1;
    setMes(novoMes);
    setDiaSelecionado((d) => Math.min(d, DIAS_NO_MES[novoMes - 1]));
  };

  const selecionarDia = (dia: number) => setDiaSelecionado(dia);

  const buscarDia = (e: React.FormEvent) => {
    e.preventDefault();
    const dia = parseInt(diaBusca, 10);
    if (!dia || dia < 1 || dia > diasNoMes) return;
    setDiaSelecionado(dia);
    setDiaBusca("");
  };

  return (
    <div className="space-y-10">
      {/* Navegação de mês + busca por dia */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-outline-variant/30 pb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => mudarMes(-1)}
            aria-label="Mês anterior"
            className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-heading text-2xl md:text-3xl text-primary capitalize w-44 text-center">
            {MESES[mes - 1]}
          </h2>
          <button
            type="button"
            onClick={() => mudarMes(1)}
            aria-label="Próximo mês"
            className="w-10 h-10 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <form onSubmit={buscarDia} className="flex items-center gap-3">
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            aria-label="Selecionar mês"
            className="border border-outline-variant bg-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-on-surface capitalize focus:outline-none focus:border-primary"
          >
            {MESES.map((nome, idx) => (
              <option key={nome} value={idx + 1} className="capitalize">
                {nome}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={diasNoMes}
            placeholder="Dia"
            value={diaBusca}
            onChange={(e) => setDiaBusca(e.target.value)}
            aria-label="Pesquisar dia"
            className="w-20 border border-outline-variant bg-transparent px-3 py-2 text-[11px] font-bold text-on-surface focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            aria-label="Ir para o dia"
            className="w-10 h-10 border border-primary bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-all shrink-0"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Grade de dias do mês */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {dias.map((dia) => {
          const temSantos = (calendario[chaveDia(mes, dia)] ?? []).length > 0;
          const ativo = dia === diaSelecionado;
          const hoje = mes === mesInicial && dia === diaInicial;

          return (
            <button
              key={dia}
              type="button"
              onClick={() => selecionarDia(dia)}
              aria-current={ativo ? "date" : undefined}
              className={`relative aspect-square flex flex-col items-center justify-center gap-1 border text-body-md font-body-md transition-all
                ${ativo
                  ? "bg-primary text-on-primary border-primary shadow-sm"
                  : "border-outline-variant text-on-surface hover:border-primary hover:text-primary"
                }`}
            >
              <span className={hoje && !ativo ? "font-bold text-primary" : ""}>{dia}</span>
              {temSantos && (
                <span
                  className={`w-1 h-1 rounded-full ${ativo ? "bg-on-primary" : "bg-primary/60"}`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Painel do dia selecionado */}
      <div className="border border-primary/20 bg-card p-8 md:p-10">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={13} className="text-primary/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
            {diaSelecionado} de {MESES[mes - 1]}
          </span>
        </div>

        {santosDoDia.length === 0 ? (
          <p className="text-on-surface-variant font-body-md">
            Nenhum santo cadastrado para esta data ainda.
          </p>
        ) : (
          <ul className="space-y-4">
            {santosDoDia.map((santo) => (
              <li key={santo.slug}>
                <Link
                  href={`/santos/${santo.slug}`}
                  className="group flex items-center gap-4 p-3 -m-3 hover:bg-pearl transition-colors"
                >
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-[#f5f3ee] border border-outline-variant/30">
                    {santo.imagem_url ? (
                      <Image
                        src={santo.imagem_url}
                        alt={`Imagem de ${santo.nome}`}
                        fill
                        className="object-cover object-top"
                        sizes="56px"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-xl opacity-20 text-primary" aria-hidden="true">
                          ✝
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-lg text-[#1b1c19] group-hover:text-primary transition-colors truncate">
                      {santo.nome}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">
                      {santo.tipo}
                    </p>
                    {santo.padroeiro_de && (
                      <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                        Padroeiro(a) de {santo.padroeiro_de}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-auto shrink-0 text-primary/40 group-hover:translate-x-1 group-hover:text-primary transition-all"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
