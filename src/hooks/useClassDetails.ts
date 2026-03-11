// hooks/useClassDetails.ts
import { useState, useCallback, useEffect, useMemo } from 'react'
import api from '@/lib/api'
import { ClassDetails, Student, CatechismClass } from '@/types'

export const useClassDetails = (id: string) => {
  const [classData, setClassData] = useState<ClassDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10))
  const [hasMeeting, setHasMeeting] = useState(false)
  const [loadingMeeting, setLoadingMeeting] = useState(false)
  const [loadingAttendance, setLoadingAttendance] = useState<Record<number, boolean>>({})
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [editingClass, setEditingClass] = useState<CatechismClass | null>(null)
  const [loadingAction, setLoadingAction] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Normaliza data: sempre 'YYYY-MM-DD'
  const normalizeDate = (date?: string) => {
    const d = date ? new Date(date) : new Date()
    d.setHours(0, 0, 0, 0)
    return d.toISOString().slice(0, 10)
  }

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)

    try {
      // Busca dados da classe + alunos + presenças
      const classRes = await api.get(`/catechism/classes/${id}`)
      const mappedClassData: ClassDetails = {
        ...classRes.data,
        students: [...(classRes.data.catechism_students || [])].sort((a, b) => a.name.localeCompare(b.name)),
        attendances: classRes.data.attendances?.map((a: {
          id: number;
          catechism_student_id: number;
          date: string;
          present: boolean;
          catechism_meeting_id: number | null;
        }) => ({
          id: a.id,
          studentId: a.catechism_student_id,
          date: a.date.slice(0, 10),
          isPresent: a.present,
          catechism_meeting_id: a.catechism_meeting_id || null
        })) || []
      }

      // Busca todas as datas que tiveram reunião
      const meetingsRes = await api.get<{ date: string; id: number }[]>(`/catechism/meetings/all?classId=${id}`)
      const allDates = meetingsRes.data.map(m => ({ date: m.date.slice(0, 10), id: m.id }))

      // Calcula frequência para todos os alunos
      const studentsWithFrequency = mappedClassData.students.map(student => {
        const studentAttendances = mappedClassData.attendances.filter(a => a.studentId === student.id)
        const total = allDates.length
        const present = allDates.reduce((count, d) => {
          const a = studentAttendances.find(sa => sa.date === d.date)
          return count + (a?.isPresent ? 1 : 0)
        }, 0)
        const frequency = total > 0 ? Math.round((present / total) * 100) : 0
        return { ...student, frequency }
      })

      setClassData({ ...mappedClassData, students: studentsWithFrequency })

      // Verifica se a data selecionada tem reunião
      const normalizedSelectedDate = normalizeDate(selectedDate)
      const meetingOnSelected = allDates.find(d => d.date === normalizedSelectedDate)
      setHasMeeting(!!meetingOnSelected)

    } catch (err) {
    } finally {
      if (!silent) setLoading(false)
    }
  }, [id, selectedDate])

  useEffect(() => {
    fetchData(!!classData)
    setCurrentPage(1)
  }, [fetchData])

  const handleToggleMeeting = async () => {
    const newValue = !hasMeeting
    setHasMeeting(newValue)
    setLoadingMeeting(true)
    try {
      await api.post('/catechism/meetings', { classId: parseInt(id), date: selectedDate, occurred: newValue })
      fetchData(true)
    } catch {
      setHasMeeting(!newValue)
      alert('Erro ao alterar status do encontro')
    } finally {
      setLoadingMeeting(false)
    }
  }

  const handleToggleAttendance = async (studentId: number, isPresent: boolean) => {
    setLoadingAttendance(prev => ({ ...prev, [studentId]: true }))
    try {
      await api.put('/catechism/attendance', { classId: parseInt(id), studentId, date: selectedDate, present: isPresent })

      setClassData(prev => {
        if (!prev) return prev

        const normalizedSelectedDate = normalizeDate(selectedDate)
        const existingIndex = prev.attendances.findIndex(a => a.studentId === studentId && a.date === normalizedSelectedDate)
        const newAttendances = [...prev.attendances]

        if (existingIndex >= 0) {
          newAttendances[existingIndex].isPresent = isPresent
        } else {
          newAttendances.push({
            id: Date.now(),
            studentId,
            date: normalizedSelectedDate,
            isPresent,
            catechism_meeting_id: null
          })
        }

        // Recalcula frequência considerando todas as datas de reunião
        const studentsWithFrequency = prev.students.map(student => {
          const studentAttendances = newAttendances.filter(a => a.studentId === student.id)
          const total = [...new Set(studentAttendances.map(a => a.date))].length
          const present = studentAttendances.filter(a => a.isPresent).length
          const frequency = total > 0 ? Math.round((present / total) * 100) : 0
          return { ...student, frequency }
        })

        return { ...prev, attendances: newAttendances, students: studentsWithFrequency }
      })
    } catch {
      alert('Erro ao marcar/corrigir presença')
    } finally {
      setLoadingAttendance(prev => ({ ...prev, [studentId]: false }))
    }
  }

  const handleAddStudent = async (name: string, baptism: boolean, firstEucharist: boolean) => {
    setLoadingAction(true)
    try {
      await api.post('/catechism/students', { classId: parseInt(id), name, hasBaptism: baptism, hasFirstEucharist: firstEucharist })
      await fetchData(true)
    } catch {
      alert('Erro ao cadastrar aluno')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleUpdateStudent = async (student: Student) => {
    setLoadingAction(true)
    try {
      await api.put(`/catechism/students/${student.id}`, {
        name: student.name,
        hasBaptism: student.has_baptism,
        hasFirstEucharist: student.has_first_eucharist,
        status: student.status
      })
      setEditingStudent(null)
      await fetchData(true)
    } catch {
      alert('Erro ao atualizar aluno')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleRemoveStudent = async (studentId: number) => {
    if (!confirm('Deseja realmente remover este aluno?')) return
    setLoadingAction(true)
    try {
      await api.delete(`/catechism/students/${studentId}`)
      await fetchData(true)
    } catch {
      alert('Erro ao remover aluno')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleUpdateClass = async (idNum: number, name: string, year: number) => {
    setLoadingAction(true)
    try {
      await api.put(`/catechism/classes/${idNum}`, { name, year, catechistId: classData?.catechistId || 1 })
      setEditingClass(null)
      await fetchData(true)
    } catch {
      alert('Erro ao atualizar turma')
    } finally {
      setLoadingAction(false)
    }
  }

  const paginatedStudents = useMemo(() => {
    if (!classData) return []
    return classData.students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [classData, currentPage])

  const totalPages = useMemo(() => {
    if (!classData) return 0
    return Math.ceil(classData.students.length / itemsPerPage)
  }, [classData])

  return {
    details: classData,
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
    handleUpdateClass
  }
}