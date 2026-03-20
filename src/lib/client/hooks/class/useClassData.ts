import { useState, useCallback, useEffect } from "react";
import api from "@/lib/client/api";
import { ClassDetails } from "@/types";

// Normaliza data: sempre 'YYYY-MM-DD'
export const normalizeDate = (date?: string) => {
  const d = date ? new Date(date) : new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

export const useClassData = (id: string, selectedDate: string) => {
  const [classData, setClassData] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMeeting, setHasMeeting] = useState(false);

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
        const allDates = meetingsRes.data.map((m) => ({
          date: m.date.slice(0, 10),
          id: m.id,
        }));

        // Calcula frequência para todos os alunos
        const studentsWithFrequency = mappedClassData.students.map(
          (student) => {
            const studentAttendances = mappedClassData.attendances.filter(
              (a) => a.studentId === student.id,
            );
            const total = allDates.length;
            const present = allDates.reduce((count, d) => {
              const a = studentAttendances.find((sa) => sa.date === d.date);
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
          (d) => d.date === normalizedSelectedDate,
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
    fetchData,
  };
};
