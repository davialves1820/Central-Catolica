export const MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
] as const;

export const DIAS_NO_MES = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function normalizarTexto(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "").trim();
}

export function chaveDia(mes: number, dia: number): string {
    return `${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}
