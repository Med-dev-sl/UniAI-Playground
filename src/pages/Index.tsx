import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { HeroSection } from '@/components/HeroSection';
import { LevelSelector } from '@/components/LevelSelector';
import { FacultySelector } from '@/components/FacultySelector';
import { CourseSelector } from '@/components/CourseSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { UserMenu } from '@/components/UserMenu';
import { ProgramLevel } from '@/data/courses';
import { ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type Step = 'hero' | 'level' | 'faculty' | 'course' | 'chat';

const Index = () => {
  const [step, setStep] = useState<Step>('hero');
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLevelSelect = (level: ProgramLevel) => {
    setSelectedLevel(level);
  };

  const handleFacultySelect = (facultyId: string) => {
    setSelectedFaculty(facultyId);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const goToNextStep = () => {
    switch (step) {
      case 'hero':
        setStep('level');
        break;
      case 'level':
        if (selectedLevel) setStep('faculty');
        break;
      case 'faculty':
        if (selectedFaculty) setStep('course');
        break;
      case 'course':
        if (selectedCourse) {
          // Require login before chat
          if (!user) {
            navigate('/auth');
            return;
          }
          setStep('chat');
        }
        break;
    }
  };

  const goBack = () => {
    switch (step) {
      case 'faculty':
        setStep('level');
        setSelectedFaculty(null);
        break;
      case 'course':
        setStep('faculty');
        setSelectedCourse(null);
        break;
      case 'chat':
        setStep('course');
        break;
    }
  };

  const resetToStart = () => {
    setStep('hero');
    setSelectedLevel(null);
    setSelectedFaculty(null);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={resetToStart} className="focus:outline-none">
            <img src="/logo.png" alt="Platform Logo" className="w-40 h-40" />
          </button>
          
          <div className="flex items-center gap-4">
            {step !== 'hero' && step !== 'chat' && (
              <div className="flex items-center gap-2">
                {['level', 'faculty', 'course'].map((s, i) => (
                  <div
                    key={s}
                    className={`w-2 h-2 rounded-full transition-all ${
                      step === s 
                        ? 'w-8 bg-electric' 
                        : ['level', 'faculty', 'course'].indexOf(step) > i
                          ? 'bg-electric/50'
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <AnimatedButton 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </AnimatedButton>
              )
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-8">
        <AnimatePresence mode="wait">
          {step === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection onGetStarted={() => setStep('level')} />
            </motion.div>
          )}

          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="container max-w-6xl mx-auto px-4 py-12"
            >
              <LevelSelector
                selectedLevel={selectedLevel}
                onSelectLevel={handleLevelSelect}
              />
              
              {selectedLevel && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-8"
                >
                  <AnimatedButton onClick={goToNextStep}>
                    Continue to Faculty Selection
                    <ArrowRight className="w-4 h-4" />
                  </AnimatedButton>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'faculty' && selectedLevel && (
            <motion.div
              key="faculty"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="container max-w-7xl mx-auto px-4 py-12"
            >
              <FacultySelector
                level={selectedLevel}
                selectedFaculty={selectedFaculty}
                onSelectFaculty={handleFacultySelect}
                onBack={goBack}
              />
              
              {selectedFaculty && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-8"
                >
                  <AnimatedButton onClick={goToNextStep}>
                    Continue to Course Selection
                    <ArrowRight className="w-4 h-4" />
                  </AnimatedButton>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'course' && selectedLevel && selectedFaculty && (
            <motion.div
              key="course"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="container max-w-5xl mx-auto px-4 py-12"
            >
              <CourseSelector
                level={selectedLevel}
                facultyId={selectedFaculty}
                selectedCourse={selectedCourse}
                onSelectCourse={handleCourseSelect}
                onBack={goBack}
              />
              
              {selectedCourse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-2 mt-8"
                >
                  <AnimatedButton onClick={goToNextStep}>
                    {user ? 'Start Chat with AI Assistant' : 'Sign In to Chat'}
                    <ArrowRight className="w-4 h-4" />
                  </AnimatedButton>
                  {!user && (
                    <p className="text-sm text-muted-foreground">
                      Sign in required to access AI chat
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'chat' && selectedCourse && user && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="container max-w-4xl mx-auto px-4 py-4"
            >
              <ChatInterface
                courseId={selectedCourse}
                onBack={goBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
