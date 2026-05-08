import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { OrderProvider } from "./context/OrderContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import HistoryPage from "./pages/HistoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <FavoritesProvider>
          <OrderProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-cream)" }}>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/track-order/:id" element={<TrackOrderPage />} />
                  <Route path="/order-confirmed/:id" element={<OrderConfirmedPage />} />
                  <Route path="/order/:id" element={<OrderDetailPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </OrderProvider>
        </FavoritesProvider>
      </CartProvider>
    </HashRouter>
  );
}
