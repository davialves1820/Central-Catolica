"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div
          className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "hsl(var(--primary)) transparent transparent transparent" }}
        />
      </div>
      <p className="font-body text-muted-foreground animate-pulse text-sm tracking-wider">
        Carregando…
      </p>
    </div>
  );
}