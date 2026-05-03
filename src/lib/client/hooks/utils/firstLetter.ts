export function firstLetter(titulo: string): string {
    const ch = titulo.replace(/^["'""«]/, "").trim().charAt(0).toUpperCase();

    return ch
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}