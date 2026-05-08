import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders, ShippingAddress } from "../context/OrderContext";
import { Lock, ArrowLeft, CreditCard, MapPin, Package } from "lucide-react";

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    discountAmount,
    shippingCost,
    tax,
    grandTotal,
    promoCode,
    postalCode,
    shippingLabel,
    clearCart,
  } = useCart();

  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: postalCode || "",
    country: "US",
  });

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const updateForm = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const shippingValid =
    form.firstName && form.lastName && form.email && form.address && form.city && form.state && form.postalCode;

  const paymentValid =
    cardNumber.replace(/\s/g, "").length === 16 && cardExpiry.length === 5 && cardCvc.length >= 3 && cardName;

  const handleSubmit = () => {
    if (!shippingValid || !paymentValid) return;
    setSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      const orderId = placeOrder({
        items: [...items],
        subtotal: totalPrice,
        discount: discountAmount,
        shipping: shippingCost,
        tax,
        total: grandTotal,
        promoCode: promoCode?.code || null,
        shippingAddress: form,
        paymentLast4: cardNumber.replace(/\s/g, "").slice(-4),
      });
      clearCart();
      navigate(`/order-confirmed/${orderId}`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
          <Package size={64} className="mx-auto mb-6" style={{ color: "var(--border-warm)" }} />
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            Nothing to Checkout
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            Your cart is empty. Add some beautiful pieces first.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ backgroundColor: "var(--btn-primary)" }}
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle = {
    backgroundColor: "var(--bg-card)" as string,
    border: "1px solid var(--border-warm)",
    color: "var(--text-primary)" as string,
  };

  const sectionTitle = (icon: React.ReactNode, title: string, num: number, active: boolean) => (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
        style={{
          backgroundColor: active ? "var(--accent-gold)" : "var(--border-warm)",
          color: active ? "white" : "var(--text-muted)",
        }}
      >
        {num}
      </div>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
            Secure Checkout
          </p>
          <h1 className="text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Checkout
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(["shipping", "payment", "review"] as const).map((s, i) => {
            const labels = ["Shipping", "Payment", "Review"];
            const stepIndex = { shipping: 0, payment: 1, review: 2 }[step];
            const isActive = i <= stepIndex;
            return (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <div className="w-8 sm:w-16 h-px" style={{ backgroundColor: isActive ? "var(--accent-gold)" : "var(--border-warm)" }} />
                )}
                <button
                  onClick={() => i < stepIndex && setStep(s)}
                  className="text-[10px] sm:text-xs tracking-widest uppercase px-2"
                  style={{ color: isActive ? "var(--accent-gold)" : "var(--text-muted)", cursor: i < stepIndex ? "pointer" : "default" }}
                >
                  {labels[i]}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}>
              {/* Step 1: Shipping */}
              {step === "shipping" && (
                <>
                  {sectionTitle(<MapPin size={16} style={{ color: "var(--accent-gold)" }} />, "Shipping Address", 1, true)}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>First Name *</label>
                      <input value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Last Name *</label>
                      <input value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Email *</label>
                      <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Address *</label>
                      <input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>City *</label>
                      <input value={form.city} onChange={(e) => updateForm("city", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>State *</label>
                      <input value={form.state} onChange={(e) => updateForm("state", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Postal Code *</label>
                      <input value={form.postalCode} onChange={(e) => updateForm("postalCode", e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Country</label>
                      <select
                        value={form.country}
                        onChange={(e) => updateForm("country", e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none"
                        style={inputStyle}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="JP">Japan</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => shippingValid && setStep("payment")}
                    className="w-full mt-8 py-4 text-white text-xs tracking-widest uppercase transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: shippingValid ? "var(--btn-primary)" : "var(--border-warm)",
                      cursor: shippingValid ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to Payment
                  </button>
                </>
              )}

              {/* Step 2: Payment */}
              {step === "payment" && (
                <>
                  {sectionTitle(<CreditCard size={16} style={{ color: "var(--accent-gold)" }} />, "Payment Details", 2, true)}
                  <div className="p-4 rounded-sm mb-6 flex items-center gap-2 text-[10px] tracking-wider" style={{ backgroundColor: "rgba(166,124,46,0.08)", color: "var(--accent-gold)" }}>
                    <Lock size={12} />
                    Your payment information is encrypted and secure.
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Name on Card *</label>
                      <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none" style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Card Number *</label>
                      <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none tracking-wider"
                        style={inputStyle}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Expiry *</label>
                        <input
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>CVC *</label>
                        <input
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          className="w-full px-3 py-2.5 text-sm rounded-sm focus:outline-none"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep("shipping")}
                      className="px-6 py-4 text-xs tracking-widest uppercase transition-colors rounded-sm"
                      style={{ border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => paymentValid && setStep("review")}
                      className="flex-1 py-4 text-white text-xs tracking-widest uppercase transition-colors duration-300 rounded-sm"
                      style={{
                        backgroundColor: paymentValid ? "var(--btn-primary)" : "var(--border-warm)",
                        cursor: paymentValid ? "pointer" : "not-allowed",
                      }}
                    >
                      Review Order
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Review */}
              {step === "review" && (
                <>
                  {sectionTitle(<Package size={16} style={{ color: "var(--accent-gold)" }} />, "Review Your Order", 3, true)}

                  {/* Shipping Summary */}
                  <div className="p-4 rounded-sm mb-4" style={{ backgroundColor: "var(--bg-sidebar)" }}>
                    <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Shipping To</p>
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                      {form.firstName} {form.lastName}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {form.address}, {form.city}, {form.state} {form.postalCode}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{form.email}</p>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 rounded-sm mb-4" style={{ backgroundColor: "var(--bg-sidebar)" }}>
                    <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Payment</p>
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                      Card ending in •••• {cardNumber.replace(/\s/g, "").slice(-4)}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{product.name}</p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Qty: {quantity}</p>
                        </div>
                        <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                          ${(product.price * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep("payment")}
                      className="px-6 py-4 text-xs tracking-widest uppercase transition-colors rounded-sm"
                      style={{ border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 py-4 text-white text-xs tracking-widest uppercase transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
                      style={{ backgroundColor: submitting ? "var(--border-warm)" : "var(--btn-primary)" }}
                    >
                      <Lock size={14} />
                      {submitting ? "Processing..." : `Place Order — $${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-sm sticky top-28" style={{ backgroundColor: "var(--bg-sidebar)", border: "1px solid var(--border-warm)" }}>
              <h3 className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--text-primary)" }}>
                Order Summary
              </h3>
              {/* Mini cart */}
              <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: "1px solid var(--border-warm)" }}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-sm" />
                      <span
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] flex items-center justify-center text-white"
                        style={{ backgroundColor: "var(--accent-gold)" }}
                      >
                        {quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{product.name}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{product.category}</p>
                    </div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      ${(product.price * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                {promoCode && discountAmount > 0 && (
                  <div className="flex justify-between" style={{ color: "var(--accent-gold)" }}>
                    <span>Discount ({promoCode.label})</span>
                    <span>-${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Shipping {shippingLabel && `(${shippingLabel})`}</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Tax (8%)</span>
                  <span>${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-2 mt-2" style={{ borderTop: "1px solid var(--border-warm)" }}>
                  <div className="flex justify-between font-medium text-base" style={{ color: "var(--text-primary)" }}>
                    <span>Total</span>
                    <span>${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
