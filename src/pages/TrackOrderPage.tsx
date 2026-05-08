import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders, OrderStatus } from "../context/OrderContext";
import {
  Package,
  Search,
  MapPin,
  Truck,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Eye,
  Receipt,
} from "lucide-react";

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  Confirmed: <CheckCircle2 size={16} />,
  Processing: <Clock size={16} />,
  Shipped: <Package size={16} />,
  "In Transit": <Truck size={16} />,
  "Out for Delivery": <Truck size={16} />,
  Delivered: <CheckCircle2 size={16} />,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  Confirmed: "var(--accent-gold)",
  Processing: "var(--accent-gold)",
  Shipped: "#2563eb",
  "In Transit": "#7c3aed",
  "Out for Delivery": "#ea580c",
  Delivered: "#16a34a",
};

function TrackingTimeline({
  steps,
  currentStatus,
}: {
  steps: { status: OrderStatus; timestamp: string; description: string }[];
  currentStatus: OrderStatus;
}) {
  const currentIdx = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="relative">
      {steps.map((step, idx) => {
        const isCompleted = idx <= currentIdx;
        const isCurrent = step.status === currentStatus;
        const hasTimestamp = !!step.timestamp;

        return (
          <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: isCompleted
                    ? isCurrent
                      ? STATUS_COLORS[step.status]
                      : `${STATUS_COLORS[step.status]}20`
                    : "var(--bg-sidebar)",
                  border: isCurrent
                    ? `2px solid ${STATUS_COLORS[step.status]}`
                    : "2px solid var(--border-warm)",
                  color: isCompleted
                    ? isCurrent
                      ? "white"
                      : STATUS_COLORS[step.status]
                    : "var(--text-muted)",
                }}
              >
                {STATUS_ICONS[step.status]}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="w-0.5 flex-1 mt-1 min-h-[2rem]"
                  style={{
                    backgroundColor: isCompleted
                      ? STATUS_COLORS[step.status]
                      : "var(--border-warm)",
                  }}
                />
              )}
            </div>

            <div className="pt-1.5 pb-2 min-w-0">
              <p
                className="text-sm font-medium tracking-wide"
                style={{
                  color: isCompleted ? "var(--text-primary)" : "var(--text-muted)",
                }}
              >
                {step.status}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {step.description}
              </p>
              {hasTimestamp && (
                <p className="text-[10px] mt-1 tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {new Date(step.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackOrderPage() {
  const { id } = useParams<{ id: string }>();
  const { getOrder, orders } = useOrders();
  const [searchInput, setSearchInput] = useState(id || "");
  const [trackingId, setTrackingId] = useState(id || "");

  const order = trackingId ? getOrder(trackingId) : undefined;

  const handleSearch = () => {
    if (searchInput.trim()) {
      setTrackingId(searchInput.trim().toUpperCase());
    }
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="pt-24 pb-20 min-h-screen page-enter">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--accent-gold)" }}>
            Shipment Tracking
          </p>
          <h1 className="text-4xl font-light tracking-wide" style={{ color: "var(--text-primary)" }}>
            Track Your Order
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: "var(--accent-gold)" }} />
        </div>

        {/* Search */}
        <div
          className="flex gap-3 mb-10 p-6 rounded-sm"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
        >
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter order number (e.g. EAJ-XXXXXXXX)"
              className="w-full pl-10 pr-3 py-3 text-sm rounded-sm focus:outline-none tracking-wider"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                border: "1px solid var(--border-warm)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 text-white text-xs tracking-widest uppercase rounded-sm transition-colors flex-shrink-0"
            style={{ backgroundColor: "var(--btn-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
          >
            Track
          </button>
        </div>

        {/* Order Found */}
        {order && (
          <div className="space-y-6">
            {/* Order Info */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border-warm)" }}>
                <div>
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    Order Number
                  </p>
                  <p className="text-sm font-medium tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>
                    {order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    Order Date
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wider font-medium"
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

              {/* Shipping Address */}
              <div className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName} ·{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <h3 className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--text-primary)" }}>
                Shipment Progress
              </h3>
              <TrackingTimeline steps={order.trackingSteps} currentStatus={order.currentStatus} />
            </div>

            {/* Items Summary */}
            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
                  Items in This Order
                </h3>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  ${fmt(order.total)}
                </span>
              </div>
              <div className="space-y-3">
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                        {product.name}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        Qty: {quantity}
                      </p>
                    </div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      ${fmt(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* View Full Details Button */}
            <Link
              to={`/order/${order.id}`}
              className="w-full flex items-center justify-center gap-2 py-4 text-white text-xs tracking-widest uppercase rounded-sm transition-colors"
              style={{ backgroundColor: "var(--btn-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
            >
              <Eye size={16} />
              View Full Order Details
            </Link>
          </div>
        )}

        {/* No Order Found */}
        {trackingId && !order && (
          <div className="text-center py-12">
            <Circle size={48} className="mx-auto mb-4" style={{ color: "var(--border-warm)" }} />
            <h3 className="text-lg font-light tracking-wide mb-2" style={{ color: "var(--text-primary)" }}>
              Order Not Found
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No order found with ID <strong>{trackingId}</strong>. Please check and try again.
            </p>
          </div>
        )}

        {/* Recent Orders */}
        {orders.length > 0 && !trackingId && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Receipt size={14} style={{ color: "var(--accent-gold)" }} />
              <h3 className="text-xs tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
                Recent Orders
              </h3>
            </div>
            <div className="space-y-3">
              {orders.map((o) => (
                <Link
                  key={o.id}
                  to={`/order/${o.id}`}
                  className="flex items-center justify-between p-4 rounded-sm transition-all group"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}
                >
                  <div className="flex items-center gap-4">
                    {/* Mini item images */}
                    <div className="flex -space-x-2">
                      {o.items.slice(0, 3).map(({ product }, i) => (
                        <img
                          key={product.id}
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-sm border-2 relative"
                          style={{ borderColor: "var(--bg-card)", zIndex: 3 - i }}
                        />
                      ))}
                      {o.items.length > 3 && (
                        <div
                          className="w-10 h-10 rounded-sm flex items-center justify-center text-[10px] font-medium border-2"
                          style={{ borderColor: "var(--bg-card)", backgroundColor: "var(--bg-sidebar)", color: "var(--text-muted)", zIndex: 0 }}
                        >
                          +{o.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {o.id}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {o.items.reduce((s, i) => s + i.quantity, 0)} items · ${fmt(o.total)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] tracking-wider font-medium"
                      style={{
                        backgroundColor: `${STATUS_COLORS[o.currentStatus]}15`,
                        color: STATUS_COLORS[o.currentStatus],
                      }}
                    >
                      {o.currentStatus}
                    </span>
                    <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
