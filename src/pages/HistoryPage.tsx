import { Gem, Award, Globe, Heart } from "lucide-react";
import { Reveal } from "../hooks/useScrollReveal";

const timeline = [
  {
    year: "2010",
    title: "A Quiet Beginning",
    description:
      "It started at a kitchen table in Bolton, Ontario — just a small velvet cloth, a handful of tools, and a collection of techniques passed down through generations of women back home in India. Late at night, after the world went quiet, the first pair of earrings was born. They weren't perfect. But they carried something no store-bought piece ever could — soul.",
    image: "/images/jhumka-earrings.jpg",
  },
  {
    year: "2012",
    title: "One Gift Changed Everything",
    description:
      "A handcrafted necklace was gifted to a family member for their wedding. Guest after guest kept asking the same question: \"Where is this jewellery from? Where can I get something like this?\" That evening, a small workspace was set up in the garage. No business plan. No investors. Just a deep belief that traditional Indian artistry deserved to be worn, celebrated, and cherished — here in Canada and beyond.",
    image: "/images/kundan-necklace.jpg",
  },
  {
    year: "2014",
    title: "Ethnic Andaaz Is Born",
    description:
      "With a growing waitlist and an inbox full of kind messages, Ethnic Andaaz Jewellery officially launched its name — blending \"ethnic\" heritage with \"andaaz,\" the Urdu word for style. Every piece was still made by hand in a home studio: intricate jhumkas, delicate kundan sets, and bold bridal maang tikkas, each one carrying a story of where it came from. The promise was simple: no mass production, no shortcuts. Only heart.",
    image: "/images/polki-rings.jpg",
  },
  {
    year: "2016",
    title: "More Than Jewellery",
    description:
      "Word spread through the Bolton community and beyond. What started as a small jewellery practice began hosting workshops for women in the neighbourhood — newcomers, creatives, and anyone looking for a place to belong. Women would gather, share chai, share stories, and create something beautiful together. Ethnic Andaaz wasn't just selling jewellery anymore — it was building a family.",
    image: "/images/gold-bangles.jpg",
  },
  {
    year: "2019",
    title: "Generations in Every Piece",
    description:
      "The next generation of the family stepped in, bringing fresh design training and a contemporary eye. Together, they began blending traditional Indian techniques — meenakari enamel work, polki diamond settings, temple-inspired gold motifs — with modern silhouettes that could be worn from a mandap to a boardroom. It was a passing of the torch: old-world craft meeting new-world vision.",
    image: "/images/chandbali.jpg",
  },
  {
    year: "2021",
    title: "Held Together by Community",
    description:
      "The pandemic hit small businesses hard. But the community rallied. Orders came in with messages like \"Your jewellery reminds me of home\" and \"I wore your bangles to my virtual wedding — they were my something blue.\" Each package was still sealed by hand with a handwritten thank-you note. One of those notes still hangs above the workbench today. It reads: \"You made me feel beautiful when I needed it most.\"",
    image: "/images/maang-tikka.jpg",
  },
  {
    year: "2024",
    title: "Rooted in Tradition, Reaching the World",
    description:
      "Ethnic Andaaz grew to serve clients across Canada and internationally. The team moved into a proper studio — still in Bolton, still close to home. Local artisans were brought on, many of them women starting new chapters of their lives. The jewellery was featured in bridal magazines and worn at celebrations across the country. But the proudest moment remains the very first pair of earrings, made at a kitchen table, with nothing but love.",
    image: "/images/rani-haar.jpg",
  },
  {
    year: "Today",
    title: "From Our Home to Yours",
    description:
      "Every piece of Ethnic Andaaz jewellery still begins the same way — with intention, with care, and with the memory of the women back in India whose hands first taught that jewellery is more than adornment. It's identity. It's belonging. It's love made visible. We are proudly woman-owned, family-run, and rooted in Indian heritage. When you wear our pieces, you carry our story with you. And we are so deeply honoured.",
    image: "/images/temple-necklace.jpg",
  },
];

const values = [
  {
    icon: Heart,
    title: "Woman-Owned",
    description: "Founded, led, and powered by women. Every decision is guided by the strength, creativity, and resilience of the women in our family and community.",
  },
  {
    icon: Gem,
    title: "Indian Heritage",
    description: "From jhumkas to kundan, from meenakari to polki — our designs honour centuries of Indian artistry and bring traditional craft into the modern world.",
  },
  {
    icon: Award,
    title: "Handcrafted",
    description: "No factories, no assembly lines. Each piece is made by hand with care, intention, and techniques passed down through generations of Indian artisans.",
  },
  {
    icon: Globe,
    title: "Community First",
    description: "From local workshops to hiring newcomer women, we invest in the people around us. When our community thrives, we all shine brighter.",
  },
];

