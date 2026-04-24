"use client";

import { Users, CheckCircle2, AlertCircle } from "lucide-react";

interface User {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
}

interface CoordinationSidebarProps {
  users: User[];
  coordinatorIds: string[];
  isAdmin: boolean;
  onToggle: (userId: string) => void;
}

export default function CoordinationSidebar({ users, coordinatorIds, isAdmin, onToggle }: CoordinationSidebarProps) {
  return (
    <aside className="lg:w-80 space-y-10">
      {/* Coordinators Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Users size={16} />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-foreground">
              Coordenação
            </h3>
            {!isAdmin && (
              <p className="text-[10px] text-muted-foreground uppercase">
                Leitura apenas
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {users.map((user) => (
            <label
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all border ${coordinatorIds.includes(user.id)
                ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                : "bg-white border-border/50"
                } ${isAdmin ? "cursor-pointer hover:border-primary/30" : "cursor-default"}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all ${coordinatorIds.includes(user.id)
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-pearl text-primary/60"
                  }`}
              >
                {user.full_name?.charAt(0) || user.email.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${coordinatorIds.includes(user.id) ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {user.full_name || user.email.split("@")[0]}
                </p>
                <p className="text-[10px] text-muted-foreground truncate uppercase">
                  {user.role}
                </p>
              </div>
              <input
                type="checkbox"
                disabled={!isAdmin}
                checked={coordinatorIds.includes(user.id)}
                onChange={() => isAdmin && onToggle(user.id)}
                className="hidden"
              />
              {coordinatorIds.includes(user.id) && (
                <CheckCircle2 size={16} className="text-primary shrink-0" />
              )}
            </label>
          ))}
        </div>
        <div className="mt-6 p-4 bg-pearl rounded-2xl border border-primary/10 text-primary/80">
          <p className="text-[10px] uppercase font-bold tracking-widest text-center">
            {coordinatorIds.length} selecionado{coordinatorIds.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-primary/95 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8 animate-pulse" />
        <h4 className="font-heading font-bold mb-4 flex items-center gap-2">
          <AlertCircle size={18} className="text-accent" />
          Observação
        </h4>
        <p className="text-xs font-body text-white/80 leading-relaxed italic">
          &quot;Todas as alterações salvos aqui são refletidas instantaneamente na página pública da paróquia.&quot;
        </p>
        <div className="mt-6 flex justify-end">
          <div className="w-8 h-1 bg-accent/40 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
