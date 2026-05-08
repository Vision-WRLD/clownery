import HeroSection from "../components/HeroSection";
import JewelryCarousel from "../components/JewelryCarousel";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Heart, Sparkles, Quote, Star } from "lucide-react";
import { DecorativeDivider, MandalaPattern } from "../components/DecorativeElements";

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      <HeroSection />
      <JewelryCarousel />

      {/* Features Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Background decoration */}
        <MandalaPattern className="w-[300px] h-[300px] -right-20 top-0 text-amber-600" opacity={0.02} />
        
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Our Promise
          </h2>
          <DecorativeDivider className="mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {[
            {
              icon: Shield,
              title: "Lifetime Warranty",
              text: "Every piece comes with our promise of lasting quality and craftsmanship.",
            },
            {
              icon: Award,
              title: "Handcrafted With Love",
              text: "Each piece is made by skilled artisans using traditional techniques.",
            },
            {
              icon: Heart,
              title: "Ethically Sourced",
              text: "We ensure all materials are responsibly and ethically obtained.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 card-elegant hover-lift"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center relative" style={{ backgroundColor: "var(--bg-sidebar)" }}>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full animate-pulseGlow" style={{ border: "1px solid var(--accent-gold)" }} />
                <feature.icon size={24} style={{ color: "var(--accent-gold)" }} />
              </div>
              <h3 className="text-lg font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: "var(--bg-sidebar)" }}>
        <MandalaPattern className="w-[400px] h-[400px] -left-32 top-1/2 -translate-y-1/2 text-amber-600" opacity={0.02} />
        <MandalaPattern className="w-[300px] h-[300px] -right-24 bottom-0 text-amber-600" opacity={0.02} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
              What Our Customers Say
            </h2>
            <DecorativeDivider className="mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Priya S.",
                location: "Toronto, ON",
                text: "The kundan necklace I received was absolutely stunning. The craftsmanship is impeccable, and it made my wedding day even more special. I've never felt more beautiful.",
                rating: 5,
              },
              {
                name: "Anita M.",
                location: "Vancouver, BC",
                text: "I've been searching for authentic Indian jewellery for years. Ethnic Andaaz exceeded all my expectations. The jhumkas are exactly what I wanted — traditional yet modern.",
                rating: 5,
              },
              {
                name: "Rajesh K.",
                location: "Brampton, ON",
                text: "Bought a rani haar for my wife's anniversary. She was moved to tears. The quality and attention to detail is remarkable. This is now a family heirloom.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 relative card-elegant"
              >
                {/* Quote icon */}
                <Quote size={32} className="absolute top-4 right-4 opacity-10" style={{ color: "var(--accent-gold)" }} />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent-gold)" style={{ color: "var(--accent-gold)" }} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--text-secondary)" }}>
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-light" style={{ backgroundColor: "var(--accent-gold)" }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-light text-sm" style={{ color: "var(--text-primary)" }}>{testimonial.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: "var(--accent-gold)" }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 bg-white blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10 bg-white blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={20} className="text-white opacity-80" />
            <Sparkles size={28} className="text-white" />
            <Sparkles size={20} className="text-white opacity-80" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-wide mb-6">
            New Bridal Collection
          </h2>
          <p className="text-white/80 text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover our latest bridal collection — where tradition meets modern elegance.
            Handcrafted for your special day.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-sm tracking-widest uppercase transition-all duration-300 hover:bg-opacity-90 hover:scale-105"
            style={{ color: "var(--accent-gold)" }}
          >
            Explore Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
