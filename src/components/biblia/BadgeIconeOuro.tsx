import { PropsBadgeIconeOuro } from "@/types/biblia";

export default function BadgeIconeOuro({ icon: Icon, "aria-hidden": ariaHidden = true }: PropsBadgeIconeOuro) {
    return (
        <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10"
            aria-hidden={ariaHidden}
        >
            <Icon className="w-6 h-6 text-primary" />
        </div>
    );
}