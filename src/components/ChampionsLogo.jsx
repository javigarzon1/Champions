import { cn } from "../libs/utils";

export function ChampionsLogo({ className, size = "md" }) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Star shape representing Champions League */}
      <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse-gold">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(45, 100%, 53%)" />
            <stop offset="50%" stopColor="hsl(45, 100%, 70%)" />
            <stop offset="100%" stopColor="hsl(45, 100%, 53%)" />
          </linearGradient>
        </defs>
        {/* Main star */}
        <polygon
          points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35"
          fill="url(#goldGradient)"
          stroke="hsl(45, 100%, 60%)"
          strokeWidth="1"
        />
        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="hsl(222, 47%, 11%)"
          stroke="hsl(45, 100%, 53%)"
          strokeWidth="2"
        />
        {/* Ball pattern */}
        <circle cx="50" cy="50" r="8" fill="none" stroke="hsl(45, 100%, 53%)" strokeWidth="1" />
        <path
          d="M 45 45 Q 50 40 55 45 Q 60 50 55 55 Q 50 60 45 55 Q 40 50 45 45"
          fill="none"
          stroke="hsl(45, 100%, 53%)"
          strokeWidth="0.5"
        />
      </svg>
      {/* Glow effect */}
      <div className="absolute inset-0 blur-xl bg-primary/30 -z-10" />
    </div>
  );
}
