import { useState, useRef } from "react";
import api from "@/lib/client/api";
import { ClassDetails } from "@/types";
import { normalizeDate } from "./useClassData";

export const useAttendance = (
  id: string,
  selectedDate: string,
  hasMeeting: boolean,
  setHasMeeting: (val: boolean) => void,
  allMeetingDates: string[],
  setAllMeetingDates: (dates: string[]) => void,
  setClassData: (
    update: (prev: ClassDetails | null) => ClassDetails | null,
  ) => void,
  fetchData: (silent?: boolean) => Promise<void>,
) => {
  const [loadingMeeting, setLoadingMeeting] = useState(false);
  // useRef para guard síncrono: evita double-tap no mobile (closure do state é stale)
  const meetingInFlight = useRef(false);
  const [loadingAttendance, setLoadingAttendance] = useState<
    Record<string, boolean>
  >({});

  const handleToggleMeeting = async () => {
    // Guard síncrono — não depende do ciclo de re-render do React
    if (meetingInFlight.current) return;
    meetingInFlight.current = true;

    const newValue = !hasMeeting;
    const normalizedSelectedDate = normalizeDate(selectedDate);

    // Atualização otimista imediata
    setHasMeeting(newValue);
    setLoadingMeeting(true);

    try {
      await api.post("/catechism/meetings", {
        classId: id,
        date: selectedDate,
        occurred: newValue,
      });

      // Atualiza lista de datas localmente
      if (newValue) {
        if (!allMeetingDates.includes(normalizedSelectedDate)) {
          setAllMeetingDates([...allMeetingDates, normalizedSelectedDate]);
        }
      } else {
        setAllMeetingDates(allMeetingDates.filter((d) => d !== normalizedSelectedDate));
      }

      // NÃO chama fetchData aqui — evita que o servidor retorne dado desatualizado
      // e sobrescreva o setHasMeeting otimista. O próximo fetchData natural
      // (troca de data ou navegação) irá sincronizar.
    } catch {
      // Reverte em caso de erro
      setHasMeeting(!newValue);
      alert("Erro ao alterar status do encontro");
    } finally {
      setLoadingMeeting(false);
      meetingInFlight.current = false;
    }
  };

  const handleToggleAttendance = async (
    studentId: string,
    isPresent: boolean,
  ) => {
    setLoadingAttendance((prev) => ({ ...prev, [studentId]: true }));
    try {
      await api.put("/catechism/attendance", {
        classId: id,
        studentId,
        date: selectedDate,
        present: isPresent,
      });

      setClassData((prev) => {
        if (!prev) return prev;

        const normalizedSelectedDate = normalizeDate(selectedDate);
        const existingIndex = prev.attendances.findIndex(
          (a) => a.studentId === studentId && a.date === normalizedSelectedDate,
        );
        const newAttendances = [...prev.attendances];

        if (existingIndex >= 0) {
          newAttendances[existingIndex].isPresent = isPresent;
        } else {
          newAttendances.push({
            id: Date.now().toString(),
            studentId,
            date: normalizedSelectedDate,
            isPresent,
            catechism_meeting_id: null,
          });
        }

        // Recalcula frequência considerando todas as datas de reunião oficiais
        const studentsWithFrequency = prev.students.map((student) => {
          const studentAttendances = newAttendances.filter(
            (a) => a.studentId === student.id,
          );
          const total = allMeetingDates.length;
          const presentCount = allMeetingDates.reduce((count, d) => {
            const a = studentAttendances.find((sa) => sa.date === d);
            return count + (a?.isPresent ? 1 : 0);
          }, 0);

          const frequency = total > 0 ? Math.round((presentCount / total) * 100) : 0;
          return { ...student, frequency };
        });

        return {
          ...prev,
          attendances: newAttendances,
          students: studentsWithFrequency,
        };
      });
    } catch {
      alert("Erro ao marcar/corrigir presença");
    } finally {
      setLoadingAttendance((prev) => ({ ...prev, [studentId]: false }));
    }
  };

  return {
    loadingMeeting,
    loadingAttendance,
    handleToggleMeeting,
    handleToggleAttendance,
  };
};
