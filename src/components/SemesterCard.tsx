import React from 'react';
import { Download, Edit, Trash2, BookOpen, Settings } from 'lucide-react';
import type { Semester } from '../utils/types';
import { generateSemesterReport } from '../utils/pdfGenerator';

interface SemesterCardProps {
    semester: Semester;
    onEdit: (semester: Semester) => void;
    onEditInfo: (semester: Semester) => void;
    onDelete: (semesterId: string) => void;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({ semester, onEdit, onEditInfo, onDelete }) => {
    const handleDownloadReport = () => {
        generateSemesterReport(semester);
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{semester.name}</h3>
                    <p className="text-sm text-gray-600">{semester.year}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadReport}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors hover:scale-105"
                        title="Download Report"
                    >   
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEditInfo(semester)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors hover:scale-105"
                        title="Edit Semester Info"
                    >   
                        <Settings className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(semester)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors hover:scale-105 ring-2 ring-transparent hover:ring-yellow-300"
                        title="Edit Courses"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(semester.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors hover:scale-105"
                        title="Delete Semester"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">GPA</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{semester.gpa.toFixed(2)}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-green-800">Credits</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{semester.totalCredits}</p>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Courses:</span> {semester.courses.length}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                        semester.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {semester.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                </p>
            </div>
        </div>
    );
};  