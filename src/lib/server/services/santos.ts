import santosData from "@/data/santos.json";

import { Santo, OpcoesBuscaSantos } from "@/types/santos";

const TODOS = (santosData as { santos: Santo[] }).santos;
const POR_PAGINA_PADRAO = 24;

export async function getSantos({ tipo = "Todos", busca = "", pagina = 1, porPagina = POR_PAGINA_PADRAO, inicial = "", }: OpcoesBuscaSantos = {}) {
  let lista = [...TODOS];

  // Filtro por tipo
  if (tipo && tipo !== "Todos") {
    lista = lista.filter((s) =>
      s.tipo.toLowerCase().includes(tipo.toLowerCase())
    );
  }

  // Busca por nome
  if (busca.trim()) {
    const q = busca.trim().toLowerCase();
    lista = lista.filter(
      (s) =>
        s.nome.toLowerCase().includes(q)
    );
  }

  // Filtro por inicial do nome
  if (inicial.trim()) {
    const ini = inicial.trim().toUpperCase();
    lista = lista.filter((s) =>
      s.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().startsWith(ini)
    );
  }

  // Ordena por nome
  lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const total = lista.length;
  const totalPaginas = Math.ceil(total / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const santos = lista.slice(inicio, inicio + porPagina);

  return { santos, total, totalPaginas };
}

export async function getSantoPorSlug(slug: string): Promise<Santo | null> {
  return TODOS.find((s) => s.slug === slug) ?? null;
}