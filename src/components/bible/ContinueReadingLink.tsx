import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ContinueReadingLinkProps {
    bookName: string;
    chapter: number;
}

export function ContinueReadingLink({ bookName, chapter }: ContinueReadingLinkProps) {
    return (
        <Link
            href={`/biblia/${encodeURIComponent(bookName)}/${chapter}`}
            aria-label={`Continuar lendo ${bookName}, capítulo ${chapter}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-bold text-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
            }}
        >
            <span>
                {bookName}, Cap. {chapter}
            </span>
            <ChevronRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
            />
        </Link>
    );
}