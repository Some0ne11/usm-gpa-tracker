import type { Course, GradeKey, Semester } from './types';
import { gradeScale } from './types';

export const calculateGPA = (courses: Course[]): number => {
    if (courses.length === 0) return 0;
    
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = courses.reduce(
        (sum, course) => sum + (course.gradePoints * course.credits),
        0
    );
    
    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

export const calculateCGPA = (semesters: Semester[]): number => {
    const completedSemesters = semesters.filter(sem => sem.isCompleted);
    
    if (completedSemesters.length === 0) return 0;
    
    const totalCredits = completedSemesters.reduce((sum, sem) => sum + sem.totalCredits, 0);
    const totalGradePoints = completedSemesters.reduce(
        (sum, sem) => sum + (sem.gpa * sem.totalCredits),
        0
    );
    
    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

export const getGradePointsFromGrade = (grade: GradeKey): number => {
    return gradeScale[grade] ?? 0;
};
