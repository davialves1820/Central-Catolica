import { ToolbarButtonProps } from "@/types/bible";

export function ToolbarButton({ onClick, active, label, children }: ToolbarButtonProps) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            aria-pressed={active}
            className="p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={
                active
                    ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                    : undefined
            }
        >
            {children}
        </button>
    );
}