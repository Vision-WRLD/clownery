import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: "new" | "sale" | "trending" | "limited";
}

export default function ProductCard({ product, showBadge, badgeText, badgeVariant }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favored = isFavorite(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const badgeColors = {
    new: { bg: "var(--accent-gold)", text: "white" },
    sale: { bg: "#dc2626", text: "white" },
    trending: { bg: "#7c3aed", text: "white" },
    limited: { bg: "#0d9488", text: "white" },
  };

  // Use product badge if available, otherwise use props
  const activeBadge = product.badge || badgeVariant;
  const shouldShowBadge = showBadge || !!product.badge;

  return (
    <div 
      className="group relative card-elegant overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden relative" style={{ backgroundColor: "var(--bg-sidebar)" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div 
            className="absolute inset-0 bg-black/20 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
          {/* Quick view button */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-xs tracking-widest uppercase flex items-center gap-2 transition-transform duration-300" style={{ color: "var(--text-primary)", transform: isHovered ? 'translateY(0)' : 'translateY(10px)' }}>
              <Eye size={14} />
              Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Badge */}
      {shouldShowBadge && (
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-widest uppercase font-medium z-10"
          style={{ backgroundColor: badgeColors[activeBadge || "new"].bg, color: badgeColors[activeBadge || "new"].text }}
        >
          {badgeText || activeBadge}
        </span>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product)}
        className="absolute top-3 right-3 p-2.5 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:scale-110 z-10"
        style={{ 
          backgroundColor: favored ? "rgba(239,68,68,0.1)" : "rgba(255,253,249,0.9)",
          border: favored ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent"
        }}
      >
        <Heart
          size={18}
          className={`transition-all duration-300 ${
            favored ? "fill-red-500 text-red-500" : ""
          }`}
          style={{ color: favored ? undefined : "var(--text-muted)" }}
        />
      </button>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <Link to={`/product/${product.id}`}>
          <p className="text-[10px] sm:text-xs tracking-widest uppercase mb-1.5 font-medium" style={{ color: "var(--accent-gold)" }}>
            {product.category}
          </p>
          <h3 className="font-light text-sm sm:text-base tracking-wide leading-snug" style={{ color: "var(--text-primary)" }}>
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="font-medium text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </Link>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-white text-xs tracking-widest uppercase transition-all duration-300 btn-primary"
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
