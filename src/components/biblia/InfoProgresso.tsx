import { PropsInfoProgresso } from "@/types/biblia";
import { Clock } from "lucide-react";

export default function InfoProgresso({ dataHora }: PropsInfoProgresso) {
    const timeAgo = new Date(dataHora).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div>
            <h3 className="font-heading text-lg font-medium text-foreground">
                Continuar Leitura
            </h3>
            <p className="text-muted-foreground/60 flex items-center gap-1.5 text-[10px] font-body font-bold uppercase tracking-widest mt-1">
                <Clock className="w-3 h-3 opacity-50" aria-hidden="true" />
                Lido em {timeAgo}
            </p>
        </div>
    );
}