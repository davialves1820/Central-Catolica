import { useState, FormEvent } from "react";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, year: number) => Promise<void>;
}

export const CreateClassModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateClassModalProps) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(name, year);
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-border">
        <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
          Criar Nova Turma
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="class-name"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Nome da Turma
            </label>
            <input
              id="class-name"
              type="text"
              required
              className="w-full rounded-lg border border-border px-3 py-2 text-zinc-900 bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: São Thomás de Aquino"
            />
          </div>
          <div>
            <label
              htmlFor="class-year"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Ano
            </label>
            <input
              id="class-year"
              type="number"
              required
              className="w-full rounded-lg border border-border px-3 py-2 text-zinc-900 bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
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
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-crimson-light transition-all shadow-lg shadow-primary/20"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
