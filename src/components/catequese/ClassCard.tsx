import Link from 'next/link';
import { CatechismClass } from '@/types';

interface ClassCardProps {
    cls: CatechismClass;
    onEdit: (cls: CatechismClass) => void;
}

export const ClassCard = ({ cls, onEdit }: ClassCardProps) => {
    return (
        <div className="group p-6 bg-card dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary/10 dark:bg-indigo-900/20 text-primary dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {cls.year}
                </span>
                <button
                    type="button"
                    onClick={() => onEdit(cls)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    title="Editar Turma"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            </div>
            <Link href={`/catequese/${cls.id}`}>
                <h3 className="text-xl font-heading font-bold text-primary dark:text-white group-hover:text-amber-600 transition-colors">
                    {cls.name}
                </h3>
                <div className="mt-6 flex items-center text-sm font-body text-muted-foreground">
                    <span>Ver detalhes</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};
