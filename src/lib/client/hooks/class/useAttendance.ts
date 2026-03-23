import { useState } from "react";
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
  const [loadingAttendance, setLoadingAttendance] = useState<
    Record<string, boolean>
  >({});

  const handleToggleMeeting = async () => {
    if (loadingMeeting) return;
    
    const newValue = !hasMeeting;
    const normalizedSelectedDate = normalizeDate(selectedDate);
    
    setHasMeeting(newValue);
    setLoadingMeeting(true);
    
    try {
      await api.post("/catechism/meetings", {
        classId: id,
        date: selectedDate,
        occurred: newValue,
      });

      // Atualiza lista de datas localmente para evitar race condition
      if (newValue) {
        if (!allMeetingDates.includes(normalizedSelectedDate)) {
          setAllMeetingDates([...allMeetingDates, normalizedSelectedDate]);
        }
      } else {
        setAllMeetingDates(allMeetingDates.filter(d => d !== normalizedSelectedDate));
      }

      fetchData(true);
    } catch {
      setHasMeeting(!newValue);
      alert("Erro ao alterar status do encontro");
    } finally {
      setLoadingMeeting(false);
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
