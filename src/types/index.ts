import { LucideIcon } from "lucide-react";

export interface Pastoral {
    id: string;
    name: string;
    tag: string;
    description: string;
    icon: LucideIcon;
    logoUrl?: string;
    location?: string;
    email?: string;
    instagram?: string;
    coordinators?: {
        name: string;
        phone?: string;
    }[];
}

export interface CatechismClass {
    id: number;
    name: string;
    year: number;
    catechistId: number;
}

export interface Student {
    id: number
    name: string
    has_baptism: boolean
    has_first_eucharist: boolean
    status: string
    attendances?: Attendance[]
    frequency?: number
}

export interface StudentMissingSacraments {
    id: number;
    name: string;
    class_id: number;
    has_baptism: boolean;
    has_first_eucharist: boolean;
    status: string;
    catechism_classes: {
        id: number;
        name: string;
        year: number;
        catechist_id: number;
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
    id: number;
    studentId: number;
    date: string;
    isPresent: boolean;
    catechism_meeting_id?: number | null;
}

export interface ClassDetails {
    id: number;
    name: string;
    year: number;
    catechistId: number;
    students: Student[];
    attendances: Attendance[];
}
