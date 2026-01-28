import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  delay?: number;
}

export function GlowCard({ children, className, onClick, selected, delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
        selected ? "opacity-100" : "",
        "bg-gradient-to-r from-electric to-electric-glow"
      )} />
      
      {/* Card content */}
      <div className={cn(
        "relative glass-card-elevated p-6 transition-all duration-300",
        selected && "border-electric/50 glow-effect"
      )}>
        {children}
      </div>
    </motion.div>
  );
}