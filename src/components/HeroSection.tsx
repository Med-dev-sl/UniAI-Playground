import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, GraduationCap, Users, Brain, Download } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const stats = [
    { icon: GraduationCap, value: '8', label: 'Faculties' },
    { icon: Brain, value: '150+', label: 'Courses' },
    { icon: Users, value: '1000+', label: 'Students' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* 3D Floating Cards Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-40 glass-card rounded-2xl opacity-30"
          animate={{ 
            y: [0, -20, 0], 
            rotateY: [0, 10, 0],
            rotateX: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-32 glass-card rounded-2xl opacity-20"
          animate={{ 
            y: [0, 15, 0], 
            rotateY: [0, -15, 0],
            rotateX: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-28 h-36 glass-card rounded-2xl opacity-25"
          animate={{ 
            y: [0, -15, 0], 
            rotateY: [0, 8, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute bottom-40 right-1/4 w-36 h-28 glass-card rounded-2xl opacity-20"
          animate={{ 
            y: [0, 20, 0], 
            rotateY: [0, -10, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-electric" />
          <span className="text-sm text-electric font-medium">
            AI-Powered Learning for Sierra Leone Universities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6"
        >
          <span className="gradient-text">UniAI</span>
          <br />
          <span className="text-foreground">Playground</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
        >
          Your intelligent study companion with specialized AI agents for every course.
          <span className="text-foreground"> Ask questions, get instant answers, and excel in your studies.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton size="lg" variant="secondary" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="w-5 h-5" />
            </AnimatedButton>

            <AnimatedButton
              size="lg"
              onClick={() => window.open('https://apk.e-droid.net/apk/app3905731-h6trgj.apk?v=1', '_blank', 'noopener,noreferrer')}
            >
              <Download className="w-5 h-5" />
              Download App
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric/10 mb-3">
                <stat.icon className="w-6 h-6 text-electric" />
              </div>
              <div className="text-3xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-electric"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}