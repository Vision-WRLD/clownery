import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus =
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered";

export interface TrackingStep {
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode: string | null;
  shippingAddress: ShippingAddress;
  paymentLast4: string;
  trackingSteps: TrackingStep[];
  currentStatus: OrderStatus;
  createdAt: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderContextType {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  placeOrder: (order: Omit<Order, "id" | "trackingSteps" | "currentStatus" | "createdAt">) => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "EAJ-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function generateTrackingSteps(statuses: OrderStatus[], startIndex: number): TrackingStep[] {
  const descriptions: Record<OrderStatus, string> = {
    Confirmed: "Your order has been confirmed and payment received.",
    Processing: "Your jewelry is being carefully prepared and inspected.",
    Shipped: "Your package has been dispatched from our atelier.",
    "In Transit": "Your order is on its way to you.",
    "Out for Delivery": "Your package is out for delivery today.",
    Delivered: "Your order has been delivered. Enjoy your jewelry!",
  };

  return statuses.map((status, i) => ({
    status,
    timestamp: i <= startIndex
      ? new Date(Date.now() - (statuses.length - i) * 3600000).toISOString()
      : "",
    description: descriptions[status],
  }));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const placeOrder = (
    orderData: Omit<Order, "id" | "trackingSteps" | "currentStatus" | "createdAt">
  ): string => {
    const id = generateOrderId();
    const now = new Date().toISOString();

    // Randomly progress the tracking a few steps for demo purposes
    const allStatuses: OrderStatus[] = [
      "Confirmed",
      "Processing",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ];
    const currentStep = Math.floor(Math.random() * 3); // 0-2 for realistic demo
    const trackingSteps = generateTrackingSteps(allStatuses, currentStep);

    const order: Order = {
      ...orderData,
      id,
      trackingSteps,
      currentStatus: allStatuses[currentStep],
      createdAt: now,
    };

    setOrders((prev) => [order, ...prev]);
    return id;
  };

  return (
    <OrderContext.Provider value={{ orders, getOrder, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
}
