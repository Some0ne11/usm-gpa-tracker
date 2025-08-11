import jsPDF from 'jspdf';
import type { Semester } from './types';
import { calculateCGPA } from './calculation';

export const generateSemesterReport = (semester: Semester): void => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Academic Performance Report', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`${semester.name} - ${semester.year}`, pageWidth / 2, 35, { align: 'center' });
    
    // Semester Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Semester Summary:', 20, 55);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`GPA: ${semester.gpa.toFixed(2)}`, 20, 70);
    doc.text(`Total Credits: ${semester.totalCredits}`, 20, 80);
    doc.text(`Total Courses: ${semester.courses.length}`, 20, 90);
    
    // Course Details Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Course Details:', 20, 110);
    
    // Table Headers
    const headers = ['Course Code', 'Course Name', 'Credits', 'Grade', 'Grade Points'];
    const startY = 125;
    let currentY = startY;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Draw header row
    doc.text(headers[0], 20, currentY);
    doc.text(headers[1], 60, currentY);
    doc.text(headers[2], 120, currentY);
    doc.text(headers[3], 140, currentY);
    doc.text(headers[4], 165, currentY);
    
    // Draw header line
    doc.line(15, currentY + 2, 195, currentY + 2);
    currentY += 10;
    
    // Course rows
    doc.setFont('helvetica', 'normal');
    semester.courses.forEach((course) => {
        doc.text(course.code, 20, currentY);
        doc.text(course.name.substring(0, 25), 60, currentY);
        doc.text(course.credits.toString(), 120, currentY);
        doc.text(course.grade, 140, currentY);
        doc.text(course.gradePoints.toFixed(1), 165, currentY);
        currentY += 8;
    });

    // Footer
    doc.line(15, currentY + 5, 195, currentY + 5);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, currentY + 15);

    doc.save(`${semester.name}_${semester.year}_Report.pdf`);
};

export const generateCGPAReport = (semesters: Semester[]): void => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const cgpa = calculateCGPA(semesters);
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Cumulative Academic Report', pageWidth / 2, 20, { align: 'center' });
    
    // Overall Summary
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Performance Summary:', 20, 45);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`CGPA: ${cgpa.toFixed(2)}`, 20, 60);
    
    const completedSemesters = semesters.filter(sem => sem.isCompleted);
    const totalCredits = completedSemesters.reduce((sum, sem) => sum + sem.totalCredits, 0);
    const totalCourses = completedSemesters.reduce((sum, sem) => sum + sem.courses.length, 0);
    
    doc.text(`Total Credits Completed: ${totalCredits}`, 20, 75);
    doc.text(`Total Courses Completed: ${totalCourses}`, 20, 90);
    doc.text(`Semesters Completed: ${completedSemesters.length}`, 20, 105);
    
    // Semester-wise Performance
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Semester-wise Performance:', 20, 125);
    
    let currentY = 140;
    doc.setFontSize(10);
    
    // Table headers
    doc.setFont('helvetica', 'bold');
    doc.text('Semester', 20, currentY);
    doc.text('Year', 80, currentY);
    doc.text('GPA', 110, currentY);
    doc.text('Credits', 140, currentY);
    doc.text('Courses', 170, currentY);
    
    doc.line(15, currentY + 2, 195, currentY + 2);
    currentY += 10;
    
    // Semester rows
    doc.setFont('helvetica', 'normal');
    completedSemesters.forEach((semester) => {
        doc.text(semester.name, 20, currentY);
        doc.text(semester.year, 80, currentY);
        doc.text(semester.gpa.toFixed(2), 110, currentY);
        doc.text(semester.totalCredits.toString(), 140, currentY);
        doc.text(semester.courses.length.toString(), 170, currentY);
        currentY += 8;
    });

    // Footer
    doc.line(15, currentY + 5, 195, currentY + 5);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, currentY + 15);

    doc.save(`CGPA_Report_${new Date().getFullYear()}.pdf`);
};