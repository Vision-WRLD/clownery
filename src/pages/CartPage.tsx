import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, X, Truck } from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    discountAmount,
    postalCode,
    setPostalCode,
    shippingCost,
    shippingLabel,
    subtotalAfterDiscount,
    tax,
    grandTotal,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromo(promoInput.trim());
      setPromoInput("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <ShoppingBag size={64} className="mx-auto mb-6" style={{ color: "var(--border-warm)" }} />
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            Your Cart is Empty
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            Looks like you haven't added any pieces yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ backgroundColor: "var(--btn-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
          >
            Continue Shopping
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
            Shopping Bag
          </p>
          <h1 className="text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Your Cart
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-6 p-4 sm:p-6 rounded-sm"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-sm flex-shrink-0"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
                      {product.category}
                    </p>
                    <h3 className="font-light text-base tracking-wide mt-1" style={{ color: "var(--text-primary)" }}>
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center rounded-sm" style={{ border: "1px solid var(--border-warm)" }}>
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm min-w-[2rem] text-center" style={{ color: "var(--text-primary)" }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 transition-colors hover:text-red-500"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                    ${(product.price * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs tracking-widest uppercase transition-colors hover:text-red-500"
              style={{ color: "var(--text-muted)" }}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-sm sticky top-28" style={{ backgroundColor: "var(--bg-sidebar)" }}>
              <h3 className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--text-primary)" }}>
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal ({items.length} items)</span>
                  <span>${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>

                {/* Discount */}
                {promoCode && discountAmount > 0 && (
                  <div className="flex justify-between" style={{ color: "var(--accent-gold)" }}>
                    <span>Promo ({promoCode.label})</span>
                    <span>-${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>After Discount</span>
                  <span>${subtotalAfterDiscount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Shipping</span>
                  <span>
                    {postalCode.length >= 3
                      ? promoCode?.freeShipping
                        ? <span style={{ color: "var(--accent-gold)" }}>Free</span>
                        : `$${shippingCost.toFixed(2)}`
                      : "Enter postal code"}
                  </span>
                </div>
                {shippingLabel && (
                  <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                    <span />
                    <span className="flex items-center gap-1">
                      <Truck size={10} /> {shippingLabel}
                    </span>
                  </div>
                )}

                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Tax (8%)</span>
                  <span>${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="pt-3 mt-3" style={{ borderTop: "1px solid var(--border-warm)" }}>
                  <div className="flex justify-between font-medium text-base" style={{ color: "var(--text-primary)" }}>
                    <span>Total</span>
                    <span>${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--border-warm)" }}>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-primary)" }}>
                  Promo Code
                </p>
                {promoCode ? (
                  <div
                    className="flex items-center justify-between px-3 py-2 rounded-sm"
                    style={{ backgroundColor: "rgba(166,124,46,0.08)", border: "1px solid var(--accent-gold)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Tag size={12} style={{ color: "var(--accent-gold)" }} />
                      <span className="text-xs font-medium tracking-wider" style={{ color: "var(--accent-gold)" }}>
                        {promoCode.code} — {promoCode.label}
                      </span>
                    </div>
                    <button onClick={removePromo} className="p-1">
                      <X size={14} style={{ color: "var(--accent-gold)" }} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 text-xs tracking-wider rounded-sm focus:outline-none"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          border: `1px solid ${promoError ? "#ef4444" : "var(--border-warm)"}`,
                          color: "var(--text-primary)",
                        }}
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-colors"
                        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[10px] mt-1.5" style={{ color: "#ef4444" }}>{promoError}</p>
                    )}
                    <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>
                      Try: ANDAAZ10, WELCOME20, SHINE15, FREESHIP
                    </p>
                  </div>
                )}
              </div>

              {/* Postal Code for Shipping */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border-warm)" }}>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-primary)" }}>
                  Estimate Shipping
                </p>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal / Zip Code"
                  className="w-full px-3 py-2 text-xs tracking-wider rounded-sm focus:outline-none"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-warm)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-white text-xs tracking-widest uppercase transition-colors duration-300 rounded-sm"
                style={{ backgroundColor: "var(--btn-primary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/shop"
                className="block text-center mt-4 text-xs tracking-wider transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
