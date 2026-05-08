import { useState, useEffect, useCallback } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { DecorativeDivider } from "./DecorativeElements";

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = 3;
const AUTO_SCROLL_INTERVAL = 4000;

export default function JewelryCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % TOTAL_PAGES);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextPage, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [nextPage]);

  const currentProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ backgroundColor: "var(--accent-gold-light)" }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "var(--accent-gold)" }} />

      {/* Section Header */}
      <div className="text-center mb-14 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles size={14} style={{ color: "var(--accent-gold)" }} />
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "var(--accent-gold)" }}>
            Curated For You
          </p>
          <Sparkles size={14} style={{ color: "var(--accent-gold)" }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
          Featured Pieces
        </h2>
        <DecorativeDivider className="mt-6" />
      </div>

      {/* Carousel Container */}
      <div className="relative z-10">
        {/* Navigation buttons */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 hidden sm:flex"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            color: "var(--text-secondary)",
            boxShadow: "0 4px 20px rgba(61, 50, 41, 0.1)"
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 hidden sm:flex"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            color: "var(--text-secondary)",
            boxShadow: "0 4px 20px rgba(61, 50, 41, 0.1)"
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Products grid with animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} showBadge={index === 0} badgeVariant="new" />
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="flex items-center justify-center gap-3 mt-10 relative z-10">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentPage ? "w-10 h-2.5" : "w-2.5 h-2.5"
            }`}
            style={{
              backgroundColor: i === currentPage ? "var(--accent-gold)" : "var(--border-warm)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
