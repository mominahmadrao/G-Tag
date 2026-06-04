import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/Authcontext.jsx";
import { useCart } from "../context/CartContext/CartContext.jsx"; // Hooked into your verified context layer
import axios from "@/api/axios";
import {
  ShoppingCart,
  User,
  Star,
  Lock,
  Truck,
  Headphones,
  Hand,
  ArrowRight,
  Menu,
  X,
  Plus,
  Check,
  Heart,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { CartDrawer } from "./Cart/CartDrawer";

export default function LandingPage() {
  const { user } = useAuth();
  const { addToCart, getCartTotals } = useCart();
  const { finalTotal, itemsCount, hasDiscount, discountPercentage } =
    getCartTotals();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setProductsLoading(true);
        const response = await axios.get("/products");
        if (response.data?.success) {
          setDbProducts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to sync database catalog items:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const triggerToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleDispatchToCart = async (productId, productName) => {
    if (!user) {
      triggerToast("Authentication required. Redirecting to access nodes...");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const result = await addToCart(productId, 1);
    if (result.success) {
      triggerToast(`Added ${productName} to cart!`);
    } else {
      triggerToast(`Error: ${result.message}`);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const testimonials = [
    {
      quote:
        "G-TAG proved to be an impeccable website for fulfilling all of my gaming requirements. Their products and services are all almost quality and the prices are highly reasonably I rely on them safely for any personal gaming experience.",
      name: "JENNIFER LEWIS",
      role: "Competitive Gamer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      quote:
        "Ever need a good friendly reminder for the upcoming gamer? Ever need any of these person to help with your devices having any issues? This website is that for you.",
      name: "ALICIA HEART",
      role: "Streamer & Creator",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased scroll-smooth selection:bg-lime-500 selection:text-black">
      {/* Dynamic Floating Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-black/90 backdrop-blur-md text-white border border-lime-500/30 px-4 py-3.5 rounded-lg shadow-2xl flex items-center justify-between gap-3 animate-fade-in-up"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span className="text-xs font-semibold tracking-wide">
                {toast.message}
              </span>
            </div>
            <Check className="h-4 w-4 text-lime-400 shrink-0" />
          </div>
        ))}
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/GTAG.png"
              alt="GTAG Shield Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-all duration-300 group-hover:scale-110"
              style={{
                filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.45))",
              }}
            />
            <span
              className="text-xl sm:text-2xl font-black tracking-widest uppercase bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110"
              style={{
                filter: "drop-shadow(0 0 6px rgba(132, 204, 22, 0.15))",
              }}
            >
              G_TAG
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-12 lg:gap-16 text-sm font-bold tracking-[0.2em] text-gray-300 uppercase">
            <a
              href="#"
              className="hover:text-lime-400 transition-colors relative py-2 group/item"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
            <a
              href="#products"
              className="hover:text-lime-400 transition-colors relative py-2 group/item"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
            <Link
              to="/subscriptions"
              className="hover:text-lime-400 text-emerald-400 transition-colors relative py-2 group/item"
            >
              Premium SaaS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </Link>
            <a
              href="#about"
              className="hover:text-lime-400 transition-colors relative py-2 group/item"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
          </nav>

          <div className="flex items-center gap-6 text-white">
            {itemsCount > 0 && (
              <span className="hidden sm:inline-block font-mono text-sm font-semibold text-emerald-400">
                Total: Rs. {finalTotal}
              </span>
            )}

            {user && <CartDrawer />}

            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-2 p-1.5 px-3 border border-white/20 hover:border-white/50 rounded-full hover:bg-white/10 transition-all text-sm font-semibold"
              >
                <User className="h-4 w-4 text-lime-400" />
                <span className="max-w-[100px] truncate">{user.username}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 border border-white/20 hover:border-white/50 rounded-full hover:bg-white/10 transition-all cursor-pointer block"
              >
                <User className="h-4 w-4" />
              </Link>
            )}

            <button
              className="md:hidden p-2 text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/15 px-6 py-6 space-y-4">
            <nav className="flex flex-col gap-4 text-base font-semibold tracking-wider text-gray-300 uppercase">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Products
              </a>
              <Link
                to="/subscriptions"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white text-emerald-400 transition-colors"
              >
                Premium SaaS
              </Link>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                About
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[92vh] min-h-[650px] flex items-center justify-center text-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 mt-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white tracking-wider leading-none mb-6">
            ELEVATE YOUR GAMING
            <span className="block mt-2 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent pb-3">
              EXPERIENCE
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] text-gray-300 uppercase mb-10 max-w-2xl mx-auto leading-relaxed">
            And Bring Yourself to the Next Level
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#products"
              className="inline-block bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-extrabold uppercase tracking-widest px-10 py-4 text-xs rounded transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.45)] hover:shadow-[0_0_35px_rgba(132,204,22,0.75)] hover:-translate-y-0.5 cursor-pointer"
            >
              Browse Marketplace
            </a>
            <Link
              to="/subscriptions"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold uppercase tracking-widest px-10 py-4 text-xs rounded border border-transparent shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all duration-300"
            >
              Explore Premium Tiers
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        id="products"
        className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Product Catalog
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-lime-500 to-cyan-500 mt-4 rounded-full" />
          </div>

          {hasDiscount && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl text-emerald-700 text-xs font-bold font-mono shadow-sm">
              <Sparkles className="h-4 w-4 animate-spin text-emerald-500" />
              <span>
                SaaS DISCOUNT ACTIVE: Save {discountPercentage}% at Checkout!
              </span>
            </div>
          )}
        </div>

        {productsLoading ? (
          <div className="text-center py-24 text-sm font-mono text-slate-400">
            Querying store database records...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-lime-500/20 transition-all duration-500 flex flex-col group"
              >
                <div className="w-full h-72 bg-gradient-to-tr from-gray-50 to-gray-100/50 rounded-xl p-6 flex items-center justify-center overflow-hidden mb-6 relative">
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400"
                    }
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-darken transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors border border-gray-100"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites[product._id] ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </button>
                  <div className="absolute inset-0 bg-[radial-gradient(#84cc1605_1px,transparent_1px)] bg-[size:16px_16px] opacity-100" />
                </div>

                <div className="flex gap-1 mb-2 text-lime-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-lime-500 stroke-none"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[10px] font-extrabold text-lime-600 uppercase tracking-widest bg-lime-50 px-2 py-0.5 rounded-full border border-lime-100">
                    {product.category?.name || "Hardware"}
                  </span>
                  {product.isFeatured && (
                    <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-0.5">
                      ★ Premium Gated
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug mb-4 min-h-[56px] group-hover:text-lime-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-extrabold text-gray-900">
                      Rs. {product.price}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Stock: {product.stock} units
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleDispatchToCart(product._id, product.name)
                    }
                    disabled={product.stock < 1}
                    className="bg-gray-900 hover:bg-lime-500 hover:text-black text-white text-xs font-bold uppercase py-2.5 px-5 rounded-lg transition-all cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    {product.stock > 0 ? "Add To Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Our Goal Section */}
      <section
        id="about"
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-t border-b border-gray-100"
      >
        <div
          className="relative min-h-[450px] lg:min-h-full bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/70 via-purple-950/40 to-black/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-lime-500/10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="absolute w-44 h-44 rounded-full border border-lime-400/20 animate-spin" />
            <div className="absolute w-36 h-36 rounded-full border border-dashed border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
            <div className="relative p-6 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-pulse">
              <Hand className="h-16 w-16 text-cyan-400 stroke-[1.25]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-lime-400 mt-4 bg-black/60 px-2 py-0.5 rounded border border-lime-400/20 shadow-md">
            </span>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-20 lg:p-24 flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            <span className="text-xs font-black tracking-[0.2em] text-lime-600 uppercase">
              Our Goal
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            For The Gaming Community All Around The World
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            We at G-TAG help to provide our commuters, especially gamers,
            with quality gaming products and customer services with the hope
            that they can get the top-watch gaming experience.
          </p>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              What Our Customers Say
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-lime-500 to-cyan-500 mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lime-500 font-serif text-6xl leading-none select-none">
                    “
                  </span>
                  <MessageSquare className="h-5 w-5 text-gray-300 group-hover:text-lime-400 transition-colors" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8 flex-grow">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-lime-500/20 group-hover:border-lime-500 transition-colors"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 tracking-widest uppercase">
                      {t.name}
                    </h4>
                    <span className="text-[10px] text-lime-600 font-bold tracking-wide block mt-0.5">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Feature Badges Banner */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-t border-b border-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-tr from-lime-600 to-emerald-600 p-3.5 rounded-full text-white mr-4 shadow-md shadow-lime-600/10">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-1">
                Secure Payment
              </h3>
              <p className="text-xs text-gray-500">
                Confidential transactions, and protected
              </p>
            </div>
          </div>
          <div className="flex items-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-tr from-lime-600 to-emerald-600 p-3.5 rounded-full text-white mr-4 shadow-md shadow-lime-600/10">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-1">
                Delivered With Care
              </h3>
              <p className="text-xs text-gray-500">
                Local and swift shipment to door
              </p>
            </div>
          </div>
          <div className="flex items-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-tr from-lime-600 to-emerald-600 p-3.5 rounded-full text-white mr-4 shadow-md shadow-lime-600/10">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-1">
                Excellent Service
              </h3>
              <p className="text-xs text-gray-500">
                Always ready to help and respond
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer
        id="contact"
        className="bg-black text-gray-400 py-24 px-6 relative overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none text-gray-800">
          <svg
            className="w-[30rem] h-[30rem]"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50,0 C50,30 70,50 100,50 C70,50 50,70 50,100 C50,70 30,50 0,50 C30,50 50,30 50,0 Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center gap-3 mb-8">
            <img
              src="/GTAG.png"
              alt="GTAG Shield Logo"
              className="h-14 w-14 object-contain"
              style={{
                filter: "drop-shadow(0 0 12px rgba(132, 204, 22, 0.5))",
              }}
            />
            <span
              className="text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 8px rgba(132, 204, 22, 0.2))" }}
            >
              G_TAG
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-12 sm:gap-16 text-xs font-bold tracking-[0.2em] uppercase mb-12">
            <a
              href="#"
              className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
            <a
              href="#products"
              className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
            <Link
              to="/subscriptions"
              className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem"
            >
              Premium SaaS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </Link>
          </nav>

          <p className="text-[10px] tracking-widest text-gray-700 uppercase border-t border-white/10 pt-8 font-mono">
            &copy; 2026 G-TAG. Powered by G-TAG.
          </p>
        </div>
      </footer>
    </div>
  );
}
