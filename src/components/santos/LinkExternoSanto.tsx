import { PropsLinkExternoSanto } from "@/types/santos";
import { ExternalLink } from "lucide-react";

export default function LinkExternoSanto({ href }: PropsLinkExternoSanto) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full px-6 py-4 bg-transparent border border-outline-variant hover:border-primary hover:text-primary text-on-surface-variant font-label-sm transition-all group"
    >
      <span className="flex items-center gap-3">
        <ExternalLink size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
        Fonte: Wikipédia
      </span>
      <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Acessar</span>
    </a>
  );
}