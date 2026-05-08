import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  ZoomIn,
  X,
  Star,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Gem,
  Info,
  Minus,
  Plus,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

// ─── Accordion ────────────────────────────────────────────────────
function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--border-warm)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4"
      >
        <span className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
          {icon}
          {title}
        </span>
        {open ? <ChevronUp size={14} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />}
      </button>
      {open && <div className="pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{children}</div>}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Quantity
  const [qty, setQty] = useState(1);

  // Selected size/color
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Inline zoom state
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Init selected
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setSelectedColor(product.colors[0] || null);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            Product Not Found
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            The piece you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ backgroundColor: "var(--btn-primary)" }}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const favored = isFavorite(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const colorSwatch: Record<string, string> = {
    Gold: "bg-yellow-400",
    Silver: "bg-gray-300",
    "Rose Gold": "bg-rose-300",
    "White Gold": "bg-gray-100 border border-gray-300",
  };

  return (
    <div className="pt-24 pb-20 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-xs tracking-wider" style={{ color: "var(--text-muted)" }}>
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:underline">{product.category}</Link></li>
            <li>/</li>
            <li style={{ color: "var(--text-secondary)" }}>{product.name}</li>
          </ol>
        </nav>

        {/* ─── PRODUCT GRID ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* ─── LEFT: Image ──────────────────────────────── */}
          <div className="space-y-4">
            {/* Main Image with inline zoom */}
            <div
              ref={imageWrapRef}
              className="relative aspect-square overflow-hidden rounded-sm cursor-crosshair select-none"
              style={{ backgroundColor: "var(--bg-sidebar)" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZooming(true)}
              onMouseLeave={() => setZooming(false)}
              onClick={() => setLightboxOpen(true)}
            >
              {/* Base image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{
                  transform: zooming ? "scale(1.8)" : "scale(1)",
                  transformOrigin: zooming ? `${zoomPos.x}% ${zoomPos.y}%` : "center",
                }}
              />

              {/* Zoom hint */}
              {!zooming && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm" style={{ backgroundColor: "rgba(26,21,17,0.55)", color: "rgba(255,255,255,0.85)" }}>
                  <ZoomIn size={14} />
                  <span className="text-[10px] tracking-widest uppercase">Hover to zoom · Click to expand</span>
                </div>
              )}
            </div>


          </div>

          {/* ─── RIGHT: Details ───────────────────────────── */}
          <div className="lg:py-4">
            {/* Category + Rating */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--accent-gold)" }}>
                {product.category}
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    className={s <= 4 ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                  />
                ))}
                <span className="text-[10px] ml-1" style={{ color: "var(--text-muted)" }}>
                  (47 reviews)
                </span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-light tracking-wide leading-tight" style={{ color: "var(--text-primary)" }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <p className="text-2xl font-medium" style={{ color: "var(--text-primary)" }}>
                ${fmt(product.price)}
              </p>
              <p className="text-xs tracking-wider line-through" style={{ color: "var(--text-muted)" }}>
                ${fmt(product.price * 1.25)}
              </p>
              <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "rgba(166,124,46,0.1)", color: "var(--accent-gold)" }}>
                20% off
              </span>
            </div>

            <div className="w-16 h-px mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />

            {/* Short description */}
            <p className="mt-6 leading-relaxed font-light text-sm" style={{ color: "var(--text-secondary)" }}>
              {product.description}
            </p>

            {/* Material badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: "rgba(166,124,46,0.06)", border: "1px solid rgba(166,124,46,0.15)" }}>
              <Gem size={12} style={{ color: "var(--accent-gold)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{product.material}</span>
            </div>

            {/* ─── Color Selector ────────────────────────── */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Color: <strong className="font-medium" style={{ color: "var(--text-primary)" }}>{selectedColor}</strong>
                </span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all duration-200"
                    style={{
                      border: selectedColor === color ? "2px solid var(--accent-gold)" : "1px solid var(--border-warm)",
                      backgroundColor: selectedColor === color ? "rgba(166,124,46,0.06)" : "transparent",
                      color: selectedColor === color ? "var(--accent-gold)" : "var(--text-secondary)",
                    }}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${colorSwatch[color] || "bg-gray-300"}`} />
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Size Selector ──────────────────────────── */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Size: <strong className="font-medium" style={{ color: "var(--text-primary)" }}>{selectedSize}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 text-xs rounded-sm transition-all duration-200"
                    style={{
                      border: selectedSize === size ? "2px solid var(--accent-gold)" : "1px solid var(--border-warm)",
                      backgroundColor: selectedSize === size ? "rgba(166,124,46,0.06)" : "transparent",
                      color: selectedSize === size ? "var(--accent-gold)" : "var(--text-secondary)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Quantity + Actions ──────────────────────── */}
            <div className="mt-8 space-y-4">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Quantity</span>
                <div className="flex items-center" style={{ border: "1px solid var(--border-warm)" }}>
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2.5 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm min-w-[2.5rem] text-center font-medium" style={{ color: "var(--text-primary)" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2.5 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) addToCart(product);
                  }}
                  className="flex-1 flex items-center justify-center gap-3 py-4 text-white text-sm tracking-widest uppercase transition-all duration-300 rounded-sm"
                  style={{ backgroundColor: "var(--btn-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  Add to Cart — ${fmt(product.price * qty)}
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className="w-14 flex items-center justify-center border transition-all duration-300 rounded-sm"
                  style={{
                    borderColor: favored ? "#f87171" : "var(--border-warm)",
                    backgroundColor: favored ? "rgba(248,113,113,0.08)" : "transparent",
                    color: favored ? "#ef4444" : "var(--text-muted)",
                  }}
                >
                  <Heart size={20} className={favored ? "fill-red-500" : ""} />
                </button>
              </div>
            </div>

            {/* ─── Perks ────────────────────────────────────── */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { Icon: Truck, label: "Free Shipping", sub: "On all orders" },
                { Icon: Shield, label: "Lifetime Warranty", sub: "Full coverage" },
                { Icon: RotateCcw, label: "30-Day Returns", sub: "No questions" },
              ].map(({ Icon, label, sub }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-sm transition-colors"
                  style={{ backgroundColor: "var(--bg-sidebar)" }}
                >
                  <Icon size={18} className="mx-auto mb-1.5" style={{ color: "var(--accent-gold)" }} />
                  <p className="text-[10px] tracking-wider uppercase font-medium" style={{ color: "var(--text-primary)" }}>
                    {label}
                  </p>
                  <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* ─── Accordion Details ──────────────────────── */}
            <div className="mt-8" style={{ borderTop: "1px solid var(--border-warm)" }}>
              <Accordion
                title="Description"
                icon={<Info size={14} style={{ color: "var(--accent-gold)" }} />}
                defaultOpen
              >
                {product.description} Each piece from the Ethnic Andaaz collection is handcrafted with love by our artisans, ensuring unparalleled attention to detail and a finish that will last generations.
              </Accordion>

              <Accordion
                title="Materials & Care"
                icon={<Sparkles size={14} style={{ color: "var(--accent-gold)" }} />}
              >
                <p className="mb-2"><strong>Primary Material:</strong> {product.material}</p>
                <p className="mb-2">To maintain the brilliance of your jewelry, store it in the provided Ethnic Andaaz pouch when not wearing. Avoid contact with perfumes, lotions, and water. Gently polish with the included microfiber cloth after each wear.</p>
                <p>All Ethnic Andaaz pieces come with a certificate of authenticity and are ethically sourced.</p>
              </Accordion>

              <Accordion
                title="Shipping & Returns"
                icon={<Truck size={14} style={{ color: "var(--accent-gold)" }} />}
              >
                <p className="mb-2"><strong>Free Insured Shipping</strong> on all orders. Your piece will arrive in 3-5 business days in our signature gift packaging.</p>
                <p className="mb-2"><strong>30-Day Returns:</strong> Not completely in love? Return any unworn piece within 30 days for a full refund.</p>
                <p><strong>Lifetime Warranty:</strong> Every Ethnic Andaaz piece is covered against manufacturing defects for life.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* ─── RELATED PRODUCTS ──────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
                You May Also Like
              </p>
              <h2 className="text-3xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
                Related Pieces
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group rounded-sm overflow-hidden transition-all"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
                >
                  <div className="aspect-square overflow-hidden" style={{ backgroundColor: "var(--bg-sidebar)" }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--accent-gold)" }}>
                      {p.category}
                    </p>
                    <h3 className="font-light text-sm tracking-wide" style={{ color: "var(--text-primary)" }}>
                      {p.name}
                    </h3>
                    <p className="font-medium mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                      ${fmt(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── LIGHTBOX ────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={28} />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <p className="absolute bottom-6 text-white/40 text-xs tracking-widest uppercase">
            {product.name} — Click outside to close
          </p>
        </div>
      )}
    </div>
  );
}
