import { useState } from 'react';
import api from '@/lib/api';
import { ClassDetails } from '@/types';
import { normalizeDate } from './useClassData';

export const useAttendance = (id: string, selectedDate: string, hasMeeting: boolean, setHasMeeting: (val: boolean) => void, setClassData: (update: (prev: ClassDetails | null) => ClassDetails | null) => void, fetchData: (silent?: boolean) => Promise<void>) => {
    const [loadingMeeting, setLoadingMeeting] = useState(false);
    const [loadingAttendance, setLoadingAttendance] = useState<Record<number, boolean>>({});

    const handleToggleMeeting = async () => {
        const newValue = !hasMeeting;
        setHasMeeting(newValue);
        setLoadingMeeting(true);
        try {
            await api.post('/catechism/meetings', { classId: parseInt(id), date: selectedDate, occurred: newValue });
            fetchData(true);
        } catch {
            setHasMeeting(!newValue);
            alert('Erro ao alterar status do encontro');
        } finally {
            setLoadingMeeting(false);
        }
    };

    const handleToggleAttendance = async (studentId: number, isPresent: boolean) => {
        setLoadingAttendance(prev => ({ ...prev, [studentId]: true }));
        try {
            await api.put('/catechism/attendance', { classId: parseInt(id), studentId, date: selectedDate, present: isPresent });

            setClassData(prev => {
                if (!prev) return prev;

                const normalizedSelectedDate = normalizeDate(selectedDate);
                const existingIndex = prev.attendances.findIndex(a => a.studentId === studentId && a.date === normalizedSelectedDate);
                const newAttendances = [...prev.attendances];

                if (existingIndex >= 0) {
                    newAttendances[existingIndex].isPresent = isPresent;
                } else {
                    newAttendances.push({
                        id: Date.now(),
                        studentId,
                        date: normalizedSelectedDate,
                        isPresent,
                        catechism_meeting_id: null
                    });
                }

                // Recalcula frequência considerando todas as datas de reunião
                const studentsWithFrequency = prev.students.map(student => {
                    const studentAttendances = newAttendances.filter(a => a.studentId === student.id);
                    const total = [...new Set(studentAttendances.map(a => a.date))].length;
                    const present = studentAttendances.filter(a => a.isPresent).length;
                    const frequency = total > 0 ? Math.round((present / total) * 100) : 0;
                    return { ...student, frequency };
                });

                return { ...prev, attendances: newAttendances, students: studentsWithFrequency };
            });
        } catch {
            alert('Erro ao marcar/corrigir presença');
        } finally {
            setLoadingAttendance(prev => ({ ...prev, [studentId]: false }));
        }
    };

    return {
        loadingMeeting,
        loadingAttendance,
        handleToggleMeeting,
        handleToggleAttendance
    };
};
