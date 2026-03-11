import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Student, CatechismClass } from '@/types';
import { useClassData } from './class/useClassData';
import { useAttendance } from './class/useAttendance';
import { usePagination } from './utils/usePagination';

export const useClassDetails = (id: string) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
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
        fetchData
    } = useClassData(id, selectedDate);

    // Attendance Hook
    const {
        loadingMeeting,
        loadingAttendance,
        handleToggleMeeting,
        handleToggleAttendance
    } = useAttendance(id, selectedDate, hasMeeting, setHasMeeting, setClassData, fetchData);

    // Pagination Hook
    const pagination = usePagination(classData?.students || [], 10);

    // Reset page when data changes
    useEffect(() => {
        pagination.setCurrentPage(1);
    }, [classData?.id, pagination]);

    const handleAddStudent = async (name: string, baptism: boolean, firstEucharist: boolean) => {
        setLoadingAction(true);
        try {
            await api.post('/catechism/students', { classId: parseInt(id), name, hasBaptism: baptism, hasFirstEucharist: firstEucharist });
            await fetchData(true);
        } catch {
            alert('Erro ao cadastrar aluno');
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
                status: student.status
            });
            setEditingStudent(null);
            await fetchData(true);
        } catch {
            alert('Erro ao atualizar aluno');
        } finally {
            setLoadingAction(false);
        }
    };

    const handleRemoveStudent = async (studentId: number) => {
        if (!confirm('Deseja realmente remover este aluno?')) return;
        setLoadingAction(true);
        try {
            await api.delete(`/catechism/students/${studentId}`);
            await fetchData(true);
        } catch {
            alert('Erro ao remover aluno');
        } finally {
            setLoadingAction(false);
        }
    };

    const handleUpdateClass = async (idNum: number, name: string, year: number) => {
        setLoadingAction(true);
        try {
            await api.put(`/catechism/classes/${idNum}`, { name, year, catechistId: classData?.catechistId || 1 });
            setEditingClass(null);
            await fetchData(true);
        } catch {
            alert('Erro ao atualizar turma');
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
        setCurrentPage: pagination.setCurrentPage,
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
        handleUpdateClass
    };
};