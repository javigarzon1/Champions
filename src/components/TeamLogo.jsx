import { cn } from "../lib/utils.js";

export function TeamLogo({ team, size = "md", className, reveal = false, glow = false }) {
  const sizeClasses = {
    xs: "w-5 h-5",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        reveal && "animate-logo-reveal",
        glow && "animate-logo-glow"
      )}
    >
      <img
        src={team.logo}
        alt={`${team.name} logo`}
        className={cn(
          sizeClasses[size],
          "object-contain transition-transform duration-300",
          className
        )}
        loading="lazy"
      />
    </div>
  );
}