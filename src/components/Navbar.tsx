import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/history", label: "Our Story" },
    { to: "/track-order", label: "Track Order" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isTrackActive = location.pathname.startsWith("/track-order");

  const getActive = (to: string) =>
    to === "/track-order" ? isTrackActive : isActive(to);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass border-b shadow-sm"
      style={{ borderColor: "var(--border-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo — two lines with decorative element */}
          <Link
            to="/"
            className="flex-shrink-0 transition-colors duration-300 mr-8 lg:mr-12 group"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          >
            <div className="leading-tight relative">
              {/* Decorative diamond */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "var(--accent-gold)" }} />
              <span className="block text-xl sm:text-2xl font-light tracking-[0.25em] sm:tracking-[0.35em]">
                Ethnic
              </span>
              <span className="block text-xl sm:text-2xl font-light tracking-[0.25em] sm:tracking-[0.35em]">
                Andaaz
              </span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-10">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm tracking-widest uppercase transition-colors duration-300 whitespace-nowrap"
                style={{
                  color: getActive(link.to) ? "var(--accent-gold)" : "var(--text-secondary)",
                  fontWeight: getActive(link.to) ? 500 : 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = getActive(link.to)
                    ? "var(--accent-gold)"
                    : "var(--text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/favorites"
              className="relative p-2 transition-colors duration-300"
              style={{ color: isActive("/favorites") ? "var(--accent-gold)" : "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isActive("/favorites")
                  ? "var(--accent-gold)"
                  : "var(--text-secondary)")
              }
            >
              <Heart size={22} strokeWidth={1.5} />
              {totalFavorites > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                >
                  {totalFavorites}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative p-2 transition-colors duration-300"
              style={{
                color:
                  isActive("/cart") || isActive("/checkout")
                    ? "var(--accent-gold)"
                    : "var(--text-secondary)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  isActive("/cart") || isActive("/checkout")
                    ? "var(--accent-gold)"
                    : "var(--text-secondary)")
              }
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t shadow-lg"
          style={{ backgroundColor: "var(--bg-cream)", borderColor: "var(--border-warm)" }}
        >
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-sm tracking-widest uppercase py-2.5 transition-colors duration-300"
                style={{
                  color: getActive(link.to) ? "var(--accent-gold)" : "var(--text-secondary)",
                  fontWeight: getActive(link.to) ? 500 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-3 mt-2" style={{ borderTop: "1px solid var(--border-warm)" }}>
              <Link
                to="/favorites"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm tracking-widest uppercase py-2"
                style={{ color: isActive("/favorites") ? "var(--accent-gold)" : "var(--text-secondary)" }}
              >
                <Heart size={16} /> Favorites
                {totalFavorites > 0 && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  >
                    {totalFavorites}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm tracking-widest uppercase py-2"
                style={{ color: isActive("/cart") ? "var(--accent-gold)" : "var(--text-secondary)" }}
              >
                <ShoppingBag size={16} /> Cart
                {totalItems > 0 && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
