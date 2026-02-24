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
            className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-electric' : i < currentIndex ? 'w-2 bg-electric/50' : 'w-2 bg-muted'
              }`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <FloatingOrbs />
      </div>

      {/* Left Column: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:py-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[420px]"
        >
          {/* Logo/Brand (Visible only on mobile top) */}
          <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2">UniAI Playground</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              {step === 'auth'
                ? (isLogin ? 'Welcome Back!!' : 'Create an Account')
                : 'Complete your profile'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'auth' && (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-1.5 focus-within:text-electric transition-colors">
                      <label className="text-xs font-semibold uppercase tracking-wider ml-1 opacity-70">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-electric transition-colors" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-secondary/30 border-2 border-border/50 rounded-[2rem] pl-12 pr-6 py-4 text-foreground focus:border-electric focus:ring-0 transition-all outline-none"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5 focus-within:text-electric transition-colors">
                    <label className="text-xs font-semibold uppercase tracking-wider ml-1 opacity-70">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-electric transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-secondary/30 border-2 border-border/50 rounded-[2rem] pl-12 pr-6 py-4 text-foreground focus:border-electric focus:ring-0 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 focus-within:text-electric transition-colors">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-semibold uppercase tracking-wider opacity-70">Password</label>
                      {isLogin && (
                        <button type="button" onClick={() => navigate('/forgot-password')} className="text-[10px] font-bold text-electric hover:underline">
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-electric transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-secondary/30 border-2 border-border/50 rounded-[2rem] pl-12 pr-12 py-4 text-foreground focus:border-electric focus:ring-0 transition-all outline-none"
                        required
                        minLength={6}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-electric">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatedButton type="submit" disabled={loading} className="w-full py-7 rounded-[2rem] font-bold text-lg shadow-lg shadow-electric/20 mt-2" size="lg">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isLogin ? 'Signing in...' : 'Creating...'}
                      </div>
                    ) : (
                      isLogin ? 'Login' : 'Sign Up'
                    )}
                  </AnimatedButton>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-muted-foreground text-sm">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-electric hover:underline font-bold transition-colors">
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {step !== 'auth' && (
              <motion.div
                key="registration-steps"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                {stepIndicator}
                <GlowCard className="p-6 rounded-[2rem] bg-secondary/20 shadow-xl">
                  {/* Reuse existing step content but with rounded aesthetics */}
                  {step === 'university' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-center">Your University</h2>
                      <div className="p-4 rounded-2xl border-2 border-electric bg-electric/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center text-electric">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold">Eastern Technical University</h3>
                          <p className="text-xs opacity-70">SLL / ETU</p>
                        </div>
                      </div>
                      <AnimatedButton onClick={() => setStep('level')} className="w-full py-6 rounded-2xl font-bold">
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </AnimatedButton>
                    </div>
                  )}

                  {step === 'level' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setStep('university')} className="p-2 rounded-full hover:bg-secondary"><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="text-xl font-bold">Choose Level</h2>
                      </div>
                      <div className="grid gap-3">
                        {levelOptions.map((level) => (
                          <div
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedLevel === level.id ? 'border-electric bg-electric/10' : 'border-border/50 hover:border-electric/30'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <level.icon className={`w-5 h-5 ${selectedLevel === level.id ? 'text-electric' : 'text-muted-foreground'}`} />
                              <div>
                                <h3 className="font-bold text-sm">{level.title}</h3>
                                <p className="text-[10px] opacity-60 uppercase">{level.subtitle}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <AnimatedButton disabled={!selectedLevel} onClick={() => { setSelectedFaculty(null); setSelectedCourse(null); setStep('faculty'); }} className="w-full py-6 rounded-2xl font-bold mt-2">
                        Continue
                      </AnimatedButton>
                    </div>
                  )}

                  {step === 'faculty' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setStep('level')} className="p-2 rounded-full hover:bg-secondary"><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="text-xl font-bold">Faculty</h2>
                      </div>
                      <div className="grid gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
                        {availableFaculties.map((faculty) => (
                          <div
                            key={faculty.id}
                            onClick={() => setSelectedFaculty(faculty.id)}
                            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${selectedFaculty === faculty.id ? 'border-electric bg-electric/10' : 'border-border/50 hover:border-electric/30'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{faculty.icon}</span>
                              <h3 className="font-bold text-sm">{faculty.shortName}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                      <AnimatedButton disabled={!selectedFaculty} onClick={() => { setSelectedCourse(null); setStep('course'); }} className="w-full py-6 rounded-2xl font-bold mt-2">
                        Continue
                      </AnimatedButton>
                    </div>
                  )}

                  {step === 'course' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => setStep('faculty')} className="p-2 rounded-full hover:bg-secondary"><ArrowLeft className="w-5 h-5" /></button>
                        <h2 className="text-xl font-bold">Course</h2>
                      </div>
                      <div className="grid gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
                        {availableCourses.map((course) => (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course.id)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedCourse === course.id ? 'border-electric bg-electric/10' : 'border-border/50 hover:border-electric/30'
                              }`}
                          >
                            <h3 className="font-bold text-sm">{course.shortName}</h3>
                            <p className="text-[10px] opacity-60">{course.duration}</p>
                          </div>
                        ))}
                      </div>
                      <AnimatedButton disabled={!selectedCourse} onClick={handleCompleteRegistration} className="w-full py-6 rounded-2xl font-bold mt-2">
                        Start Learning
                      </AnimatedButton>
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-[10px] text-muted-foreground mt-10 opacity-60">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </motion.div>
      </div>

      {/* Right Column: Illustration (Desktop Only Decor) */}
      <div className="hidden lg:flex flex-1 relative bg-secondary/10 items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-electric/10 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-electric/5 rounded-full blur-[100px] animate-float" />
        </div>

        {/* The Arch Decor (From Image) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-[80%] h-[70%] max-w-[500px]"
        >
          {/* Arched Backdrop */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-electric/20 to-transparent rounded-t-[250px] opacity-40 blur-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-secondary/40 backdrop-blur-md rounded-t-[250px] border-t-2 border-x-2 border-electric/30" />

          {/* Character Placeholder / Illustration Area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-10"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-electric/20 rounded-full blur-[60px] animate-pulse" />
                <img
                  src="/logo.jpg"
                  alt="UniAI Logo"
                  className="w-56 h-56 object-contain relative z-10 drop-shadow-2xl rounded-3xl"
                />
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="w-12 h-12 text-electric animate-bounce" />
                </div>
              </div>
            </motion.div>

            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Level Up Your Studies</h2>
            <p className="text-muted-foreground text-lg max-w-[300px]">
              Adaptive AI tutoring designed specifically for your university curriculum.
            </p>

            <div className="mt-12 flex gap-4">
              <div className="px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-xs font-bold text-electric">ETU Curriculum</div>
              <div className="px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-xs font-bold text-electric">AI Analysis</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Illustration (Minimalist Top) */}
      <div className="lg:hidden h-24 flex items-center justify-center px-4 bg-secondary/5 border-b border-border/50">
        <Sparkles className="w-6 h-6 text-electric mr-2" />
        <span className="font-display font-bold text-xl">UniAI</span>
      </div>
    </div>
  );
};

export default Auth;
