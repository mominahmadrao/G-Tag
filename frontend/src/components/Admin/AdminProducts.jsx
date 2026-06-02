import { useState, useEffect } from "react";
import { adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminToggleFeatured } from "../../api/admin.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await adminGetProducts();
      setProducts(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminDeleteProduct(id);
      fetch();
    } catch {}
  };

  const handleToggleFeatured = async (id) => {
    try {
      await adminToggleFeatured(id);
      fetch();
    } catch {}
  };

  const handleSave = async (data) => {
    if (modal.type === "create") {
      await adminCreateProduct(data);
    } else {
      await adminUpdateProduct(modal.product._id, data);
    }
    setModal(null);
    fetch();
  };

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-white/50 mt-1">{products.length} products</p>
        </div>
        <button onClick={() => setModal({ type: "create" })} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-4">Product</th>
              <th className="text-left px-5 py-4">Category</th>
              <th className="text-left px-5 py-4">Price</th>
              <th className="text-left px-5 py-4">Stock</th>
              <th className="text-left px-5 py-4">Featured</th>
              <th className="text-right px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {p.images?.[0]?.url && (
                      <img src={p.images[0].url} alt="" className="w-10 h-10 rounded-lg object-cover bg-white/5" />
                    )}
                    <span className="text-white font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/60">{p.category?.name || "—"}</td>
                <td className="px-5 py-4 text-white font-mono">${p.price?.toFixed(2)}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.stock > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => handleToggleFeatured(p._id)} className={`text-xs px-2 py-0.5 rounded-full border cursor-pointer ${p.isFeatured ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-white/5 text-white/30 border-white/10"}`}>
                    {p.isFeatured ? "Yes" : "No"}
                  </button>
                </td>
                <td className="px-5 py-4 text-right space-x-2">
                  <button onClick={() => setModal({ type: "edit", product: p })} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="6" className="px-5 py-10 text-center text-white/30">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && <ProductModal modal={modal} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
}

function ProductModal({ modal, onSave, onClose }) {
  const [name, setName] = useState(modal.product?.name || "");
  const [description, setDescription] = useState(modal.product?.description || "");
  const [price, setPrice] = useState(modal.product?.price || "");
  const [stock, setStock] = useState(modal.product?.stock || "");
  const [category, setCategory] = useState(modal.product?.category?._id || modal.product?.category || "");
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    import("../../api/admin.js").then((mod) =>
      mod.adminGetCategories().then((res) => setCategories(res.data.data))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !category) return;
    setSaving(true);
    try {
      const payload = { name: name.trim(), description: description.trim(), price: Number(price), stock: Number(stock || 0), category };
      await onSave(payload);
    } catch {} finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">{modal.type === "create" ? "Add Product" : "Edit Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Price ($)</label>
              <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Stock</label>
              <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
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
