import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { CheckCircle, ArrowRight, Package, Receipt } from "lucide-react";

export default function OrderConfirmedPage() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
          <h2 className="text-2xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
            Order Not Found
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            We couldn't locate this order.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm tracking-widest uppercase"
            style={{ backgroundColor: "var(--btn-primary)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success */}
        <div className="text-center mb-12">
          <CheckCircle size={64} className="mx-auto mb-4" style={{ color: "var(--accent-gold)" }} />
          <h1 className="text-3xl font-light tracking-wide mb-2" style={{ color: "var(--text-primary)" }}>
            Order Confirmed!
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Thank you for your purchase. Your jewelry is on its way.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="p-6 sm:p-8 rounded-sm mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-warm)" }}>
          <div className="grid grid-cols-2 gap-6 mb-6 pb-6" style={{ borderBottom: "1px solid var(--border-warm)" }}>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>Order Number</p>
              <p className="text-sm font-medium tracking-wider" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>{order.id}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>Status</p>
              <p className="text-sm font-medium" style={{ color: "var(--accent-gold)" }}>{order.currentStatus}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>Email</p>
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>{order.shippingAddress.email}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>Payment</p>
              <p className="text-sm" style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>•••• {order.paymentLast4}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid var(--border-warm)" }}>
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{product.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Qty: {quantity}</p>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                  ${fmt(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
              <span>Subtotal</span>
              <span>${fmt(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between" style={{ color: "var(--accent-gold)" }}>
                <span>Discount</span>
                <span>-${fmt(order.discount)}</span>
              </div>
            )}
            {order.promoCode && (
              <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>Promo Used</span>
                <span>{order.promoCode}</span>
              </div>
            )}
            <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
              <span>Tax</span>
              <span>${fmt(order.tax)}</span>
            </div>
            <div className="pt-2 mt-2" style={{ borderTop: "1px solid var(--border-warm)" }}>
              <div className="flex justify-between font-medium text-base" style={{ color: "var(--text-primary)" }}>
                <span>Total</span>
                <span>${fmt(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to={`/order/${order.id}`}
            className="flex items-center justify-center gap-2 py-4 text-white text-xs tracking-widest uppercase transition-colors rounded-sm"
            style={{ backgroundColor: "var(--btn-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--btn-primary)")}
          >
            <Receipt size={16} />
            View Receipt
          </Link>
          <Link
            to={`/track-order/${order.id}`}
            className="flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase transition-colors rounded-sm"
            style={{ border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
          >
            <Package size={16} />
            Track Order
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase transition-colors rounded-sm"
            style={{ border: "1px solid var(--border-warm)", color: "var(--text-secondary)" }}
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
