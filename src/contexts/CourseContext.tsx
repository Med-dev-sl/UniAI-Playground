import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProgramLevel } from '@/data/courses';

interface CourseState {
  level: ProgramLevel | null;
  faculty: string | null;
  facultyId: string | null;
  course: string | null;
  courseId: string | null;
}

interface CourseContextType {
  courseState: CourseState;
  setCourseState: (state: CourseState) => void;
  isInChat: boolean;
  clearCourse: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'uniai_course_state';

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courseState, setCourseStateInternal] = useState<CourseState>({
    level: null,
    faculty: null,
    facultyId: null,
    course: null,
    courseId: null,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCourseStateInternal(parsed);
      } catch (err) {
        console.error('Failed to parse stored course state:', err);
      }
    }
  }, []);

  const setCourseState = (state: CourseState) => {
    setCourseStateInternal(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const clearCourse = () => {
    const emptyState: CourseState = {
      level: null,
      faculty: null,
      facultyId: null,
      course: null,
      courseId: null,
    };
    setCourseStateInternal(emptyState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isInChat = Boolean(courseState.courseId && courseState.level && courseState.facultyId);

  return (
    <CourseContext.Provider value={{ courseState, setCourseState, isInChat, clearCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
