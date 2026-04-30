/**
 * Utility for merging CSS class names.
 * A lightweight alternative to clsx + tailwind-merge for this project.
 * Filters out falsy values and joins the rest with a space.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}
