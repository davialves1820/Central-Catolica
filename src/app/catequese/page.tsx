"use client";

import { useCatequeseDashboard } from "@/lib/client/hooks/useCatequeseDashboard";
import { DashboardHeader } from "@/components/catequese/DashboardHeader";
import { MetricCard } from "@/components/catequese/MetricCard";
import { ClassCard } from "@/components/catequese/ClassCard";
import { CreateClassModal } from "@/components/catequese/modals/CreateClassModal";
import { EditClassModal } from "@/components/catequese/modals/EditClassModal";
import { EditStudentModal } from "@/components/catequese/modals/EditStudentModal";
import { PendingSacramentsModal } from "@/components/catequese/modals/PendingSacramentsModal";

export default function CatequeseDashboard() {
  const {
    metrics,
    loading,
    selectedYear,
    setSelectedYear,
    showModal,
    setShowModal,
    showPendingModal,
    setShowPendingModal,
    pendingStudents,
    loadingPending,
    editingStudent,
    setEditingStudent,
    editingClass,
    setEditingClass,
    currentPage,
    setCurrentPage,
    uniqueYears,
    paginatedClasses,
    totalPages,
    handleLogout,
    handleCreateClass,
    handleUpdateClass,
    handleUpdateStudent,
    fetchPendingSacraments,
  } = useCatequeseDashboard();

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          uniqueYears={uniqueYears}
          onFetchPending={fetchPendingSacraments}
          loadingPending={loadingPending}
          onNewClass={() => setShowModal(true)}
          onLogout={handleLogout}
        />

        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <MetricCard
              label="Total de Catequizandos"
              value={metrics.totalStudents}
            />
            <MetricCard
              label="Taxa de Conclusão"
              value={`${metrics.completionRate}%`}
              valueClassName="text-accent"
            />
            <MetricCard label="Turmas Ativas" value={metrics.activeClasses} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedClasses.length > 0 ? (
                paginatedClasses.map((cls, idx) => (
                  <ClassCard key={cls.id} cls={cls} onEdit={setEditingClass} index={idx} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-zinc-50/50 rounded-2xl border border-dashed border-border">
                  <p className="text-muted-foreground">
                    Nenhuma turma encontrada. Crie a primeira!
                  </p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-border disabled:opacity-50 text-muted-foreground hover:bg-white transition-colors"
                  aria-label="Página anterior"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-sm font-medium text-muted-foreground/70">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-border disabled:opacity-50 text-muted-foreground hover:bg-white transition-colors"
                  aria-label="Próxima página"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <CreateClassModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateClass}
      />

      <EditClassModal
        key={editingClass?.id}
        cls={editingClass}
        onClose={() => setEditingClass(null)}
        onSubmit={handleUpdateClass}
      />

      <PendingSacramentsModal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        students={pendingStudents}
        onEditStudent={setEditingStudent}
      />

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSubmit={async (e) => {
          e.preventDefault();
          if (editingStudent) handleUpdateStudent(editingStudent);
        }}
        setStudent={setEditingStudent}
      />
    </div>
  );
}
