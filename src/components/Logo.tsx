import uniaiLogoWhite from '@/assets/uniai-logo-white.png.asset.json';
import uniaiLogoWave from '@/assets/uniai-logo-wave.png.asset.json';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'wordmark' | 'banner';
  className?: string;
}

export function Logo({ size = 'md', variant = 'wordmark', className }: LogoProps) {
  const wordmarkSizes = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
  };

  if (variant === 'banner') {
    return (
      <img
        src={uniaiLogoWave.url}
        alt="UniAI"
        className={cn(
          'w-full max-w-xs rounded-2xl border border-electric/30 shadow-2xl object-cover',
          className
        )}
      />
    );
  }

  return (
    <img
      src={uniaiLogoWhite.url}
      alt="UniAI"
      className={cn(wordmarkSizes[size], 'w-auto object-contain select-none', className)}
    />
  );
}

export default Logo;