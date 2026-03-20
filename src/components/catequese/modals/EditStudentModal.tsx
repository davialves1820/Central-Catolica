import { FormEvent } from "react";
import { Student } from "@/types";

interface EditStudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  setStudent: (student: Student | null) => void;
  loading?: boolean;
}

export const EditStudentModal = ({
  student,
  onClose,
  onSubmit,
  setStudent,
  loading,
}: EditStudentModalProps) => {
  if (!student) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-border">
        <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
          Editar Catequizando
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="edit-student-name"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Nome Completo
            </label>
            <input
              id="edit-student-name"
              type="text"
              required
              className="w-full rounded-lg border border-border px-3 py-2 text-zinc-900 bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={student.name ?? ""}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <label
              htmlFor="edit-student-baptism"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                id="edit-student-baptism"
                type="checkbox"
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary accent-primary"
                checked={student.has_baptism ?? false}
                onChange={(e) =>
                  setStudent({ ...student, has_baptism: e.target.checked })
                }
              />
              <span className="text-sm text-muted-foreground">
                Possui Batismo
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                id="edit-student-eucharist"
                type="checkbox"
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary accent-primary"
                checked={student.has_first_eucharist ?? false}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    has_first_eucharist: e.target.checked,
                  })
                }
              />
              <span className="text-sm text-muted-foreground">
                Possui 1ª Eucaristia
              </span>
            </label>

            <div>
              <label
                htmlFor="edit-student-status"
                className="block text-sm font-medium text-muted-foreground mb-2"
              >
                Status
              </label>
              <select
                id="edit-student-status"
                className="w-full rounded-lg border border-border px-3 py-2 bg-white text-zinc-900"
                value={student.status ?? "ACTIVE"}
                onChange={(e) =>
                  setStudent({ ...student, status: e.target.value })
                }
              >
                <option value="ACTIVE">Ativo</option>
                <option value="COMPLETED">Concluído</option>
                <option value="DROPPED">Desistiu</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-zinc-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-crimson-light transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
