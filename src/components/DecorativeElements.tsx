import { ReactNode } from "react";

// Indian-inspired mandala pattern
export function MandalaPattern({ className = "", opacity = 0.03 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      style={{ opacity }}
    >
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="0.5" />
      {/* Petals */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 40 * Math.cos(angle);
        const y1 = 100 + 40 * Math.sin(angle);
        const x2 = 100 + 80 * Math.cos(angle);
        const y2 = 100 + 80 * Math.sin(angle);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />
            <circle cx={x2} cy={y2} r="3" stroke="currentColor" strokeWidth="0.5" />
          </g>
        );
      })}
      {/* Inner details */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 100 + 25 * Math.cos(angle);
        const y = 100 + 25 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="4" stroke="currentColor" strokeWidth="0.5" />;
      })}
    </svg>
  );
}

// Floral vine border
export function FloralVine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full h-12 ${className}`}
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <pattern id="vine" x="0" y="0" width="200" height="48" patternUnits="userSpaceOnUse">
          {/* Main vine */}
          <path
            d="M0 24 Q50 12 100 24 T200 24"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Leaves */}
          <ellipse cx="30" cy="18" rx="8" ry="4" stroke="currentColor" strokeWidth="0.5" transform="rotate(-30 30 18)" />
          <ellipse cx="70" cy="30" rx="8" ry="4" stroke="currentColor" strokeWidth="0.5" transform="rotate(30 70 30)" />
          <ellipse cx="130" cy="18" rx="8" ry="4" stroke="currentColor" strokeWidth="0.5" transform="rotate(-30 130 18)" />
          <ellipse cx="170" cy="30" rx="8" ry="4" stroke="currentColor" strokeWidth="0.5" transform="rotate(30 170 30)" />
          {/* Flowers */}
          <circle cx="50" cy="24" r="5" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="150" cy="24" r="5" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vine)" />
    </svg>
  );
}

// Corner ornament
export function CornerOrnament({ position = "top-left", className = "" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; className?: string }) {
  const transform = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
  }[position];

  return (
    <svg
      className={`w-20 h-20 absolute pointer-events-none ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      style={{ transform }}
    >
      <path
        d="M0 0 L40 0 Q40 40 0 40"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M5 5 L35 5 Q35 35 5 35"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      {/* Decorative dots */}
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="30" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="30" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Decorative divider
export function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--accent-gold)]" />
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z"
          fill="var(--accent-gold)"
          opacity="0.6"
        />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--accent-gold)]" />
    </div>
  );
}

// Floating particles effect
export function FloatingParticles({ count = 20, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float"
          style={{
            backgroundColor: "var(--accent-gold-light)",
            opacity: 0.3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// Section wrapper with decorative elements
export function DecorativeSection({ 
  children, 
  className = "",
  showOrnaments = false,
  background = "transparent"
}: { 
  children: ReactNode; 
  className?: string;
  showOrnaments?: boolean;
  background?: string;
}) {
  return (
    <section className={`relative ${className}`} style={{ backgroundColor: background }}>
      {showOrnaments && (
        <>
          <CornerOrnament position="top-left" className="text-[var(--accent-gold)] opacity-20" />
          <CornerOrnament position="top-right" className="text-[var(--accent-gold)] opacity-20" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// Gold shimmer text effect
export function ShimmerText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]"
        style={{ mixBlendMode: "overlay" }}
      />
    </span>
  );
}

// Badge component for products
export function Badge({ 
  children, 
  variant = "new",
  className = ""
}: { 
  children: ReactNode; 
  variant?: "new" | "sale" | "trending" | "limited";
  className?: string;
}) {
  const colors = {
    new: { bg: "var(--accent-gold)", text: "white" },
    sale: { bg: "#dc2626", text: "white" },
    trending: { bg: "#7c3aed", text: "white" },
    limited: { bg: "#0d9488", text: "white" },
  };

  return (
    <span
      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-widest uppercase font-medium rounded-sm ${className}`}
      style={{ backgroundColor: colors[variant].bg, color: colors[variant].text }}
    >
      {children}
    </span>
  );
}
