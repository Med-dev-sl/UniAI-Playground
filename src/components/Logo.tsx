import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-lg' },
    md: { container: 'w-12 h-12', text: 'text-2xl' },
    lg: { container: 'w-16 h-16', text: 'text-4xl' }
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`${sizes[size].container} relative`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric to-electric-glow animate-pulse-glow" />
        
        {/* Inner content */}
        <div className="absolute inset-[2px] rounded-[10px] bg-navy-deep flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-2/3 h-2/3"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logoGradient" x1="2" y1="2" x2="22" y2="22">
                <stop stopColor="hsl(217, 91%, 60%)" />
                <stop offset="1" stopColor="hsl(217, 91%, 75%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
      
      <div className="flex flex-col">
        <span className={`font-display font-bold ${sizes[size].text} gradient-text`}>
          UniAI
        </span>
        <span className="text-xs text-muted-foreground -mt-1">
          Playground
        </span>
      </div>
    </div>
  );
}

// Usage
<Logo size="lg" />