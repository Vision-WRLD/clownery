import { useParams, Link } from "react-router-dom";
import { useOrders, OrderStatus } from "../context/OrderContext";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Truck,
  Receipt,
  Tag,
  Mail,
  Phone,
  Calendar,
  Hash,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  Confirmed: <CheckCircle2 size={14} />,
  Processing: <Clock size={14} />,
  Shipped: <Package size={14} />,
  "In Transit": <Truck size={14} />,
  "Out for Delivery": <Truck size={14} />,
  Delivered: <CheckCircle2 size={14} />,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  Confirmed: "var(--accent-gold)",
  Processing: "var(--accent-gold)",
  Shipped: "#2563eb",
  "In Transit": "#7c3aed",
  "Out for Delivery": "#ea580c",
  Delivered: "#16a34a",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
          <Receipt size={64} className="mx-auto mb-6" style={{ color: "var(--border-warm)" }} />
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            Order Not Found
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            We couldn't locate an order with that ID.
          </p>
          <Link
            to="/track-order"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase transition-colors"
            style={{ backgroundColor: "var(--btn-primary)" }}
          >
            <ArrowLeft size={16} />
            Track an Order
          </Link>
        </div>
      </div>
    );
  }

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          to="/track-order"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-8 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} />
          Back to Tracking
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "var(--accent-gold)" }}>
              Order Receipt
            </p>
            <h1 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
              Order Details
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs tracking-wider font-medium"
              style={{
                backgroundColor: `${STATUS_COLORS[order.currentStatus]}15`,
                color: STATUS_COLORS[order.currentStatus],
                border: `1px solid ${STATUS_COLORS[order.currentStatus]}30`,
              }}
            >
              {STATUS_ICONS[order.currentStatus]}
              {order.currentStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info Bar */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div className="flex items-start gap-2">
                  <Hash size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>Order ID</p>
                    <p className="text-xs font-medium tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>{order.id}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>Placed On</p>
                    <p className="text-xs" style={{ color: "var(--text-primary)" }}>{fmtDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>Payment</p>
                    <p className="text-xs" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>•••• •••• •••• {order.paymentLast4}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-gold)" }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>Email</p>
                    <p className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{order.shippingAddress.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <ShoppingBag size={16} style={{ color: "var(--accent-gold)" }} />
                <h3 className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
                  Items Purchased ({order.items.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>

              <div className="space-y-0">
                {order.items.map(({ product, quantity }, idx) => (
                  <div
                    key={product.id}
                    className={`flex gap-4 py-4 ${
                      idx !== order.items.length - 1 ? "" : ""
                    }`}
                    style={
                      idx !== order.items.length - 1
                        ? { borderBottom: "1px solid var(--border-warm)" }
                        : undefined
                    }
                  >
                    {/* Image */}
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`}>
                        <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
                          {product.category}
                        </p>
                        <h4 className="text-sm font-light tracking-wide mt-0.5" style={{ color: "var(--text-primary)" }}>
                          {product.name}
                        </h4>
                      </Link>
                      <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                        {product.material}
                      </p>

                      {/* Sizes & Colors */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.sizes.map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 text-[9px] rounded"
                            style={{ border: "1px solid var(--border-warm)", color: "var(--text-muted)" }}
                          >
                            {s}
                          </span>
                        ))}
                        {product.colors.map((c) => {
                          const colorMap: Record<string, string> = {
                            Gold: "bg-yellow-400",
                            Silver: "bg-gray-300",
                            "Rose Gold": "bg-rose-300",
                            "White Gold": "bg-gray-100 border border-gray-300",
                          };
                          return (
                            <span
                              key={c}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] rounded"
                              style={{ border: "1px solid var(--border-warm)", color: "var(--text-muted)" }}
                            >
                              <span className={`w-2 h-2 rounded-full ${colorMap[c] || "bg-gray-300"}`} />
                              {c}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          Qty: {quantity} × ${fmt(product.price)}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          ${fmt(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Receipt size={16} style={{ color: "var(--accent-gold)" }} />
                <h3 className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
                  Payment Summary
                </h3>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>${fmt(order.subtotal)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between" style={{ color: "var(--accent-gold)" }}>
                    <span className="flex items-center gap-1.5">
                      <Tag size={12} /> Discount
                    </span>
                    <span>-${fmt(order.discount)}</span>
                  </div>
                )}

                {order.promoCode && (
                  <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>Promo Applied</span>
                    <span style={{ fontFamily: "monospace" }}>{order.promoCode}</span>
                  </div>
                )}

                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>Tax (8%)</span>
                  <span>${fmt(order.tax)}</span>
                </div>

                <div className="pt-3 mt-1" style={{ borderTop: "2px solid var(--border-warm)" }}>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium" style={{ color: "var(--text-primary)" }}>Total Charged</span>
                    <span className="text-xl font-medium" style={{ color: "var(--text-primary)" }}>
                      ${fmt(order.total)}
                    </span>
                  </div>
                  <p className="text-[10px] mt-1 text-right" style={{ color: "var(--text-muted)" }}>
                    Charged to card ending in •••• {order.paymentLast4}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} style={{ color: "var(--accent-gold)" }} />
                <h3 className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
                  Shipping Address
                </h3>
              </div>
              <div className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Contact */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Phone size={16} style={{ color: "var(--accent-gold)" }} />
                <h3 className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-primary)" }}>
                  Contact Info
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                  <Mail size={12} style={{ color: "var(--text-muted)" }} />
                  <span className="text-xs">{order.shippingAddress.email}</span>
                </div>
                {order.shippingAddress.phone && (
                  <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                    <Phone size={12} style={{ color: "var(--text-muted)" }} />
                    <span className="text-xs">{order.shippingAddress.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Card Visual */}
            <div
              className="p-6 rounded-sm relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--btn-primary) 0%, var(--accent-gold) 100%)",
                color: "white",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: "rgba(255,255,255,0.06)", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full" style={{ background: "rgba(255,255,255,0.04)", transform: "translate(-30%, 30%)" }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <CreditCard size={24} style={{ opacity: 0.7 }} />
                  <div className="leading-tight" style={{ opacity: 0.6 }}>
                    <p className="text-[10px] tracking-widest uppercase">Ethnic</p>
                    <p className="text-[10px] tracking-widest uppercase">Andaaz</p>
                  </div>
                </div>
                <p className="text-lg tracking-[0.25em] mb-6" style={{ fontFamily: "monospace" }}>
                  •••• •••• •••• {order.paymentLast4}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] tracking-widest uppercase" style={{ opacity: 0.5 }}>Card Holder</p>
                    <p className="text-xs tracking-wider">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] tracking-widest uppercase" style={{ opacity: 0.5 }}>Amount</p>
                    <p className="text-xs tracking-wider font-medium">${fmt(order.total)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                to={`/track-order/${order.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 text-white text-xs tracking-widest uppercase rounded-sm transition-colors"
                style={{ backgroundColor: "var(--btn-primary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
              >
                <Truck size={14} />
                Track Shipment
              </Link>
              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase rounded-sm transition-colors"
                style={{ border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
              >
                <ShoppingBag size={14} />
                Shop Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
