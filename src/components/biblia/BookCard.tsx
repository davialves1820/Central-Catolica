import { PropsBookCard } from "@/types/biblia";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function BookCard({ name, chapters }: PropsBookCard) {
  return (
    <Link
      href={`/biblia/${encodeURIComponent(name)}/1`}
      className="bg-card border border-primary/5 p-8 rounded-2xl transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 group relative overflow-hidden h-full flex flex-col justify-center min-h-[140px]"
    >
      <div className="relative z-10 pr-6">
        <h4 className="font-heading text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors break-words leading-tight">
          {name}
        </h4>
        <p className="font-body text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
          {chapters} Capítulos
        </p>
      </div>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-300">
        <ChevronRight className="w-5 h-5 text-primary" />
      </div>
    </Link>
  );
}
