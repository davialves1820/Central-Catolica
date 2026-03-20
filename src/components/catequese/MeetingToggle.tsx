import { CalendarCheck, CalendarX, Check } from "lucide-react";

interface MeetingToggleProps {
  hasMeeting: boolean;
  onToggle: () => void;
  loading: boolean;
}

export const MeetingToggle = ({
  hasMeeting,
  onToggle,
  loading,
}: MeetingToggleProps) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 mb-10 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
      <div className="flex items-center gap-5">
        <div
          className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
            hasMeeting 
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm" 
              : "bg-red-50 text-red-600 border border-red-100 shadow-sm"
          }`}
        >
          {hasMeeting ? <CalendarCheck size={28} /> : <CalendarX size={28} />}
        </div>
        <div>
          <p className="text-lg font-heading font-bold text-zinc-900">
            Houve encontro nesta data?
          </p>
          <p className="text-sm font-body text-muted-foreground mt-1">
            {hasMeeting
              ? "A frequência dos catequizandos será registrada."
              : "As presenças não serão contabilizadas para este dia."}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={loading}
        className={`min-w-[180px] px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 border-2 ${
          hasMeeting
            ? "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500 hover:border-emerald-500 shadow-emerald-200/50"
            : "bg-white border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
        } ${loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : hasMeeting ? (
          <Check size={18} />
        ) : null}
        {hasMeeting ? "Sim, teve encontro" : "Não teve encontro"}
      </button>
    </div>
  );
};
