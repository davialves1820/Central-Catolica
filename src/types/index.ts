import { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  full_name: string | null;
  email: string;
  role: "USER" | "COORDENADOR" | "PADRE" | "ADMIN";
}

export interface Pastoral {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description: string;
  icon?: LucideIcon;
  logoUrl?: string;
  location?: string;
  email?: string;
  instagram?: string;
  image_url?: string;
  meeting_location?: string;
  coordinators?: {
    name: string;
    phone?: string;
  }[];
}

export interface CatechismClass {
  id: string;
  name: string;
  year: number;
  catechistId: string;
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

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  isPresent: boolean;
  catechism_meeting_id?: string | null;
}

export interface ClassDetails {
  id: string;
  name: string;
  year: number;
  catechistId: string;
  students: Student[];
  attendances: Attendance[];
}

export interface ParishEvent {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  meeting_location?: string;
  type: "EVENT" | "NEWS" | "PASTORAL" | "REGISTRATION";
  is_active: boolean;
  pastoral_id?: string;
  pastoral?: {
    name: string;
    slug: string;
  };
  author?: {
    full_name: string;
  };
}
