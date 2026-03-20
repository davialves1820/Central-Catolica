import { useRouter } from "next/navigation";

interface DetailsHeaderProps {
  name: string;
  year: number;
  onEdit: () => void;
}

export const DetailsHeader = ({ name, year, onEdit }: DetailsHeaderProps) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <button
        type="button"
        onClick={() => router.push("/catequese")}
        className="mb-8 flex items-center text-muted-foreground hover:text-primary transition-colors group"
      >
        <svg
          className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar para turmas
      </button>

      <div className="bg-white p-4 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                Turma {year}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="p-2.5 bg-white text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-border shadow-sm hover:shadow-md"
            title="Editar Turma"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
