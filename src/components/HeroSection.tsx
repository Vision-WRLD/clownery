import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { MandalaPattern, FloatingParticles } from "./DecorativeElements";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const words = [
    "Heart",
    "Passion",
    "Soul",
    "Love",
    "Dreams",
    "Tradition",
    "Elegance",
    "Grace",
    "Beauty",
    "Legacy",
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Beautiful gemstones and jewelry"
          className="w-full h-full object-cover animate-fadeIn"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Decorative Mandala Patterns */}
      <MandalaPattern className="w-[500px] h-[500px] -right-32 top-1/4 text-amber-400" opacity={0.04} />
      <MandalaPattern className="w-[400px] h-[400px] -left-24 bottom-1/4 text-amber-400" opacity={0.03} />

      {/* Floating particles */}
      <FloatingParticles count={15} className="hidden sm:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-2xl">
          {/* Decorative label */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 animate-fadeInUp">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400" />
            <p className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-amber-400 uppercase flex items-center gap-2">
              <Sparkles size={12} className="text-amber-400" />
              Handcrafted Indian Jewellery
            </p>
          </div>

          {/* Main headline with enhanced typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-white leading-tight tracking-wide animate-fadeInUp delay-100">
            Where Heritage
            <br />
            <span className="relative inline-block">
              <span className="font-light italic text-amber-200">Meets</span>
              {/* Decorative underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 6 Q25 2 50 6 T100 6" stroke="rgba(253,230,138,0.4)" strokeWidth="1" fill="none" />
              </svg>
            </span>{" "}
            <span 
              className={`text-gradient-gold inline-block transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
              key={currentWordIndex}
            >
              {words[currentWordIndex]}
            </span>
          </h1>

          {/* Description with better styling */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-lg animate-fadeInUp delay-200">
            Handcrafted Indian jewellery rooted in tradition, made for your
            story. From jhumkas to kundan, each piece is crafted with love
            and made to be cherished forever.
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fadeInUp delay-300">
            <Link
              to="/shop"
              className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-white text-xs sm:text-sm tracking-widest uppercase overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%)",
              }}
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                Explore Collection
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
            <Link
              to="/shop"
              className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-white text-xs sm:text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              New Arrivals
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 sm:mt-14 flex items-center gap-6 sm:gap-8 animate-fadeInUp delay-400">
            {[
              { label: "Woman", sub: "Owned Business" },
              { label: "100%", sub: "Handcrafted" },
              { label: "Lifetime", sub: "Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-light text-amber-200">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator with enhanced design */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
          </div>
          <p className="text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
            Scroll
          </p>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-12 sm:h-16">
          <path
            d="M0 60V30C240 50 480 10 720 30C960 50 1200 10 1440 30V60H0Z"
            fill="var(--bg-cream)"
          />
        </svg>
      </div>
    </section>
  );
}
