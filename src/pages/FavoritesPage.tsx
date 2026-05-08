import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <Heart size={64} className="mx-auto mb-6" style={{ color: "var(--border-warm)" }} />
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            No Favorites Yet
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            Start adding pieces you love to your favorites collection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ backgroundColor: "var(--btn-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
          >
            Browse Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
            Your Wishlist
          </p>
          <h1 className="text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Favorites
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            {favorites.length} {favorites.length === 1 ? "piece" : "pieces"} saved
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-sm overflow-hidden transition-all duration-500"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden" style={{ backgroundColor: "var(--bg-sidebar)" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>

              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "rgba(255,253,249,0.85)" }}
              >
                <Trash2 size={16} className="text-red-400" />
              </button>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--accent-gold)" }}>
                    {product.category}
                  </p>
                  <h3 className="font-light text-base tracking-wide" style={{ color: "var(--text-primary)" }}>
                    {product.name}
                  </h3>
                  <p className="font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-white text-xs tracking-widest uppercase transition-colors duration-300 rounded-sm"
                  style={{ backgroundColor: "var(--btn-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
