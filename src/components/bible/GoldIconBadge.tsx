import { type LucideIcon } from "lucide-react";

interface GoldIconBadgeProps {
    icon: LucideIcon;
    "aria-hidden"?: boolean;
}

export function GoldIconBadge({ icon: Icon, "aria-hidden": ariaHidden = true }: GoldIconBadgeProps) {
    return (
        <div
            className="p-3 rounded-lg"
            style={{
                background: "hsl(var(--gold)/0.12)",
                border: "1px solid hsl(var(--gold)/0.25)",
            }}
            aria-hidden={ariaHidden}
        >
            <Icon className="w-5 h-5" style={{ color: "hsl(var(--gold))" }} />
        </div>
    );
}