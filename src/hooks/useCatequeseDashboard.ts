import { signOut, useSession } from 'next-auth/react';
import api from '@/lib/api';
import { Student } from '@/types';
import { useCatequeseData } from './dashboard/useCatequeseData';
import { useCatequeseModals } from './dashboard/useCatequeseModals';
import { usePagination } from './utils/usePagination';

export const useCatequeseDashboard = () => {
    const { data: session } = useSession();

    // Data Hook
    const {
        classes,
        metrics,
        loading,
        selectedYear,
        setSelectedYear,
        fetchData,
        uniqueYears,
        filteredClasses
    } = useCatequeseData();

    // Modals Hook
    const modals = useCatequeseModals();

    // Pagination Hook
    const pagination = usePagination(filteredClasses, 10);

    const handleLogout = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleCreateClass = async (name: string, year: number) => {
        try {
            await api.post('/catechism', {
                name,
                year,
                catechistId: session?.user?.id ? parseInt(session.user.id) : 1
            });
            modals.setShowModal(false);
            fetchData(true);
        } catch {
            alert('Erro ao criar turma');
        }
    };

    const handleUpdateClass = async (id: number, name: string, year: number) => {
        try {
            await api.put(`/catechism/classes/${id}`, {
                name,
                year,
                catechistId: modals.editingClass?.catechistId || (session?.user?.id ? parseInt(session.user.id) : 1)
            });
            modals.setEditingClass(null);
            fetchData(true);
        } catch {
            alert('Erro ao atualizar turma');
        }
    };

    const handleUpdateStudent = async (student: Student) => {
        try {
            await api.put(`/catechism/students/${student.id}`, {
                name: student.name,
                hasBaptism: student.has_baptism,
                hasFirstEucharist: student.has_first_eucharist,
                status: student.status,
            });
            modals.setEditingStudent(null);
            if (modals.showPendingModal) {
                modals.fetchPendingSacraments();
            }
            fetchData(true);
        } catch {
            alert('Erro ao atualizar aluno');
        }
    };

    return {
        // Data
        classes,
        metrics,
        loading,
        selectedYear,
        setSelectedYear,
        uniqueYears,

        // Pagination
        currentPage: pagination.currentPage,
        setCurrentPage: pagination.setCurrentPage,
        itemsPerPage: pagination.itemsPerPage,
        paginatedClasses: pagination.paginatedData,
        totalPages: pagination.totalPages,

        // Modals & Forms
        ...modals,

        // Actions
        handleLogout,
        handleCreateClass,
        handleUpdateClass,
        handleUpdateStudent,
        fetchData
    };
};
