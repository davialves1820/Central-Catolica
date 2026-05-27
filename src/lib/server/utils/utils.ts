export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export { obterTituloPorSlug } from "@/config/catequese";