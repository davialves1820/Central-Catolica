"use client";

export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-primary/80 rounded-b-3xl px-4 py-20 text-center space-y-4">
        <div className="w-40 h-5 bg-white/20 rounded-full mx-auto" />
        <div className="w-72 h-12 bg-white/20 rounded-2xl mx-auto" />
        <div className="w-56 h-4 bg-white/10 rounded-full mx-auto" />
        <div className="w-48 h-11 bg-white/10 rounded-full mx-auto mt-4" />
      </div>

      <div className="container mx-auto px-4 py-12 space-y-10 max-w-5xl">
        {/* Progress card skeleton */}
        <div className="h-20 bg-white rounded-2xl border border-border shadow-sm" />

        {/* Featured strip skeleton */}
        <div className="space-y-4">
          <div className="w-40 h-4 bg-slate-200 rounded-full" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-2xl border border-border" />
            ))}
          </div>
        </div>

        {/* Testaments skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1].map((col) => (
            <div key={col} className="bg-white rounded-3xl border border-border p-6 space-y-3">
              <div className="h-5 w-40 bg-slate-200 rounded-full mb-4" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="h-8 bg-slate-100 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}