import { useState, useEffect } from "react";
import { adminGetPayments } from "../../api/admin.js";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetPayments()
      .then((res) => setPayments(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Payments</h1>
        <p className="text-white/50 mt-1">{payments.length} transactions</p>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-4">Transaction ID</th>
              <th className="text-left px-5 py-4">Customer</th>
              <th className="text-left px-5 py-4">Amount</th>
              <th className="text-left px-5 py-4">Method</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-right px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-white/50 font-mono text-xs">{p.transactionId || p._id.slice(-8)}</td>
                <td className="px-5 py-4 text-white text-xs">{p.customerId?.fullName || p.customerId?.username || "—"}</td>
                <td className="px-5 py-4 text-white font-mono">${p.amount?.toFixed(2)}</td>
                <td className="px-5 py-4 text-white/60 text-xs uppercase">{p.method}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/40 text-xs text-right">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan="6" className="px-5 py-10 text-center text-white/30">No payments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
