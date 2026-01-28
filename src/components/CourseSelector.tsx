import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { AnimatedButton } from './ui/AnimatedButton';
import { Course, ProgramLevel, getCoursesByFacultyAndLevel, getFacultyById } from '@/data/courses';

interface CourseSelectorProps {
  level: ProgramLevel;
  facultyId: string;
  selectedCourse: string | null;
  onSelectCourse: (courseId: string) => void;
  onBack: () => void;
}

export function CourseSelector({ level, facultyId, selectedCourse, onSelectCourse, onBack }: CourseSelectorProps) {
  const courses = getCoursesByFacultyAndLevel(facultyId, level);
  const faculty = getFacultyById(facultyId);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <AnimatedButton variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </AnimatedButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-electric/20 text-electric text-sm font-medium mb-4">
          <span>{faculty?.icon}</span>
          <span>{faculty?.shortName}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
          Select Your Course
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your specific programme to be connected with a specialized AI assistant
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {courses.map((course, index) => (
          <GlowCard
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            selected={selectedCourse === course.id}
            delay={index * 0.03}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-display font-semibold text-foreground leading-tight">
                  {course.shortName}
                </h3>
                {selectedCourse === course.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-electric flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-cool">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}