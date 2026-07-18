import { Lock } from "lucide-react";

export function AvisoPrivacidade() {
  return (
    <div
      className="flex items-start gap-2.5 rounded-xl border border-[#c9a84c]/25 bg-white px-4 py-3"
      role="note"
    >
      <Lock size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
      <p className="font-body-sm text-on-surface-variant">
        <strong className="text-on-surface">Nada é salvo. Nada é enviado.</strong> Tudo fica só no
        seu aparelho, e some automaticamente ao trocar de aba ou sair desta página.
      </p>
    </div>
  );
}
