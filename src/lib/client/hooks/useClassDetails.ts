import { useState, useEffect } from "react";
import api from "@/lib/client/api";
import { Student, CatechismClass } from "@/types";
import { useClassData, getLocalDateStr } from "./class/useClassData";
import { useAttendance } from "./class/useAttendance";
import { usePagination } from "./utils/usePagination";

export const useClassDetails = (id: string) => {
  // getLocalDateStr usa componentes locais (evita shift de UTC em produção)
  const [selectedDate, setSelectedDate] = useState(getLocalDateStr);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingClass, setEditingClass] = useState<CatechismClass | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

  // Data Hook
  const {
    classData,
    setClassData,
    loading,
    hasMeeting,
    setHasMeeting,
    allMeetingDates,
    setAllMeetingDates,
    fetchData,
  } = useClassData(id, selectedDate);

  // Attendance Hook
  const {
    loadingMeeting,
    loadingAttendance,
    handleToggleMeeting,
    handleToggleAttendance,
  } = useAttendance(
    id,
    selectedDate,
    hasMeeting,
    setHasMeeting,
    allMeetingDates,
    setAllMeetingDates,
    setClassData,
    fetchData,
  );

  // Pagination Hook
  const { setCurrentPage, ...pagination } = usePagination(
    classData?.students || [],
    10,
  );

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [classData?.id, setCurrentPage]);

  const handleAddStudent = async (
    name: string,
    baptism: boolean,
    firstEucharist: boolean,
  ) => {
    setLoadingAction(true);
    try {
      await api.post("/catechism/students", {
        classId: id,
        name,
        hasBaptism: baptism,
        hasFirstEucharist: firstEucharist,
      });
      await fetchData(true);
    } catch {
      alert("Erro ao cadastrar aluno");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdateStudent = async (student: Student) => {
    setLoadingAction(true);
    try {
      await api.put(`/catechism/students/${student.id}`, {
        name: student.name,
        hasBaptism: student.has_baptism,
        hasFirstEucharist: student.has_first_eucharist,
        status: student.status,
      });
      setEditingStudent(null);
      await fetchData(true);
    } catch {
      alert("Erro ao atualizar aluno");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm("Deseja realmente remover este aluno?")) return;
    setLoadingAction(true);
    try {
      await api.delete(`/catechism/students/${studentId}`);
      await fetchData(true);
    } catch {
      alert("Erro ao remover aluno");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdateClass = async (
    idNum: string,
    name: string,
    year: number,
  ) => {
    setLoadingAction(true);
    try {
      await api.put(`/catechism/classes/${idNum}`, {
        name,
        year,
        catechistId: classData?.catechistId || 1,
      });
      setEditingClass(null);
      await fetchData(true);
    } catch {
      alert("Erro ao atualizar turma");
    } finally {
      setLoadingAction(false);
    }
  };

  return {
    // Data
    details: classData,
    loading,
    selectedDate,
    setSelectedDate,
    hasMeeting,

    // Pagination
    currentPage: pagination.currentPage,
    setCurrentPage,
    paginatedStudents: pagination.paginatedData,
    totalPages: pagination.totalPages,

    // Status
    loadingMeeting,
    loadingAttendance,
    loadingAction,

    // Selection / Editing
    editingStudent,
    setEditingStudent,
    editingClass,
    setEditingClass,

    // Actions
    handleToggleMeeting,
    handleToggleAttendance,
    handleAddStudent,
    handleRemoveStudent,
    handleUpdateStudent,
    handleUpdateClass,
  };
};
