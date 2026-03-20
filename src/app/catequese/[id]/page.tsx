"use client";

import { use } from "react";
import { useClassDetails } from "@/lib/client/hooks/useClassDetails";
import { DetailsHeader } from "@/components/catequese/DetailsHeader";
import { MeetingToggle } from "@/components/catequese/MeetingToggle";
import { DatePicker } from "@/components/catequese/DatePicker";
import { StudentListItem } from "@/components/catequese/StudentListItem";
import { AddStudentSidebar } from "@/components/catequese/AddStudentSidebar";
import { EditStudentModal } from "@/components/catequese/modals/EditStudentModal";
import { EditClassModal } from "@/components/catequese/modals/EditClassModal";

export default function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    details,
    loading,
    selectedDate,
    setSelectedDate,
    hasMeeting,
    loadingMeeting,
    loadingAttendance,
    editingStudent,
    setEditingStudent,
    editingClass,
    setEditingClass,
    currentPage,
    setCurrentPage,
    paginatedStudents,
    totalPages,
    loadingAction,
    handleToggleMeeting,
    handleToggleAttendance,
    handleAddStudent,
    handleRemoveStudent,
    handleUpdateStudent,
    handleUpdateClass,
  } = useClassDetails(id);

  if (loading || !details) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Normaliza a data selecionada para comparação com attendances
  const normalizedSelectedDate = new Date(selectedDate);
  normalizedSelectedDate.setHours(0, 0, 0, 0);
  const selectedDateStr = normalizedSelectedDate.toISOString().slice(0, 10);

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <DetailsHeader
          name={details.name}
          year={details.year}
          onEdit={() => setEditingClass(details)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm min-h-[600px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Lista de Catequizandos
                </h2>
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>

              <MeetingToggle
                hasMeeting={hasMeeting}
                onToggle={handleToggleMeeting}
                loading={loadingMeeting}
              />

              <div className="divide-y divide-border/40 flex-1">
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => {
                    // Busca a presença do aluno para a data selecionada
                    const attendance = details.attendances.find(
                      (a) =>
                        a.date === selectedDateStr &&
                        a.studentId === student.id,
                    );

                    const isPresent = !!attendance?.isPresent;

                    return (
                      <StudentListItem
                        key={student.id}
                        student={student}
                        isPresent={isPresent}
                        hasMeeting={hasMeeting} // habilita/desabilita botão
                        onToggleAttendance={() =>
                          handleToggleAttendance(student.id, !isPresent)
                        }
                        onRemove={() => handleRemoveStudent(student.id)}
                        onEdit={() => setEditingStudent(student)}
                        loadingAttendance={
                          loadingAttendance[student.id] || false
                        }
                      />
                    );
                  })
                ) : (
                  <div className="py-16 text-center bg-zinc-50/50 rounded-2xl border border-dashed border-border mt-4">
                    <p className="text-muted-foreground font-body">
                      Nenhum catequizando nesta turma.
                    </p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 pt-8 border-t border-zinc-100 flex justify-center items-center gap-4">
                  <button
                    aria-label="Página anterior"
                    title="Página anterior"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border disabled:opacity-50 text-muted-foreground hover:bg-zinc-50 transition-colors"
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
                  <span className="text-sm font-medium text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    aria-label="Próxima página"
                    title="Próxima página"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border disabled:opacity-50 text-muted-foreground hover:bg-zinc-50 transition-colors"
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
            </div>
          </div>

          <div className="space-y-6">
            <AddStudentSidebar
              onSubmit={handleAddStudent}
              loading={loadingAction}
            />
          </div>
        </div>
      </div>

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSubmit={async (e) => {
          e.preventDefault();
          if (editingStudent) handleUpdateStudent(editingStudent);
        }}
        setStudent={setEditingStudent}
        loading={loadingAction}
      />

      <EditClassModal
        key={editingClass?.id}
        cls={editingClass}
        onClose={() => setEditingClass(null)}
        onSubmit={(idNum, name, year) => handleUpdateClass(idNum, name, year)}
        loading={loadingAction}
      />
    </div>
  );
}
