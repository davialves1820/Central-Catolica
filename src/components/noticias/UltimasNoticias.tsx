import Link from "next/link";
import { buscarNoticias, formatarData } from "@/lib/server/services/noticias";
import { ExternalLink, ChevronRight } from "lucide-react";

export default async function UltimasNoticias() {
  const noticias = await buscarNoticias(["vaticannews"], 4);

  return (
    <section aria-labelledby="ultimas-heading">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2
          id="ultimas-heading"
          className="font-heading text-xl font-semibold text-foreground"
        >
          Do Vaticano
        </h2>
        <Link
          href="/noticias"
          className="flex items-center gap-1 text-xs font-body font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          style={{ color: "hsl(var(--gold))" }}
        >
          Ver todas
          <ChevronRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-2" role="list">
        {noticias.map((n) => (
          <a
            key={n.id}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={n.titulo}
            className="ultimas-noticias-item group flex items-start gap-3 rounded-xl border p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{
              background: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            {/* Gold accent bar */}
            <div
              className="mt-1 w-0.5 h-10 rounded-full shrink-0 self-stretch"
              style={{ background: "hsl(var(--gold)/0.3)" }}
              aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm leading-snug text-foreground/75 group-hover:text-foreground transition-colors font-body font-semibold">
                {n.titulo}
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-body">
                {formatarData(n.publicadoEm)}
              </p>
            </div>

            <ExternalLink
              size={14}
              className="mt-0.5 shrink-0 text-muted-foreground/25 group-hover:text-primary transition-colors"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </section>
  );
}