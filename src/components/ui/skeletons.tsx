import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-lg animate-pulse", className)}
            style={{ background: "hsl(var(--secondary))" }} />
    );
}

export function LiturgiaSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
                <Shimmer className="h-6 w-28 mx-auto rounded-full" />
                <Shimmer className="h-12 w-80 mx-auto" />
                <Shimmer className="h-4 w-40 mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Shimmer className="h-7 w-48" />
                            <div className="rounded-2xl border border-border p-8 space-y-3" style={{ background: "hsl(var(--card))" }}>
                                <Shimmer className="h-3 w-32" />
                                <Shimmer className="h-6 w-64" />
                                {[...Array(6)].map((_, j) => <Shimmer key={j} className="h-4 w-full" />)}
                                <Shimmer className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-5">
                    {[1, 2].map((i) => (
                        <div key={i} className="rounded-2xl border border-border p-6 space-y-4" style={{ background: "hsl(var(--card))" }}>
                            <Shimmer className="h-5 w-40" />
                            {[1, 2, 3].map((j) => (
                                <div key={j} className="space-y-2">
                                    <Shimmer className="h-3 w-24" />
                                    <Shimmer className="h-4 w-full" />
                                    <Shimmer className="h-4 w-4/5" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BibleChapterSkeleton() {
    return (
        <div className="rounded-2xl border border-border overflow-hidden animate-in fade-in duration-300" style={{ background: "hsl(var(--card))" }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                    <Shimmer className="h-8 w-8 rounded-lg" />
                    <div className="space-y-1"><Shimmer className="h-4 w-24" /><Shimmer className="h-3 w-32" /></div>
                </div>
                <Shimmer className="h-8 w-8 rounded-lg" />
            </div>
            <div className="px-5 py-12 sm:px-14 sm:py-16 max-w-2xl mx-auto">
                <div className="text-center space-y-3 mb-10">
                    <Shimmer className="h-3 w-20 mx-auto" />
                    <Shimmer className="h-8 w-40 mx-auto" />
                </div>
                <div className="space-y-1">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="flex gap-4 px-3 py-2">
                            <Shimmer className="h-4 w-5 shrink-0 mt-1" />
                            <div className="flex-1 space-y-1">
                                <Shimmer className="h-4 w-full" />
                                {i % 3 === 0 && <Shimmer className="h-4 w-3/4" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-border">
                <Shimmer className="h-9 w-24 rounded-xl" />
                <Shimmer className="h-4 w-16" />
                <Shimmer className="h-9 w-24 rounded-xl" />
            </div>
        </div>
    );
}

export function BibleIndexSkeleton() {
    return (
        <div className="space-y-14 animate-in fade-in duration-300">
            <Shimmer className="h-20 w-full rounded-xl" />
            <div className="space-y-4">
                <Shimmer className="h-6 w-40" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[...Array(8)].map((_, i) => <Shimmer key={i} className="h-24 rounded-xl" />)}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                    <div key={i} className="rounded-3xl border border-border p-6 space-y-3" style={{ background: "hsl(var(--card))" }}>
                        <Shimmer className="h-6 w-40 mb-5" />
                        <div className="grid grid-cols-3 gap-1">
                            {[...Array(24)].map((_, j) => <Shimmer key={j} className="h-9 rounded-xl" />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CalendarioSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-300">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-border overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <div className="space-y-2"><Shimmer className="h-7 w-48" /><Shimmer className="h-4 w-36" /></div>
                            <div className="flex gap-2"><Shimmer className="h-9 w-16 rounded-full" /><Shimmer className="h-9 w-20 rounded-full" /></div>
                        </div>
                        <div className="grid grid-cols-7 p-2 gap-1">
                            {[...Array(35)].map((_, i) => <Shimmer key={i} className="h-24 rounded-xl" />)}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <Shimmer className="h-64 rounded-3xl" />
                    <Shimmer className="h-32 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}