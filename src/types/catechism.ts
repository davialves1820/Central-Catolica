export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  isPresent: boolean;
  catechism_meeting_id?: string | null;
}

export interface Student {
  id: string;
  name: string;
  has_baptism: boolean;
  has_first_eucharist: boolean;
  status: string;
  attendances?: Attendance[];
  frequency?: number;
}

export interface CatechismClass {
  id: string;
  name: string;
  year: number;
  catechistId: string;
}

export interface StudentMissingSacraments {
  id: string;
  name: string;
  class_id: string;
  has_baptism: boolean;
  has_first_eucharist: boolean;
  status: string;
  class: {
    id: string;
    name: string;
    year: number;
    catechist_id: string;
  };
}

export interface CatechismMetrics {
  studentsByYear: Array<{
    year: number;
    total: number;
  }>;
  totalStudents: number;
  completionRate: number;
  activeClasses: number;
}

export interface ClassDetails {
  id: string;
  name: string;
  year: number;
  catechistId: string;
  students: Student[];
  attendances: Attendance[];
}
