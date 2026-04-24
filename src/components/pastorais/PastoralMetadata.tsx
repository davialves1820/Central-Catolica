import { Mail, MapPin, Users, Plus, Edit } from "lucide-react";
import Link from "next/link";

interface Coordinator {
  name: string;
  email?: string;
}

interface PastoralMetadataProps {
  pastoral: {
    slug: string;
    meeting_location?: string | null;
    coordinators?: Coordinator[];
  };
  canEdit: boolean;
}

export default function PastoralMetadata({ pastoral, canEdit }: PastoralMetadataProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Coordination Recap */}
        {pastoral.coordinators && pastoral.coordinators.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users size={16} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground">Coordenação</h3>
            </div>
            <div className="space-y-3">
              {pastoral.coordinators.slice(0, 2).map((coord, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-body text-sm font-bold text-foreground/80 leading-none">
                    {coord.name}
                  </p>
                  {coord.email && (
                    <a
                      href={`mailto:${coord.email}`}
                      className="font-body text-xs text-primary hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <Mail size={12} />
                      {coord.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Recap */}
        {pastoral.meeting_location && (
          <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin size={16} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-foreground">
                Encontros
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground italic">
              {pastoral.meeting_location}
            </p>
          </div>
        )}
      </div>

      {canEdit && (
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
          <Link
            href={`/pastorais/${pastoral.slug}/events/new`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-accent font-body font-bold transition-all shadow-lg shadow-primary/10"
          >
            <Plus size={18} /> Novo Evento
          </Link>
          <Link
            href={`/pastorais/${pastoral.slug}/edit`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-primary/20 text-primary hover:bg-primary hover:text-white font-body font-bold transition-all"
          >
            <Edit size={18} /> Editar
          </Link>
        </div>
      )}
    </div>
  );
}
