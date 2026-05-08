import { useState } from "react";
import { products, allColors } from "../data/products";
import ProductCard from "../components/ProductCard";
import DualRangeSlider from "../components/DualRangeSlider";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const categories = ["All", "Rings", "Earrings", "Necklaces", "Bracelets"];

const PRICE_MIN = 0;
const PRICE_MAX = 5000;
const PRICE_STEP = 250;

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="pb-5 mb-5" style={{ borderBottom: "1px solid var(--border-warm)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={14} style={{ color: "var(--text-muted)" }} />
        ) : (
          <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
        )}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    color: true,
    size: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setActiveCategory("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const isDefaultPrice = priceRange[0] === PRICE_MIN && priceRange[1] === PRICE_MAX;

  const hasActiveFilters =
    activeCategory !== "All" ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    !isDefaultPrice;

  // Filter products
  let filtered = products;

  if (activeCategory !== "All") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  filtered = filtered.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  if (selectedColors.length > 0) {
    filtered = filtered.filter((p) =>
      p.colors.some((c) => selectedColors.includes(c))
    );
  }

  if (selectedSizes.length > 0) {
    filtered = filtered.filter((p) =>
      p.sizes.some((s) => selectedSizes.includes(s))
    );
  }

  // Sort
  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  const filterPanel = (
    <div className="space-y-0">
      {/* Category */}
      <FilterSection
        title="Category"
        isOpen={openSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="block w-full text-left px-3 py-2 text-sm rounded transition-colors duration-200"
              style={{
                backgroundColor: activeCategory === cat ? "rgba(166,124,46,0.08)" : "transparent",
                color: activeCategory === cat ? "var(--accent-gold)" : "var(--text-secondary)",
                fontWeight: activeCategory === cat ? 500 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range - Dual Slider */}
      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <DualRangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={priceRange}
          onChange={setPriceRange}
          formatLabel={(v) => `$${v.toLocaleString()}`}
        />
      </FilterSection>

      {/* Color */}
      <FilterSection
        title="Color"
        isOpen={openSections.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="space-y-1">
          {allColors.map((color) => {
            const colorMap: Record<string, string> = {
              Gold: "bg-yellow-400",
              Silver: "bg-gray-300",
              "Rose Gold": "bg-rose-300",
              "White Gold": "bg-gray-100 border border-gray-300",
            };
            const active = selectedColors.includes(color);
            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded transition-colors duration-200"
                style={{
                  backgroundColor: active ? "rgba(166,124,46,0.08)" : "transparent",
                  color: active ? "var(--accent-gold)" : "var(--text-secondary)",
                  fontWeight: active ? 500 : 400,
                }}
              >
                <span className={`w-4 h-4 rounded-full flex-shrink-0 ${colorMap[color]}`} />
                {color}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection
        title="Size"
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2">
          {["5", "6", "7", "8", "9", "S", "M", "L", "16\"", "18\"", "20\""].map(
            (size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className="px-3 py-1.5 text-xs tracking-wider border rounded transition-colors duration-200"
                  style={{
                    borderColor: active ? "var(--accent-gold)" : "var(--border-warm)",
                    backgroundColor: active ? "rgba(166,124,46,0.08)" : "transparent",
                    color: active ? "var(--accent-gold)" : "var(--text-muted)",
                  }}
                >
                  {size}
                </button>
              );
            }
          )}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full text-xs tracking-widest uppercase transition-colors py-2 mt-2 pt-4"
          style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border-warm)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-24 pb-20 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 sm:mb-3" style={{ color: "var(--accent-gold)" }}>
            Our Collection
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Indian Jewellery
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
        </div>

        {/* Sort + Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 rounded"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}
          >
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 text-white rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: "var(--accent-gold)" }}>
                !
              </span>
            )}
          </button>
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs tracking-wider uppercase rounded px-4 py-2 focus:outline-none"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-warm)",
                color: "var(--text-secondary)",
              }}
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-xl overflow-y-auto"
              style={{ backgroundColor: "var(--bg-cream)" }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--border-warm)" }}>
                <h3 className="text-sm tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5">{filterPanel}</div>
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 rounded-sm p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}>
              <h3 className="text-xs tracking-widest uppercase font-medium mb-6 pb-4" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-warm)" }}>
                Filters
              </h3>
              {filterPanel}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${(i % 6) * 80}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-sm tracking-wider" style={{ color: "var(--text-muted)" }}>
                  No products match your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-xs tracking-widest uppercase"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Clear Filters
                </button>
              </div>
            )}

            <p className="text-center text-xs mt-8 tracking-wider" style={{ color: "var(--text-muted)" }}>
              Showing {filtered.length} of {products.length} pieces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
