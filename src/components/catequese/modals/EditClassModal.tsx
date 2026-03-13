import { useState, FormEvent } from 'react';
import { CatechismClass } from '@/types';

interface EditClassModalProps {
    cls: CatechismClass | null;
    onClose: () => void;
    onSubmit: (id: number, name: string, year: number) => Promise<void>;
    loading?: boolean;
}

export const EditClassModal = ({ cls, onClose, onSubmit, loading }: EditClassModalProps) => {
    const [name, setName] = useState(cls?.name || '');
    const [year, setYear] = useState(cls?.year || new Date().getFullYear());

    if (!cls) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit(cls.id, name, year);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card dark:bg-zinc-900 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-border">
                <h2 className="text-2xl font-heading font-bold mb-6 text-primary dark:text-white">Editar Turma</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="edit-class-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nome da Turma</label>
                        <input
                            id="edit-class-name"
                            type="text"
                            required
                            className="w-full rounded-lg border border-border dark:border-zinc-700 px-3 py-2 text-foreground dark:text-white bg-pearl dark:bg-zinc-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-class-year" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Ano</label>
                        <input
                            id="edit-class-year"
                            type="number"
                            required
                            className="w-full rounded-lg border border-border dark:border-zinc-700 px-3 py-2 text-foreground dark:text-white bg-pearl dark:bg-zinc-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        />
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
                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-crimson-light transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
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
