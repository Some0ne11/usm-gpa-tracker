import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { Course } from '../utils/types';
import { getGradePointsFromGrade } from '../utils/calculation';

interface CourseEditFormProps {
    course: Course;
    onSaveCourse: (course: Course) => void;
    onClose: () => void;
}

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

export const CourseEditForm: React.FC<CourseEditFormProps> = ({ course, onSaveCourse, onClose }) => {
    const [formData, setFormData] = useState({
        name: course.name,
        code: course.code,
        credits: course.credits,
        grade: course.grade
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCourse: Course = {
            ...course,
            name: formData.name,
            code: formData.code,
            credits: formData.credits,
            grade: formData.grade,
            gradePoints: getGradePointsFromGrade(formData.grade)
        };

        onSaveCourse(updatedCourse);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Edit Course</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >   
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Introduction to Computer Science"
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course Code
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., CS101"
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Credits
                        </label>
                        <input
                            type="number"
                            required
                            min="1"
                            max="6"
                            value={formData.credits}
                            onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Grade
                        </label>
                        <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value as typeof formData.grade })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {grades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );  
};  