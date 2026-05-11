import { PropsBadgeIconeOuro } from "@/types/biblia";

export default function BadgeIconeOuro({ icon: Icon, "aria-hidden": ariaHidden = true }: PropsBadgeIconeOuro) {
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