// Create a type of all possible grade keys
export type GradeKey = keyof typeof gradeScale;

export interface Course {
    id: string;
    name: string;
    code: string;
    credits: number;
    grade: GradeKey;
    gradePoints: number;
}

export interface Semester {
    id: string;
    name: string;
    year: string;
    courses: Course[];
    gpa: number;
    totalCredits: number;
    isCompleted: boolean;
}

export const gradeScale = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
} as const;