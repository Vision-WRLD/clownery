import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FloralVine } from "./DecorativeElements";

// Social media icons as inline SVGs
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative" style={{ backgroundColor: "var(--footer-bg)", color: "var(--text-muted)" }}>
      {/* Decorative top border */}
      <FloralVine className="text-amber-700 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5 leading-tight relative inline-block">
              {/* Decorative element */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45" style={{ backgroundColor: "var(--accent-gold)", opacity: 0.6 }} />
              <span className="block text-2xl font-light tracking-[0.25em] text-white">Ethnic</span>
              <span className="block text-2xl font-light tracking-[0.25em] text-white">Andaaz</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A woman-owned Indian jewellery studio crafting timeless pieces that
              honour heritage, celebrate culture, and carry love through
              generations.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: InstagramIcon, href: "#" },
                { icon: FacebookIcon, href: "#" },
                { icon: Mail, href: "mailto:info@ethnicandaaz.com", isLucide: true },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-amber-200"
                  style={{ border: "1px solid rgba(166,124,46,0.3)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent-gold)";
                    e.currentTarget.style.borderColor = "var(--accent-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(166,124,46,0.3)";
                  }}
                >
                  {item.isLucide ? <item.icon size={16} /> : <item.icon />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-px" style={{ backgroundColor: "var(--accent-gold)" }} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "Our Story", to: "/history" },
                { label: "Track Order", to: "/track-order" },
                { label: "Favorites", to: "/favorites" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm transition-all duration-300 inline-flex items-center gap-2 group"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <span className="w-0 h-px group-hover:w-3 transition-all duration-300" style={{ backgroundColor: "var(--accent-gold)" }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-px" style={{ backgroundColor: "var(--accent-gold)" }} />
              Categories
            </h4>
            <ul className="space-y-3">
              {["Rings", "Earrings", "Necklaces", "Bracelets"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    className="text-sm transition-all duration-300 inline-flex items-center gap-2 group"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <span className="w-0 h-px group-hover:w-3 transition-all duration-300" style={{ backgroundColor: "var(--accent-gold)" }} />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-5 flex items-center gap-2">
              <span className="w-4 h-px" style={{ backgroundColor: "var(--accent-gold)" }} />
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
                <span>info@ethnicandaaz.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 rounded-full border" style={{ borderColor: "var(--accent-gold)" }} />
                <span>+1 (647) 867-6900</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 rotate-45" style={{ border: "1px solid var(--accent-gold)" }} />
                <span>
                  4 Cuddles Ct
                  <br />
                  Bolton, ON L7E 4K8
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(232,224,214,0.15)" }}>
          <p className="text-xs tracking-wider">
            © 2026 Ethnic Andaaz Jewellery. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs tracking-wider">
            <span
              className="cursor-pointer transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Privacy Policy
            </span>
            <span
              className="cursor-pointer transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
