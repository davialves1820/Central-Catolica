import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl bg-card border border-border/60 rounded-3xl shadow-sm px-8 py-14 md:px-16 md:py-16 text-center">
                <p className="font-heading italic text-primary/80 text-sm tracking-[0.15em] mb-6">
                    Pagina Non Inventa
                </p>

                <div className="flex items-center justify-center gap-4 mb-10">
                    <span className="h-px w-10 bg-primary/40" />
                    <h1 className="font-heading text-primary text-6xl md:text-7xl">
                        404
                    </h1>
                    <span className="h-px w-10 bg-primary/40" />
                </div>

                <p className="font-heading italic text-on-surface text-2xl md:text-3xl leading-relaxed mb-6">
                    &ldquo;Se um homem tem cem ovelhas, e uma delas se perde, não deixa
                    ele as noventa e nove para procurar aquela que se perdeu?&rdquo;
                </p>

                <p className="text-outline text-sm tracking-widest mb-10">
                    — MT 18, 12
                </p>

                <p className="font-body text-on-surface-variant leading-relaxed max-w-xl mx-auto mb-10">
                    Esta página não foi encontrada. Como a ovelha da parábola, talvez
                    esteja em outro lugar, ou nunca tenha existido.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-foreground text-background px-8 py-3.5 rounded-xl font-body font-bold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    Voltar ao Início
                </Link>
            </div>
        </div>
    );
}
