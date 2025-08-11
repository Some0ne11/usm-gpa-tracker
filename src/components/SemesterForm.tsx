import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface SemesterFormProps {
    initialName?: string;
    initialYear?: string;
    onSave: (name: string, year: string) => void;
    onClose: () => void;
    title: string;
}

export const SemesterForm: React.FC<SemesterFormProps> = ({ 
    initialName = '', 
    initialYear = new Date().getFullYear().toString(),
    onSave, 
    onClose, 
    title 
}) => {
    const [name, setName] = useState(initialName);
    const [year, setYear] = useState(initialYear);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && year.trim()) {
            onSave(name.trim(), year.trim());
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
                            Semester Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Fall Semester, Spring 2024, Semester 1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Academic Year
                        </label>
                        <input
                            type="text"
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 2024, 2023-2024, Year 1"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >   
                            <Save className="w-4 h-4" />
                            Save
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