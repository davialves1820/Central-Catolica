import { useState, useEffect } from "react";
import { CatechismClass, Student, StudentMissingSacraments } from "@/types";
import api from "@/lib/client/api";

export const useCatequeseModals = () => {
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [editingClass, setEditingClass] = useState<CatechismClass | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form States
  const [newClassName, setNewClassName] = useState("");
  const [newClassYear, setNewClassYear] = useState(new Date().getFullYear());
  const [editClassName, setEditClassName] = useState("");
  const [editClassYear, setEditClassYear] = useState(new Date().getFullYear());

  // Data States
  const [pendingStudents, setPendingStudents] = useState<
    StudentMissingSacraments[]
  >([]);
  const [loadingPending, setLoadingPending] = useState(false);

  // Update edit form when editingClass changes
  useEffect(() => {
    if (editingClass) {
      setEditClassName(editingClass.name);
      setEditClassYear(editingClass.year);
    }
  }, [editingClass]);

  const fetchPendingSacraments = async () => {
    setLoadingPending(true);
    try {
      const response = await api.get("/catechism/missing-sacraments");
      setPendingStudents(response.data);
      setShowPendingModal(true);
    } catch {
      alert("Erro ao buscar pendências");
    } finally {
      setLoadingPending(false);
    }
  };

  return {
    showModal,
    setShowModal,
    showPendingModal,
    setShowPendingModal,
    editingClass,
    setEditingClass,
    editingStudent,
    setEditingStudent,
    newClassName,
    setNewClassName,
    newClassYear,
    setNewClassYear,
    editClassName,
    setEditClassName,
    editClassYear,
    setEditClassYear,
    pendingStudents,
    loadingPending,
    fetchPendingSacraments,
  };
};
