/**
 * Utility for merging CSS class names.
 * A lightweight alternative to clsx + tailwind-merge for this project.
 * Filters out falsy values and joins the rest with a space.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

export function obterTituloPorSlug(slug: string): string {
  const map: Record<string, string> = {
    missa: "A Santa Missa",
    natal: "Natal",
    pascoa: "Páscoa",
    pentecoste: "Pentecoste",
    quaresma: "Quaresma",
  };
  
  if (slug in map) {
    return map[slug];
  }
  
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
