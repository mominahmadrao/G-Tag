import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext/Authcontext.jsx";
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
  MessageSquare
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState("all");
  const [favorites, setFavorites] = useState({});
  const [toasts, setToasts] = useState([]);

  // Trigger temporary notification toast when item added to cart
  const triggerToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (title) => {
    setCartCount(prev => prev + 1);
    triggerToast(`Added ${title} to cart successfully!`);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mock Products data replicating the original screenshot layout with enhanced descriptions
  const products = [
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      category: "Mobile",
      price: "$765.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Logitech G Pro X + Gaming Headset",
      category: "Audio",
      price: "$39.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Razer BlackWidow V3 Pro - Wireless Keyboard",
      category: "Peripherals",
      price: "$223.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Razer Basilisk V3 Customizable Mouse",
      category: "Peripherals",
      price: "$190.09",
      rating: 5,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Laptops 1:9 Extreme Gaming Laptop",
      category: "Computers",
      price: "$3,299.09",
      rating: 5,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Xbox Series S Controller & Console Pack",
      category: "Consoles",
      price: "$149.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "G-TAG proved to be an impeccable website for fulfilling all of my gaming requirements. Their products and services are all almost quality and the prices are highly reasonably I rely on them safely for any personal gaming experience.",
      name: "JENNIFER LEWIS",
      role: "Competitive Gamer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Ever need a good friendly reminder for the upcoming gamer? Ever need any of these person to help with your devices having any issues? This website is that for you.",
      name: "ALICIA HEART",
      role: "Streamer & Creator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Getting to know this website really helped me and my friends to choose the styles of mobile phones and laptops, I have never seen any service more cooperative and information than what this website has to offer.",
      name: "JANE DOE",
      role: "Hardware Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased scroll-smooth selection:bg-lime-500 selection:text-black">
      
      {/* Dynamic Floating Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className="pointer-events-auto bg-black/90 backdrop-blur-md text-white border border-lime-500/30 px-4 py-3.5 rounded-lg shadow-2xl flex items-center justify-between gap-3 animate-fade-in-up"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
            </div>
            <Check className="h-4 w-4 text-lime-400 shrink-0" />
          </div>
        ))}
      </div>

      {/* 1. Header / Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo with clean drop shadow glow and styled brand typography */}
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src="/GTAG.png" 
              alt="GTAG Shield Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-all duration-300 group-hover:scale-110"
              style={{ filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.45))" }}
            />
            {/* Unified, premium G_TAG logo typography using a cohesive brand gradient */}
            <span className="text-xl sm:text-2xl font-black tracking-widest uppercase bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110" style={{ filter: "drop-shadow(0 0 6px rgba(132, 204, 22, 0.15))" }}>
              G_TAG
            </span>

          </a>

          {/* Desktop Navigation Links - Widened spacing and premium growing gradient underlines */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-24 text-sm font-bold tracking-[0.2em] text-gray-300 uppercase">
            <a href="#" className="hover:text-lime-400 transition-colors relative py-2 group/item">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
            <a href="#products" className="hover:text-lime-400 transition-colors relative py-2 group/item">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
            <a href="#about" className="hover:text-lime-400 transition-colors relative py-2 group/item">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
            <a href="#contact" className="hover:text-lime-400 transition-colors relative py-2 group/item">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/item:w-full" />
            </a>
          </nav>


          {/* Right Side Icons */}
          <div className="flex items-center gap-6 text-white">
            {/* Price display with subtle monospace glow */}
            <span className="hidden sm:inline-block font-mono text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              ${(cartCount * 19.90).toFixed(2)}
            </span>

            {/* Shopping Cart with Badge */}
            <button 
              onClick={() => handleAddToCart("Quick Item")}
              className="relative p-2 text-lime-400 hover:text-lime-300 transition-colors cursor-pointer group"
            >
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 bg-lime-500 text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(132,204,22,0.4)] border border-black/20 animate-pulse">
                {cartCount}
              </span>
            </button>

            {/* User Profile / Dashboard Link */}
            {user ? (
              <Link
                to="/account"
                className="flex items-center gap-2 p-1.5 px-3 border border-white/20 hover:border-white/50 rounded-full hover:bg-white/10 transition-all text-sm font-semibold"
              >
                <User className="h-4 w-4 text-lime-400" />
                <span className="max-w-[100px] truncate">{user.username}</span>
              </Link>
            ) : (
              <Link to="/login" className="p-2 border border-white/20 hover:border-white/50 rounded-full hover:bg-white/10 transition-all cursor-pointer block">
                <User className="h-4 w-4" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative h-[92vh] min-h-[650px] flex items-center justify-center text-center overflow-hidden bg-black">
        {/* Background Image of high-quality premium gaming rig */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=2000&auto=format&fit=crop')" 
          }}
        />

        {/* Dramatic Ambient Gradients & Particle Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-[140px] animate-pulse" />
        
        {/* Fine Diagonal Grid overlay for high-tech aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 mt-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white tracking-wider leading-none mb-6">
            ELEVATE YOUR GAMING
            <span className="block mt-2 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent pb-3">EXPERIENCE</span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.3em] text-gray-300 uppercase mb-10 max-w-2xl mx-auto leading-relaxed">
            And Bring Yourself to the Next Level
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#products"
              className="inline-block bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-extrabold uppercase tracking-widest px-10 py-4 text-xs rounded transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.45)] hover:shadow-[0_0_35px_rgba(132,204,22,0.75)] hover:-translate-y-0.5 cursor-pointer"
            >
              Call To Action
            </a>
            <a 
              href="#about"
              className="inline-block bg-white/5 hover:bg-white/10 text-white font-extrabold uppercase tracking-widest px-10 py-4 text-xs rounded border border-white/15 hover:border-white/30 transition-all duration-300"
            >
              Explore Mission
            </a>
          </div>
        </div>

        {/* Scroll indicator removed per user request */}

      </section>

      {/* 3. Featured Products Section */}
      <section id="products" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-lime-500 to-cyan-500 mt-4 rounded-full" />
          </div>

          <a 
            href="#products"
            className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-black font-extrabold uppercase tracking-wider text-xs px-6 py-4 rounded transition-all shadow-[0_4px_15px_rgba(132,204,22,0.2)] hover:shadow-[0_6px_25px_rgba(132,204,22,0.4)] flex items-center gap-2 group cursor-pointer"
          >
            Call To Action
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-lime-500/20 transition-all duration-500 flex flex-col group"
            >
              {/* Image Box Container with Grid Background Frame */}
              <div className="w-full h-72 bg-gradient-to-tr from-gray-50 to-gray-100/50 rounded-xl p-6 flex items-center justify-center overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-w-full max-h-full object-contain mix-blend-darken transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Heart/Favorite Button overlay */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors border border-gray-100"
                >
                  <Heart className={`h-4 w-4 ${favorites[product.id] ? "fill-red-500 text-red-500" : ""}`} />
                </button>

                {/* Subdued tech outline grid detail */}
                <div className="absolute inset-0 bg-[radial-gradient(#84cc1605_1px,transparent_1px)] bg-[size:16px_16px] opacity-100" />
              </div>

              {/* Glowing Rating Stars */}
              <div className="flex gap-1 mb-2 text-lime-500">
                {[...Array(product.rating)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    className="h-4 w-4 fill-lime-500 stroke-none"
                  />
                ))}
              </div>

              {/* Category tag inside nice rounded border */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-extrabold text-lime-600 uppercase tracking-widest bg-lime-50 px-2 py-0.5 rounded-full border border-lime-100">
                  {product.category}
                </span>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Featured
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug mb-4 min-h-[56px] group-hover:text-lime-600 transition-colors">
                {product.title}
              </h3>

              {/* Price and Buy Button */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="font-serif text-xl font-extrabold text-gray-900">
                  {product.price}
                </span>

                <button 
                  onClick={() => handleAddToCart(product.title)}
                  className="bg-gray-900 hover:bg-lime-500 hover:text-black text-white text-xs font-bold uppercase py-2.5 px-5 rounded-lg transition-all cursor-pointer group-hover:bg-lime-600 group-hover:text-white"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Our Goal Section (Split Section) */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-t border-b border-gray-100">
        {/* Left Side: Glowing Mechanical Keyboard Background with cyber Overlay */}
        <div 
          className="relative min-h-[450px] lg:min-h-full bg-cover bg-center overflow-hidden"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop')" 
          }}
        >
          {/* Neon glow mask */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/70 via-purple-950/40 to-black/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-lime-500/10 mix-blend-overlay" />

          {/* Stylized tracking HUD overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Nested concentric circles acting as scanner reticle */}
            <div className="absolute w-44 h-44 rounded-full border border-lime-400/20 animate-spin" />
            <div className="absolute w-36 h-36 rounded-full border border-dashed border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
            
            {/* The cursor hand pointer overlay */}
            <div className="relative p-6 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-pulse">
              <Hand className="h-16 w-16 text-cyan-400 stroke-[1.25]" />
            </div>
            
            {/* Grid coordinates */}
            <span className="text-[10px] font-mono tracking-widest text-lime-400 mt-4 bg-black/60 px-2 py-0.5 rounded border border-lime-400/20 shadow-md">
              LOC // 45.92-E
            </span>
          </div>
        </div>

        {/* Right Side: Text & Mission */}
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
            We help to G-TAG, we to provide our commuters, especially gamers, with quality gaming products and customer services with the hope that. However, so you can get the top-watch gaming experience.
          </p>

          <a 
            href="#about"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-700 to-lime-800 hover:from-lime-600 hover:to-lime-700 text-white font-extrabold uppercase tracking-widest text-xs px-8 py-4.5 rounded transition-all shadow-md w-fit cursor-pointer"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* 5. Testimonials Section ("What Our Customers Say") */}
      <section className="py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              What Our Customers Say
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-lime-500 to-cyan-500 mt-4 rounded-full" />
          </div>

          {/* Testimonial Cards structured with elegant grey border blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Neon quotation icon banner */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lime-500 font-serif text-6xl leading-none select-none">
                    “
                  </span>
                  <MessageSquare className="h-5 w-5 text-gray-300 group-hover:text-lime-400 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8 flex-grow">
                  {t.quote}
                </p>

                {/* User Bio Card */}
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
          {/* Badge 1 */}
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

          {/* Badge 2 */}
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

          {/* Badge 3 */}
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
      <footer id="contact" className="bg-black text-gray-400 py-24 px-6 relative overflow-hidden">
        {/* Giant Sparkle/Star SVG outline background on the right */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none text-gray-800">
          <svg className="w-[30rem] h-[30rem]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C50,30 70,50 100,50 C70,50 50,70 50,100 C50,70 30,50 0,50 C30,50 50,30 50,0 Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Logo with matching drop shadow glow */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <img 
              src="/GTAG.png" 
              alt="GTAG Shield Logo" 
              className="h-14 w-14 object-contain"
              style={{ filter: "drop-shadow(0 0 12px rgba(132, 204, 22, 0.5))" }}
            />
            {/* Unified G_TAG brand name in Footer */}
            <span className="text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent" style={{ filter: "drop-shadow(0 0 8px rgba(132, 204, 22, 0.2))" }}>
              G_TAG
            </span>

          </div>

          {/* Footer Nav Links - Cohesive gap spacing matching the header */}
          <nav className="flex flex-wrap justify-center gap-12 sm:gap-16 text-xs font-bold tracking-[0.2em] uppercase mb-12">
            <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
            <a href="#products" className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
            <a href="#about" className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
            <a href="#contact" className="text-gray-400 hover:text-lime-400 transition-colors relative py-1 group/fitem">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-cyan-400 transition-all duration-300 group-hover/fitem:w-full" />
            </a>
          </nav>


          {/* Newsletter Box */}
          <div className="max-w-md mx-auto mb-20">
            <h3 className="text-white text-xs font-black tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block animate-ping" />
              Follow us for upcoming news
            </h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex border border-white/15 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm focus-within:border-lime-500 transition-colors p-1">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent border-none text-white text-xs px-4 py-3.5 flex-grow outline-none placeholder-gray-500 tracking-wider font-semibold"
              />
              <button 
                type="submit" 
                className="bg-white hover:bg-lime-500 hover:text-black text-black text-xs font-extrabold uppercase px-6 rounded-lg transition-all tracking-widest cursor-pointer shadow-lg"
              >
                Join
              </button>
            </form>
          </div>

          {/* Copyright */}
          <p className="text-[10px] tracking-widest text-gray-700 uppercase border-t border-white/10 pt-8 font-mono">
            &copy; 2026 G-TAG. Powered by G-TAG.
          </p>
        </div>
      </footer>
    </div>
  );
}
