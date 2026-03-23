import { useState, useCallback, useEffect } from "react";
import api from "@/lib/client/api";
import { ClassDetails } from "@/types";

// Normaliza data para 'YYYY-MM-DD' SEM passar por objeto Date quando já é YYYY-MM-DD.
// CRÍTICO: new Date('2026-03-23') é UTC midnight — em UTC-3 getDate() retorna 22 (bug!).
export const normalizeDate = (date?: string): string => {
  if (!date) {
    // Hoje em hora local
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  // Já está em formato correto — retorna direto sem conversão
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  // ISO string com hora (ex: '2026-03-23T00:00:00.000Z') — fatia os primeiros 10 chars
  return date.slice(0, 10);
};

// Retorna a data local atual no formato 'YYYY-MM-DD'
export const getLocalDateStr = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const useClassData = (id: string, selectedDate: string) => {
  const [classData, setClassData] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMeeting, setHasMeeting] = useState(false);
  const [allMeetingDates, setAllMeetingDates] = useState<string[]>([]);

  const fetchData = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);

      try {
        // Busca dados da classe + alunos + presenças
        const classRes = await api.get(`/catechism/classes/${id}`);
        const mappedClassData: ClassDetails = {
          ...classRes.data,
          students: [...(classRes.data.students || [])].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
          attendances:
            classRes.data.attendances?.map(
              (a: {
                id: string;
                catechism_student_id: string;
                date: string;
                present: boolean;
                catechism_meeting_id: string | null;
              }) => ({
                id: a.id,
                studentId: a.catechism_student_id,
                date: a.date.slice(0, 10),
                isPresent: a.present,
                catechism_meeting_id: a.catechism_meeting_id || null,
              }),
            ) || [],
        };

        // Busca todas as datas que tiveram reunião
        const meetingsRes = await api.get<{ date: string; id: string }[]>(
          `/catechism/meetings/all?classId=${id}`,
        );
        const allDates = meetingsRes.data.map((m) => m.date.slice(0, 10));
        setAllMeetingDates(allDates);

        // Calcula frequência para todos os alunos
        const studentsWithFrequency = mappedClassData.students.map(
          (student) => {
            const studentAttendances = mappedClassData.attendances.filter(
              (a) => a.studentId === student.id,
            );
            const total = allDates.length;
            const present = allDates.reduce((count, d) => {
              const a = studentAttendances.find((sa) => sa.date === d);
              return count + (a?.isPresent ? 1 : 0);
            }, 0);
            const frequency =
              total > 0 ? Math.round((present / total) * 100) : 0;
            return { ...student, frequency };
          },
        );

        setClassData({ ...mappedClassData, students: studentsWithFrequency });

        // Verifica se a data selecionada tem reunião
        const normalizedSelectedDate = normalizeDate(selectedDate);
        const meetingOnSelected = allDates.find(
          (d) => d === normalizedSelectedDate,
        );
        setHasMeeting(!!meetingOnSelected);
      } catch (error) {
        console.error("Error fetching class data:", error);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [id, selectedDate],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classData,
    setClassData,
    loading,
    hasMeeting,
    setHasMeeting,
    allMeetingDates,
    setAllMeetingDates,
    fetchData,
  };
};
