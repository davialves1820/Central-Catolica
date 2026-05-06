"use client";

import { SantoExternalLinkProps } from "@/types/santos";
import { ExternalLink } from "lucide-react";

export default function SantoExternalLink({ href, color, border }: SantoExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 text-sm font-body font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4 py-3 border hover:-translate-y-px"
      style={{
        color: "hsl(var(--muted-foreground))",
        borderColor: "hsl(var(--border))",
        background: "hsl(var(--card))",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = color;
        (e.currentTarget as HTMLAnchorElement).style.borderColor = border;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--muted-foreground))";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--border))";
      }}
    >
      <ExternalLink size={14} aria-hidden="true" />
      Ver na Wikipedia
    </a>
  );
}
