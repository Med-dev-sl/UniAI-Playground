import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Eye, EyeOff, Sparkles, GraduationCap, Building2, BookOpen } from 'lucide-react';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProgramLevel, faculties, getFacultiesByLevel, getCoursesByFacultyAndLevel } from '@/data/courses';

type AuthStep = 'auth' | 'university' | 'level' | 'faculty' | 'course' | 'complete';

const ETU_ID = '1cca84bd-3ce0-40bf-9f05-d2df2a855709';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Registration steps state
  const [step, setStep] = useState<AuthStep>('auth');
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // After signup, move to university step; after login, check profile
  useEffect(() => {
    if (user && step === 'auth' && !isLogin) {
      setStep('university');
    }
  }, [user, step, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        // Check if profile is complete
        const { data: profile } = await supabase
          .from('profiles')
          .select('course_id, faculty_id, academic_level, university_id')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id || '')
          .maybeSingle();

        if (profile?.course_id && profile?.faculty_id && profile?.academic_level) {
          toast({ title: "Welcome back! 🎓", description: "Redirecting to your AI tutor." });
          navigate('/');
        } else {
          // Need to complete registration
          setStep('university');
        }
      } else {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({ title: "Account created! 🎉", description: "Let's set up your academic profile." });
        // useEffect will handle moving to next step
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || 'An error occurred', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    if (!user || !selectedLevel || !selectedFaculty || !selectedCourse) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          university_id: ETU_ID,
          academic_level: selectedLevel,
          faculty_id: selectedFaculty,
          course_id: selectedCourse,
          preferred_level: selectedLevel,
          preferred_faculty: selectedFaculty,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: "Profile complete! 🎓", description: "Welcome to UniAI Playground!" });
      navigate('/');
    } catch (error: any) {
      toast({ title: "Error", description: error.message || 'Failed to save profile', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const levelOptions = [
    { id: 'degree' as ProgramLevel, title: 'Degree', subtitle: '4-5 Years', icon: GraduationCap },
    { id: 'diploma' as ProgramLevel, title: 'Diploma', subtitle: '2-3 Years', icon: BookOpen },
    { id: 'certificate' as ProgramLevel, title: 'Certificate', subtitle: '1-3 Years', icon: GraduationCap },
  ];

  const availableFaculties = selectedLevel ? getFacultiesByLevel(selectedLevel) : [];
  const availableCourses = selectedLevel && selectedFaculty 
    ? getCoursesByFacultyAndLevel(selectedFaculty, selectedLevel) 
    : [];

  const inputClasses = "w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50";

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-6">
      {['auth', 'university', 'level', 'faculty', 'course'].map((s, i) => {
        const steps: AuthStep[] = ['auth', 'university', 'level', 'faculty', 'course'];
        const currentIndex = steps.indexOf(step);
        return (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? 'w-8 bg-electric' : i < currentIndex ? 'w-2 bg-electric/50' : 'w-2 bg-muted'
            }`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4">
      <FloatingOrbs />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-4">
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm text-electric font-medium">AI-Powered Learning</span>
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">UniAI Playground</h1>
          <p className="text-muted-foreground">
            {step === 'auth' 
              ? (isLogin ? 'Welcome back, Student!' : 'Join thousands of learners')
              : 'Complete your academic profile'}
          </p>
        </motion.div>

        {step !== 'auth' && stepIndicator}

        <AnimatePresence mode="wait">
          {/* Step 1: Auth */}
          {step === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <GlowCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-display font-semibold text-center text-foreground mb-6">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className={inputClasses} required={!isLogin} />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.edu" className={inputClasses} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      {isLogin && (
                        <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-electric hover:text-electric-glow transition-colors">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50" required minLength={6} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatedButton type="submit" disabled={loading} className="w-full" size="lg">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {isLogin ? 'Signing in...' : 'Creating account...'}
                      </div>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </AnimatedButton>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-electric hover:text-electric-glow font-medium transition-colors">
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          )}

          {/* Step 2: University */}
          {step === 'university' && (
            <motion.div key="university" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <GlowCard className="p-8">
                <h2 className="text-2xl font-display font-semibold text-center text-foreground mb-6">
                  Choose Your University
                </h2>

                <GlowCard
                  selected={true}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-electric" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Eastern Technical University</h3>
                      <p className="text-xs text-muted-foreground">ETU</p>
                    </div>
                  </div>
                </GlowCard>

                <AnimatedButton onClick={() => setStep('level')} className="w-full mt-6" size="lg">
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </GlowCard>
            </motion.div>
          )}

          {/* Step 3: Level */}
          {step === 'level' && (
            <motion.div key="level" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <GlowCard className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep('university')} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-display font-semibold text-foreground">Choose Academic Level</h2>
                </div>

                <div className="space-y-3">
                  {levelOptions.map((level) => (
                    <GlowCard
                      key={level.id}
                      selected={selectedLevel === level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className="p-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center">
                          <level.icon className="w-5 h-5 text-electric" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{level.title}</h3>
                          <p className="text-xs text-muted-foreground">{level.subtitle}</p>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {selectedLevel && (
                  <AnimatedButton onClick={() => { setSelectedFaculty(null); setSelectedCourse(null); setStep('faculty'); }} className="w-full mt-6" size="lg">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </AnimatedButton>
                )}
              </GlowCard>
            </motion.div>
          )}

          {/* Step 4: Faculty */}
          {step === 'faculty' && (
            <motion.div key="faculty" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <GlowCard className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep('level')} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-display font-semibold text-foreground">Choose Faculty</h2>
                </div>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                  {availableFaculties.map((faculty) => (
                    <GlowCard
                      key={faculty.id}
                      selected={selectedFaculty === faculty.id}
                      onClick={() => setSelectedFaculty(faculty.id)}
                      className="p-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{faculty.icon}</span>
                        <div>
                          <h3 className="font-display font-semibold text-foreground text-sm">{faculty.shortName}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">{faculty.description}</p>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {selectedFaculty && (
                  <AnimatedButton onClick={() => { setSelectedCourse(null); setStep('course'); }} className="w-full mt-4" size="lg">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </AnimatedButton>
                )}
              </GlowCard>
            </motion.div>
          )}

          {/* Step 5: Course */}
          {step === 'course' && (
            <motion.div key="course" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <GlowCard className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep('faculty')} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-display font-semibold text-foreground">Choose Course</h2>
                </div>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                  {availableCourses.map((course) => (
                    <GlowCard
                      key={course.id}
                      selected={selectedCourse === course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className="p-3 cursor-pointer"
                    >
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-sm">{course.shortName}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                        <p className="text-xs text-electric mt-1">{course.duration}</p>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                {selectedCourse && (
                  <AnimatedButton onClick={handleCompleteRegistration} disabled={loading} className="w-full mt-4" size="lg">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <>
                        Start Learning
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </AnimatedButton>
                )}
              </GlowCard>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Auth;
