import Image from "next/image";
import Link from "next/link";
import { getSantoDoDia } from "@/lib/server/services/santos";
import { ChevronRight } from "lucide-react";

export default async function SantoDoDia() {
  const santo = await getSantoDoDia();
  if (!santo) return null;

  return (
    <Link
      href={`/santos/${santo.slug}`}
      aria-label={`Santo do Dia: ${santo.nome}`}
      className="group flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--gold)/0.35)";
        (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--secondary))";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--border))";
        (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--card))";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border"
        style={{ borderColor: "hsl(var(--gold)/0.25)", background: "hsl(var(--secondary))" }}
      >
        {santo.imagem_url ? (
          <Image src={santo.imagem_url} alt={santo.nome} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-xl" style={{ color: "hsl(var(--gold)/0.2)" }} aria-hidden="true">✝</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold font-body uppercase tracking-widest" style={{ color: "hsl(var(--gold))" }}>
          Santo do Dia
        </p>
        <p className="mt-0.5 truncate font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {santo.nome}
        </p>
        {santo.data_festa && (
          <p className="text-xs text-muted-foreground font-body">{santo.data_festa}</p>
        )}
      </div>

      <ChevronRight
        size={16}
        className="ml-auto shrink-0 text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
        aria-hidden="true"
      />
    </Link>
  );
}
