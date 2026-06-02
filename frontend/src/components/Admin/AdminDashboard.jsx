import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminGetUsers, adminGetProducts, adminGetOrders } from "../../api/admin.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    Promise.allSettled([
      adminGetUsers(),
      adminGetProducts(),
      adminGetOrders(),
    ]).then(([users, products, orders]) => {
      const u = users.status === "fulfilled" ? users.value.data.data.length : 0;
      const p = products.status === "fulfilled" ? products.value.data.data.length : 0;
      const o = orders.status === "fulfilled" ? orders.value.data.data : [];
      const r = o.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
      setStats({ users: u, products: p, orders: o.length, revenue: r });
    });
  }, []);

  const cards = [
    { label: "Users", value: stats.users, to: "/admin/users", valueClass: "text-blue-400" },
    { label: "Products", value: stats.products, to: "/admin/products", valueClass: "text-emerald-400" },
    { label: "Orders", value: stats.orders, to: "/admin/orders", valueClass: "text-purple-400" },
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, to: "/admin/orders", valueClass: "text-amber-400" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-white/50 mb-8">Overview of your store</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all">
            <p className="text-sm text-white/40">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.valueClass}`}>{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white mb-3">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/products" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">Manage Products</Link>
            <Link to="/admin/categories" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">Manage Categories</Link>
            <Link to="/admin/orders" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">View Orders</Link>
            <Link to="/admin/users" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">Manage Users</Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white mb-3">Store Links</h2>
          <div className="space-y-2">
            <Link to="/" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">View Landing Page</Link>
            <Link to="/account" className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors">Your Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
