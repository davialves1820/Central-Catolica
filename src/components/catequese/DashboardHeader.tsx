"use client"

interface DashboardHeaderProps {
    selectedYear: string;
    onYearChange: (year: string) => void;
    uniqueYears: number[];
    onFetchPending: () => void;
    loadingPending: boolean;
    onNewClass: () => void;
    onLogout: () => void;
}

export const DashboardHeader = ({
    selectedYear,
    onYearChange,
    uniqueYears,
    onFetchPending,
    loadingPending,
    onNewClass,
    onLogout
}: DashboardHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
                <h1 className="text-4xl font-heading font-extrabold text-primary dark:text-white tracking-tight">
                    Catequese
                </h1>
                <p className="text-muted-foreground font-body mt-2">
                    Gerencie suas turmas e presenças de forma simples.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col">
                    <label htmlFor="year-select" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Filtrar por ano
                    </label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => onYearChange(e.target.value)}
                        className="px-4 py-3 bg-card dark:bg-zinc-900 border border-border dark:border-zinc-700 text-foreground font-semibold rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none"
                    >
                        <option value="all">Todos os anos</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year.toString()}>{year}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={onFetchPending}
                    disabled={loadingPending}
                    className={`px-6 py-3 border border-border dark:border-zinc-700 text-foreground font-semibold rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all flex items-center gap-2 ${loadingPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loadingPending ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    )}
                    Relatório de Pendências
                </button>
                <button
                    type="button"
                    onClick={onLogout}
                    className="px-6 py-3 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                </button>
                <button
                    type="button"
                    onClick={onNewClass}
                    className="px-6 py-3 bg-primary hover:bg-crimson-light text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20"
                >
                    Nova Turma
                </button>
            </div>
        </div>
    );
};
