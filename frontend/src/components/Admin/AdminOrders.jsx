import { useState, useEffect } from "react";
import { adminGetOrders, adminUpdateOrderStatus } from "../../api/admin.js";

const statusColors = {
  placed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const paymentStatusColors = {
  pending: "bg-yellow-500/20 text-yellow-400",
  paid: "bg-green-500/20 text-green-400",
  failed: "bg-red-500/20 text-red-400",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await adminGetOrders();
      setOrders(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleStatusUpdate = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await adminUpdateOrderStatus(orderId, status);
      fetch();
    } catch {} finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-white/50 mt-1">{orders.length} orders</p>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-4">Order ID</th>
              <th className="text-left px-5 py-4">Customer</th>
              <th className="text-left px-5 py-4">Items</th>
              <th className="text-left px-5 py-4">Total</th>
              <th className="text-left px-5 py-4">Payment</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-right px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-white/50 font-mono text-xs">{o._id.slice(-8)}</td>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-white font-medium text-xs">{o.customer?.fullName || o.customer?.username || "—"}</p>
                    <p className="text-white/40 text-xs">{o.customer?.email}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/60 text-xs">{o.items?.length || 0} items</td>
                <td className="px-5 py-4 text-white font-mono">${o.totalAmount?.toFixed(2)}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${paymentStatusColors[o.paymentStatus] || ""}`}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={o.orderStatus}
                    onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                    disabled={updating === o._id || o.orderStatus === "delivered" || o.orderStatus === "cancelled"}
                    className="text-xs px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-white outline-none disabled:opacity-50 cursor-pointer"
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-white/40 text-xs text-right">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="7" className="px-5 py-10 text-center text-white/30">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
