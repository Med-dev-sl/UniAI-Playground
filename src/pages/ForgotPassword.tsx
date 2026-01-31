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
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4">
        <FloatingOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <GlowCard className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
              Check Your Email
            </h2>
            <p className="text-muted-foreground mb-6">
              If an account exists with <span className="text-electric">{email}</span>, you'll receive a password reset link shortly.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Don't see it? Check your spam folder.
            </p>
            <AnimatedButton onClick={() => navigate('/auth')} variant="secondary" className="w-full">
              <ArrowLeft className="w-5 h-5" />
              Back to Sign In
            </AnimatedButton>
          </GlowCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4">
      <FloatingOrbs />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-4">
            <KeyRound className="w-4 h-4 text-electric" />
            <span className="text-sm text-electric font-medium">
              Password Recovery
            </span>
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground">
            No worries, we'll send you reset instructions
          </p>
        </motion.div>

        <GlowCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50"
                  required
                />
              </div>
            </div>

            <AnimatedButton
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </AnimatedButton>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
