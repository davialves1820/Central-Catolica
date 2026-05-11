export function obterPrimeiraLetra(titulo: string): string {
    const caractere = titulo.replace(/^["'""«]/, "").trim().charAt(0).toUpperCase();

    return caractere
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}