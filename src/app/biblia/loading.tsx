"use client";



export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="font-body text-muted-foreground animate-pulse text-lg">
        Carregando conteúdo...
      </p>
    </div>
  );
}
