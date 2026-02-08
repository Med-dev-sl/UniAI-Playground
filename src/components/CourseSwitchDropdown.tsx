import { useState } from 'react';
import { ChevronDown, BookOpen, GraduationCap, Award, Medal } from 'lucide-react';
import { faculties, getCourseById, getFacultyById, type ProgramLevel } from '@/data/courses';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

interface CourseSwitchDropdownProps {
  currentCourseId: string;
  onSwitchCourse: (courseId: string) => void;
}

const levelIcons: Record<ProgramLevel, typeof GraduationCap> = {
  degree: GraduationCap,
  diploma: Award,
  certificate: Medal,
};

const levelLabels: Record<ProgramLevel, string> = {
  degree: 'Degree',
  diploma: 'Diploma',
  certificate: 'Certificate',
};

export function CourseSwitchDropdown({ currentCourseId, onSwitchCourse }: CourseSwitchDropdownProps) {
  const currentCourse = getCourseById(currentCourseId);
  const currentFaculty = currentCourse ? getFacultyById(currentCourse.faculty) : null;

  const levels: ProgramLevel[] = ['degree', 'diploma', 'certificate'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm
            bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50
            transition-colors focus:outline-none focus:ring-2 focus:ring-ring truncate max-w-[140px] sm:max-w-[200px]"
        >
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{currentCourse?.shortName || 'Switch'}</span>
          <ChevronDown className="w-3 h-3 flex-shrink-0 opacity-60" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[280px] sm:w-[320px] max-h-[60vh] overflow-y-auto bg-popover border border-border z-[100]"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Switch Course
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {levels.map((level) => {
          const LevelIcon = levelIcons[level];
          const facultiesWithLevel = faculties.filter(f =>
            f.courses.some(c => c.level === level)
          );

          if (facultiesWithLevel.length === 0) return null;

          return (
            <DropdownMenuSub key={level}>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <LevelIcon className="w-4 h-4 text-electric" />
                <span>{levelLabels[level]} Programmes</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  className="w-[260px] sm:w-[300px] max-h-[50vh] overflow-y-auto bg-popover border border-border z-[110]"
                >
                  {facultiesWithLevel.map((faculty) => {
                    const courses = faculty.courses.filter(c => c.level === level);
                    if (courses.length === 0) return null;

                    return (
                      <div key={faculty.id}>
                        <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span>{faculty.icon}</span>
                          <span className="truncate">{faculty.shortName}</span>
                        </DropdownMenuLabel>
                        {courses.map((course) => (
                          <DropdownMenuItem
                            key={course.id}
                            onClick={() => onSwitchCourse(course.id)}
                            className={`text-xs cursor-pointer ${
                              course.id === currentCourseId
                                ? 'bg-electric/20 text-electric font-medium'
                                : ''
                            }`}
                          >
                            <span className="truncate">{course.shortName}</span>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                      </div>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          );
        })}

        {/* Current course info */}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground">
            Current: <span className="text-foreground font-medium">{currentCourse?.shortName}</span>
          </p>
          <p className="text-[10px] text-muted-foreground">
            {currentFaculty?.shortName} • {currentCourse?.level}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
