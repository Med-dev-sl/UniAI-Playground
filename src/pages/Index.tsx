import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { UserMenu } from '@/components/UserMenu';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { getCourseById, getFacultyById } from '@/data/courses';
import { useCourse } from '@/contexts/CourseContext';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, isRegistrationComplete } = useProfile();
  const { setCourseState } = useCourse();
  const navigate = useNavigate();

  const [showChat, setShowChat] = useState(false);

  // If user is logged in and registration is complete, go to chat
  useEffect(() => {
    if (!authLoading && !profileLoading && user && isRegistrationComplete && profile?.course_id) {
      setCourseState({
        level: (profile.academic_level as any) || null,
        faculty: profile.faculty_id,
        facultyId: profile.faculty_id,
        course: profile.course_id,
        courseId: profile.course_id,
      });
      setShowChat(true);
    }
  }, [authLoading, profileLoading, user, isRegistrationComplete, profile]);

  // If user logged in but registration incomplete, redirect to auth
  useEffect(() => {
    if (!authLoading && !profileLoading && user && !isRegistrationComplete) {
      navigate('/auth');
    }
  }, [authLoading, profileLoading, user, isRegistrationComplete]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const course = profile?.course_id ? getCourseById(profile.course_id) : null;
  const faculty = course ? getFacultyById(course.faculty) : null;

  const loading = authLoading || profileLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric" />
      </div>
    );
  }

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
          <button onClick={() => setShowChat(false)} className="focus:outline-none">
            <img src="/logo.png" alt="Platform Logo" className="w-40 h-40" />
          </button>
          
          <div className="flex items-center gap-4">
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
          {!showChat && !user && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection onGetStarted={handleGetStarted} />
            </motion.div>
          )}

          {showChat && user && profile?.course_id && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="container max-w-4xl mx-auto px-4 py-4"
            >
              <ChatInterface
                courseId={profile.course_id}
                onBack={() => setShowChat(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
