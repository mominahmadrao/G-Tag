import { useState, useEffect } from "react";
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from "../../api/admin.js";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { type: 'create' } | { type: 'edit', cat }

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await adminGetCategories();
      setCategories(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (data) => {
    if (modal.type === "create") {
      await adminCreateCategory(data);
    } else {
      await adminUpdateCategory(modal.cat._id, data);
    }
    setModal(null);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await adminDeleteCategory(id);
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || "Cannot delete");
    }
  };

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-white/50 mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => setModal({ type: "create" })} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-4">Name</th>
              <th className="text-left px-5 py-4">Description</th>
              <th className="text-left px-5 py-4">Created By</th>
              <th className="text-right px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 text-white font-medium">{cat.name}</td>
                <td className="px-5 py-4 text-white/60 max-w-xs truncate">{cat.description}</td>
                <td className="px-5 py-4 text-white/40 text-xs">{cat.createdBy?.username || "—"}</td>
                <td className="px-5 py-4 text-right space-x-2">
                  <button onClick={() => setModal({ type: "edit", cat })} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(cat._id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan="4" className="px-5 py-10 text-center text-white/30">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && <CategoryModal modal={modal} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
}

function CategoryModal({ modal, onSave, onClose }) {
  const [name, setName] = useState(modal.cat?.name || "");
  const [description, setDescription] = useState(modal.cat?.description || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSave({ name: name.trim(), description: description.trim() });
    } catch {} finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 mx-4">
        <h2 className="text-xl font-bold text-white mb-4">{modal.type === "create" ? "Add Category" : "Edit Category"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
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
