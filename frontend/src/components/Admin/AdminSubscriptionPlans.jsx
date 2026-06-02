import { useState, useEffect } from "react";
import { adminGetPlans, adminCreatePlan } from "../../api/admin.js";

export default function AdminSubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await adminGetPlans();
      setPlans(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (data) => {
    await adminCreatePlan(data);
    setShowCreate(false);
    fetch();
  };

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription Plans</h1>
          <p className="text-white/50 mt-1">{plans.length} plans</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
          + Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan._id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white capitalize">{plan.name}</h3>
            <p className="text-3xl font-bold text-white mt-2">${plan.price}<span className="text-sm text-white/40 font-normal">/{plan.durationInDays}d</span></p>
            {plan.discountPercentage > 0 && (
              <p className="text-xs text-green-400 mt-1">{plan.discountPercentage}% discount on products</p>
            )}
            {plan.features?.length > 0 && (
              <ul className="mt-4 space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {plans.length === 0 && (
          <div className="col-span-3 text-center text-white/30 py-10">No plans yet.</div>
        )}
      </div>

      {showCreate && <CreatePlanModal onSave={handleCreate} onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function CreatePlanModal({ onSave, onClose }) {
  const [name, setName] = useState("standard");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("30");
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [features, setFeatures] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price) return;
    setSaving(true);
    try {
      await onSave({
        name,
        price: Number(price),
        durationInDays: Number(durationInDays),
        discountPercentage: Number(discountPercentage),
        features: features.split("\n").map((f) => f.trim()).filter(Boolean),
      });
    } catch {} finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 mx-4">
        <h2 className="text-xl font-bold text-white mb-4">Create Subscription Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Name</label>
            <select value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-white/10 text-white outline-none">
              <option value="standard">Standard</option>
              <option value="gamer">Gamer</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Price ($)</label>
              <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20" required />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Duration (days)</label>
              <input type="number" min="1" value={durationInDays} onChange={(e) => setDurationInDays(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Discount %</label>
            <input type="number" min="0" max="100" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Features (one per line)</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="Free shipping&#10;Priority support&#10;Exclusive access" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer disabled:opacity-50">
              {saving ? "Creating..." : "Create Plan"}
            </button>
            <button type="button" onClick={onClose} className="px-6 h-10 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 text-sm cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
