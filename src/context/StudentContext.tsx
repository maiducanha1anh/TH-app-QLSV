import React, {createContext, useContext, useState, useCallback} from 'react';
import {Student} from '../types/student';
import {sampleStudents, generateId} from '../data/sampleStudents';

interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({children}: {children: React.ReactNode}) {
  const [students, setStudents] = useState<Student[]>(sampleStudents);

  const addStudent = useCallback((data: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...data,
      id: generateId(),
    };
    setStudents(prev => [newStudent, ...prev]);
  }, []);

  const updateStudent = useCallback((id: string, data: Omit<Student, 'id'>) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? {...data, id} : s)),
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  }, []);

  const getStudentById = useCallback(
    (id: string) => {
      return students.find(s => s.id === id);
    },
    [students],
  );

  return (
    <StudentContext.Provider
      value={{students, addStudent, updateStudent, deleteStudent, getStudentById}}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents(): StudentContextType {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
