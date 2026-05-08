import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  freeShipping: boolean;
  label: string;
}

const VALID_PROMOS: PromoCode[] = [
  { code: "ANDAAZ10", discountPercent: 10, freeShipping: false, label: "10% off" },
  { code: "WELCOME20", discountPercent: 20, freeShipping: false, label: "20% off" },
  { code: "SHINE15", discountPercent: 15, freeShipping: false, label: "15% off" },
  { code: "FREESHIP", discountPercent: 0, freeShipping: true, label: "Free Shipping" },
];

export function calculateShipping(postalCode: string): number {
  const cleaned = postalCode.trim().toUpperCase();

  // Canadian postal codes (letter-digit-letter ...)
  if (/^[A-Z]/.test(cleaned)) {
    return 14.99;
  }

  // US zip codes
  const zipNum = parseInt(cleaned.substring(0, 5), 10);
  if (!isNaN(zipNum) && cleaned.length >= 5) {
    if (zipNum >= 0 && zipNum <= 29999) return 5.99;
    if (zipNum >= 30000 && zipNum <= 59999) return 7.99;
    if (zipNum >= 60000 && zipNum <= 99999) return 9.99;
  }

  // International
  return 24.99;
}

export function getShippingLabel(postalCode: string): string {
  const cleaned = postalCode.trim().toUpperCase();
  if (/^[A-Z]/.test(cleaned)) return "Canada Standard";
  const zipNum = parseInt(cleaned.substring(0, 5), 10);
  if (!isNaN(zipNum) && cleaned.length >= 5) {
    if (zipNum <= 29999) return "US East Coast";
    if (zipNum <= 59999) return "US Central";
    return "US West Coast";
  }
  return "International";
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Promo
  promoCode: PromoCode | null;
  promoError: string;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  discountAmount: number;
  // Shipping
  postalCode: string;
  setPostalCode: (code: string) => void;
  shippingCost: number;
  shippingLabel: string;
  // Totals
  subtotalAfterDiscount: number;
  tax: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoError("");
  };

  const applyPromo = (code: string): boolean => {
    const match = VALID_PROMOS.find(
      (p) => p.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (match) {
      setPromoCode(match);
      setPromoError("");
      return true;
    }
    setPromoError("Invalid promo code. Please try again.");
    return false;
  };

  const removePromo = () => {
    setPromoCode(null);
    setPromoError("");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = promoCode
    ? totalPrice * (promoCode.discountPercent / 100)
    : 0;

  const subtotalAfterDiscount = totalPrice - discountAmount;

  const shippingCost =
    postalCode.length >= 3
      ? promoCode?.freeShipping
        ? 0
        : calculateShipping(postalCode)
      : 0;

  const shippingLabel =
    postalCode.length >= 3 ? getShippingLabel(postalCode) : "";

  const tax = subtotalAfterDiscount * 0.08;
  const grandTotal = subtotalAfterDiscount + shippingCost + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
