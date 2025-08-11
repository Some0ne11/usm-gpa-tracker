import React from 'react';
import { Trash2, BookOpen, Edit } from 'lucide-react';
import type { Course } from '../utils/types';

interface CourseListProps {
    courses: Course[];
    onDeleteCourse: (courseId: string) => void;
    onEditCourse: (course: Course) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, onDeleteCourse, onEditCourse }) => {
    if (courses.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No courses added yet. Start by adding your first course!</p>
            </div>
        );
    }   

    return (
        <div className="space-y-3">
            {courses.map((course) => (
                <div key={course.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-medium text-gray-900">{course.name}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {course.code}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Credits: {course.credits}</span>
                            <span>Grade: <span className="font-semibold">{course.grade}</span></span>
                            <span>Points: {course.gradePoints.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                        <button
                            onClick={() => onEditCourse(course)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit Course"
                        >   
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDeleteCourse(course.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Course"
                        >   
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );  
};  