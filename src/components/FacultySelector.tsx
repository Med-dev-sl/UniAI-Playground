import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { AnimatedButton } from './ui/AnimatedButton';
import { Faculty, ProgramLevel, getFacultiesByLevel } from '@/data/courses';

interface FacultySelectorProps {
  level: ProgramLevel;
  selectedFaculty: string | null;
  onSelectFaculty: (facultyId: string) => void;
  onBack: () => void;
}

export function FacultySelector({ level, selectedFaculty, onSelectFaculty, onBack }: FacultySelectorProps) {
  const faculties = getFacultiesByLevel(level);

  const levelLabels = {
    degree: 'Degree',
    diploma: 'Diploma',
    certificate: 'Certificate'
  };

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
        <div className="inline-block px-4 py-1 rounded-full bg-electric/20 text-electric text-sm font-medium mb-4">
          {levelLabels[level]} Programme
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
          Select Your Faculty
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the faculty that best matches your area of study
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {faculties.map((faculty, index) => (
          <GlowCard
            key={faculty.id}
            onClick={() => onSelectFaculty(faculty.id)}
            selected={selectedFaculty === faculty.id}
            delay={index * 0.05}
            className="h-full"
          >
            <div className="flex flex-col h-full space-y-3">
              <div className="text-3xl">{faculty.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  {faculty.shortName}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {faculty.description}
                </p>
              </div>
              <div className="text-xs text-electric">
                {faculty.courses.filter(c => c.level === level).length} courses available
              </div>

              {selectedFaculty === faculty.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-electric flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}