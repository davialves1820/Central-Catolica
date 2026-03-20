import { Student, StudentMissingSacraments } from "@/types";

interface PendingSacramentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentMissingSacraments[];
  onEditStudent: (student: Student) => void;
}

export const PendingSacramentsModal = ({
  isOpen,
  onClose,
  students,
  onEditStudent,
}: PendingSacramentsModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl border border-border max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-primary text-center">
            Catequizandos com Pendências Sacramentais
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Fechar modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          {students.length > 0 ? (
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-zinc-50 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">Turma</th>
                  <th className="py-3 px-4">Pendência</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-foreground">
                      {student.name}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {student.class.name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {!student.has_baptism && (
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            Batismo
                          </span>
                        )}
                        {!student.has_first_eucharist && (
                          <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            1ª Eucaristia
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() =>
                          onEditStudent({
                            id: student.id,
                            name: student.name,
                            has_baptism: student.has_baptism,
                            has_first_eucharist: student.has_first_eucharist,
                            status: student.status,
                          })
                        }
                        className="text-primary hover:text-accent font-bold text-xs uppercase transition-colors"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-12 text-muted-foreground">
              Nenhum catequizando com pendência encontrada.
            </p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 border border-border rounded-xl text-foreground font-semibold hover:bg-zinc-50 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
