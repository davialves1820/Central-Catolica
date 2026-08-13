import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { absoluteUrl } from "@/config/site";

export interface BreadcrumbItem {
  label: string;
  /** Omitir no último item (página atual). */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Trilha de navegação visível + BreadcrumbList (Schema.org) para SEO. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const full: BreadcrumbItem[] = [{ label: "Início", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-label-sm uppercase tracking-wider text-on-surface-variant">
          {full.map((item, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-primary" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight size={11} aria-hidden="true" className="opacity-50" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
