import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, KeyRound } from 'lucide-react';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-password-reset', {
        body: { email },
      });

      if (error) throw error;

      setEmailSent(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to send reset email',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <FloatingOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="p-8 text-center rounded-[2.5rem] bg-secondary/20 border-2 border-border/50 backdrop-blur-xl shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Check Your Email
            </h2>
            <p className="text-muted-foreground mb-8">
              If an account exists with <span className="text-electric font-bold">{email}</span>, you'll receive a password reset link shortly.
            </p>
            <AnimatedButton onClick={() => navigate('/auth')} variant="secondary" className="w-full py-6 rounded-2xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sign In
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <FloatingOrbs />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[420px]"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-6">
              <KeyRound className="w-4 h-4 text-electric" />
              <span className="text-xs text-electric font-bold uppercase tracking-wider">Recovery</span>
            </div>
            <h1 className="text-4xl font-display font-bold gradient-text mb-3">Forgot Password?</h1>
            <p className="text-muted-foreground">No worries, we'll send instructions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 focus-within:text-electric transition-colors">
              <label className="text-xs font-semibold uppercase tracking-wider ml-1 opacity-70">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-electric transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-secondary/30 border-2 border-border/50 rounded-[2rem] pl-12 pr-6 py-4 text-foreground focus:border-electric focus:ring-0 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <AnimatedButton
              type="submit"
              disabled={loading}
              className="w-full py-7 rounded-[2rem] font-bold text-lg shadow-lg shadow-electric/20"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </AnimatedButton>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-electric transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Login
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Column Illustration (Consistent with Auth) */}
      <div className="hidden lg:flex flex-1 relative bg-secondary/10 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-electric/10 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-electric/5 rounded-full blur-[100px] animate-float" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-[70%] h-[60%] max-w-[400px]"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-electric/20 to-transparent rounded-t-[200px] opacity-40 blur-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-secondary/40 backdrop-blur-md rounded-t-[200px] border-t-2 border-x-2 border-electric/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-electric/20 rounded-full blur-[40px] animate-pulse" />
                <img
                  src="/logo.jpg"
                  alt="UniAI Logo"
                  className="w-40 h-40 object-contain relative z-10 drop-shadow-xl rounded-2xl"
                />
              </div>
            </motion.div>
            <h2 className="text-2xl font-display font-bold text-foreground">Secure Recovery</h2>
            <p className="text-muted-foreground text-sm mt-4">
              We use multi-factor link validation to ensure your account security.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
