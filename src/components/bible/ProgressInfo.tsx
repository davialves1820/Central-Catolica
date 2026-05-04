import { Clock } from "lucide-react";

interface ProgressInfoProps {
    timestamp: number;
}

export function ProgressInfo({ timestamp }: ProgressInfoProps) {
    const timeAgo = new Date(timestamp).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
                Continuar de onde parou
            </h3>
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-body mt-0.5">
                <Clock className="w-3 h-3" aria-hidden="true" />
                Lido em {timeAgo}
            </p>
        </div>
    );
}