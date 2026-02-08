import { motion } from 'framer-motion';
import { GraduationCap, Award, FileCheck, LogOut } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { AnimatedButton } from './ui/AnimatedButton';
import { ProgramLevel } from '@/data/courses';
import { useAuth } from '@/hooks/useAuth';

interface LevelSelectorProps {
  selectedLevel?: ProgramLevel | null;
  onSelectLevel: (level: ProgramLevel) => void;
  onLogout?: () => void;
}

const levels = [
  {
    id: 'degree' as ProgramLevel,
    title: 'Degree Programme',
    subtitle: '4-5 Years Duration',
    icon: GraduationCap,
    description: 'Bachelor\'s degree programmes for comprehensive academic education',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'diploma' as ProgramLevel,
    title: 'Diploma Programme',
    subtitle: '2-3 Years Duration',
    icon: Award,
    description: 'Higher and Ordinary Diploma programmes for specialized training',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'certificate' as ProgramLevel,
    title: 'Certificate Programme',
    subtitle: '1-3 Years Duration',
    icon: FileCheck,
    description: 'Technical and Vocational certificates for practical skills',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export function LevelSelector({ selectedLevel, onSelectLevel, onLogout }: LevelSelectorProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    if (onLogout) onLogout();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header with logout */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          <p className="text-sm text-muted-foreground mb-2">Logged in as</p>
          <p className="font-medium text-foreground">{user?.email}</p>
        </motion.div>
        <AnimatedButton 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </AnimatedButton>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
          Choose Your Academic Level
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select your programme level to be matched with an AI assistant specialized in your field of study
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {levels.map((level, index) => (
          <GlowCard
            key={level.id}
            onClick={() => onSelectLevel(level.id)}
            selected={selectedLevel === level.id}
            delay={index * 0.1}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} p-0.5`}>
                <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                  <level.icon className="w-8 h-8 text-foreground" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                  {level.title}
                </h3>
                <p className="text-sm text-electric font-medium mb-2">
                  {level.subtitle}
                </p>
                <p className="text-sm text-muted-foreground">
                  {level.description}
                </p>
              </div>

              {selectedLevel === level.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-electric flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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