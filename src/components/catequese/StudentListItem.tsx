import { User, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Student } from "@/types";

interface StudentListItemProps {
  student: Student;
  isPresent: boolean;
  hasMeeting: boolean;
  onToggleAttendance: () => void;
  onRemove: () => void;
  onEdit: () => void;
  loadingAttendance?: boolean;
}

export const StudentListItem = ({
  student,
  isPresent,
  hasMeeting,
  onToggleAttendance,
  onRemove,
  onEdit,
  loadingAttendance,
}: StudentListItemProps) => {
  return (
    <div className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-zinc-50/50 px-4 -mx-4 rounded-xl transition-all">
      <div className="flex items-start gap-4 min-w-0 flex-1">
        <div className="shrink-0 w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors border border-zinc-100">
          <User size={20} />
        </div>
        
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-heading font-bold text-zinc-900 cursor-pointer hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-none"
              onClick={onEdit}
            >
              {student.name}
            </span>
            <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full shrink-0">
              {student.frequency}% FREQ.
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {student.has_baptism ? (
              <span className="text-[9px] bg-primary/5 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-primary/10">
                Batizado
              </span>
            ) : (
              <span className="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-red-100">
                Falta Batismo
              </span>
            )}
            {student.has_first_eucharist ? (
              <span className="text-[9px] bg-accent/5 text-accent px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-accent/10">
                1ª Eucaristia
              </span>
            ) : (
              <span className="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-red-100">
                Falta 1ª Euc.
              </span>
            )}
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border ${
                student.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : student.status === "COMPLETED"
                    ? "bg-primary/5 text-primary border-primary/10"
                    : "bg-zinc-50 text-muted-foreground border-zinc-200"
              }`}
            >
              {student.status === "ACTIVE"
                ? "Ativo"
                : student.status === "COMPLETED"
                  ? "Concluído"
                  : "Inativo"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all sm:opacity-0 sm:group-hover:opacity-100"
          title="Remover da Turma"
        >
          <Trash2 size={18} />
        </button>
        
        <button
          type="button"
          onClick={onToggleAttendance}
          disabled={!hasMeeting || loadingAttendance}
          className={`min-w-[120px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
            !hasMeeting
              ? "bg-zinc-50 text-muted-foreground/50 border-border cursor-not-allowed opacity-50"
              : isPresent
                ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-200/50"
                : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
          } ${loadingAttendance ? "opacity-50" : ""}`}
        >
          {loadingAttendance ? (
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPresent ? (
            <CheckCircle size={14} />
          ) : (
            <XCircle size={14} />
          )}
          {isPresent ? "Presente" : "Ausente"}
        </button>
      </div>
    </div>
  );
};
