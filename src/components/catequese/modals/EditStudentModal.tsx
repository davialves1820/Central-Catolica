import { FormEvent } from 'react';
import { Student } from '@/types';

interface EditStudentModalProps {
    student: Student | null;
    onClose: () => void;
    onSubmit: (e: FormEvent) => Promise<void>;
    setStudent: (student: Student | null) => void;
    loading?: boolean;
}

export const EditStudentModal = ({ student, onClose, onSubmit, setStudent, loading }: EditStudentModalProps) => {
    if (!student) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Editar Catequizando</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="edit-student-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nome Completo</label>
                        <input
                            id="edit-student-name"
                            type="text"
                            required
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-zinc-900 dark:text-white dark:bg-zinc-800"
                            value={student.name ?? ""}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="edit-student-baptism" className="flex items-center gap-3 cursor-pointer group">
                            <input
                                id="edit-student-baptism"
                                type="checkbox"
                                className="h-5 w-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                                checked={student.has_baptism ?? false}
                                onChange={(e) => setStudent({ ...student, has_baptism: e.target.checked })}
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Possui Batismo</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                id="edit-student-eucharist"
                                type="checkbox"
                                className="h-5 w-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                                checked={student.has_first_eucharist ?? false}
                                onChange={(e) => setStudent({ ...student, has_first_eucharist: e.target.checked })}
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Possui 1ª Eucaristia</span>
                        </label>

                        <div>
                            <label htmlFor="edit-student-status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
                            <select
                                id="edit-student-status"
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                value={student.status ?? "ACTIVE"}
                                onChange={(e) => setStudent({ ...student, status: e.target.value })}
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
                            className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