export default function HistoryPage() {
  return (
    <div className="pt-20 page-enter">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/30884522/pexels-photo-30884522.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Ethnic Andaaz History"
            className="w-full h-full object-cover animate-fadeIn"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30 sm:to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4 animate-fadeInUp" style={{ color: "var(--accent-gold-light)" }}>
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-wide leading-tight animate-fadeInUp delay-100">
            Made by Hand.
            <br />
            <span className="italic" style={{ color: "var(--accent-gold-light)" }}>Led by Heart.</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl mx-auto animate-fadeInUp delay-200">
            What began as a quiet dream at a kitchen table in Bolton has grown
            into an Indian jewellery studio built on love, heritage, and the
            belief that every piece of jewellery should carry a story.
          </p>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--bg-cream)" }}>
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-5xl sm:text-6xl font-light leading-none mb-4 sm:mb-6" style={{ color: "var(--accent-gold)", opacity: 0.4 }}>
              &ldquo;
            </p>
            <blockquote className="text-base sm:text-lg lg:text-xl font-light leading-relaxed tracking-wide" style={{ color: "var(--text-primary)" }}>
              In our culture, jewellery is never just jewellery. It's a blessing
              from a grandparent. A gift at a wedding. A piece of home you carry
              with you wherever life takes you. That's what we create — not
              accessories, but memories you can wear.
            </blockquote>
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
                The Founder
              </p>
              <p className="text-[10px] sm:text-xs tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                Ethnic Andaaz Jewellery
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--bg-sidebar)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
                What We Stand For
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
                Our Values
              </h2>
              <div className="w-16 h-px mx-auto mt-4 sm:mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 120}>
                <div className="text-center p-3 sm:p-6">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-5 flex items-center justify-center rounded-full animate-pulseGlow"
                    style={{ border: `1px solid var(--accent-gold)` }}
                  >
                    <value.icon size={18} className="sm:w-[22px] sm:h-[22px]" style={{ color: "var(--accent-gold)" }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-light tracking-wide mb-2 sm:mb-3" style={{ color: "var(--text-primary)" }}>
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--bg-cream)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
                Our Journey
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
                From Kitchen Table to Your Home
              </h2>
              <div className="w-16 h-px mx-auto mt-4 sm:mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px" style={{ backgroundColor: "var(--border-warm)" }} />

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={item.year} delay={index * 80}>
                  <div className={`relative flex flex-col md:flex-row items-start mb-12 sm:mb-16 last:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div
                      className="absolute left-4 sm:left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 mt-1.5 md:mt-2 z-10"
                      style={{
                        backgroundColor: "var(--accent-gold)",
                        boxShadow: `0 0 0 4px var(--bg-cream)`,
                      }}
                    />

                    {/* Mobile: Image + Content stacked */}
                    <div className="md:hidden ml-10 sm:ml-14">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 sm:h-48 object-cover rounded-sm shadow-sm mb-4"
                      />
                      <span className="inline-block text-[10px] sm:text-xs tracking-[0.3em] font-medium mb-1 sm:mb-2" style={{ color: "var(--accent-gold)" }}>
                        {item.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-light tracking-wide mb-2 sm:mb-3" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Desktop: alternating */}
                    <div className={`hidden md:flex flex-row items-start w-full ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                      {/* Content */}
                      <div className={`w-[calc(50%-2rem)] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}>
                        <span className="inline-block text-xs tracking-[0.3em] font-medium mb-2" style={{ color: "var(--accent-gold)" }}>
                          {item.year}
                        </span>
                        <h3 className="text-xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.description}
                        </p>
                      </div>

                      {/* Spacer for center alignment */}
                      <div className="w-8 flex-shrink-0" />

                      {/* Image */}
                      <div className={`w-[calc(50%-2rem)] ${isEven ? "md:pl-8" : "md:pr-8"}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-sm shadow-sm hover-lift"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders Quote */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ backgroundColor: "var(--footer-bg)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl" style={{ backgroundColor: "var(--accent-gold-light)" }} />
          <div className="absolute bottom-0 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl" style={{ backgroundColor: "var(--accent-gold)" }} />
        </div>
        <Reveal>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="text-4xl sm:text-6xl font-light leading-none mb-4 sm:mb-6" style={{ color: "var(--accent-gold)", opacity: 0.4 }}>
              &ldquo;
            </p>
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-light text-white leading-relaxed tracking-wide">
              I didn't start this company to build an empire. I started it because
              the women who came before me taught me that the most precious thing
              you can create is something that makes another person feel seen, feel
              connected to their roots, and feel beautiful — exactly as they are.
            </blockquote>
            <div className="mt-6 sm:mt-8">
              <p className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: "var(--accent-gold-light)" }}>
                The Founder
              </p>
              <p className="text-[10px] sm:text-xs tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                Ethnic Andaaz Jewellery
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "var(--bg-cream)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "14+", label: "Years of Craft" },
              { value: "5,000+", label: "Pieces Created" },
              { value: "100%", label: "Woman-Owned" },
              { value: "Bolton", label: "Ontario, Canada" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-widest uppercase mt-1 sm:mt-2" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
