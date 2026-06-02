import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/Authcontext.jsx";
import { updateProfile } from "../../api/auth.js";

export default function AccountProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", username: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName || "", username: user.username || "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(false);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    try {
      setSaving(true);
      await updateProfile(formData);
      setSuccess(true);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ fullName: user?.fullName || "", username: user?.username || "" });
    setError(null);
    setEditing(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-white/50 mt-1">Manage your personal information</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      {/* Avatar Card */}
      <div className="flex items-center gap-5 p-5 mb-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
          {(user?.fullName || user?.username || "?").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-semibold">{user?.fullName || user?.username}</p>
          <p className="text-sm text-white/50">{user?.email}</p>
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${user?.isEmailVerified ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}>
            {user?.isEmailVerified ? "Verified" : "Unverified"}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
          Profile updated successfully!
        </div>
      )}

      {/* Profile Fields */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-5">
        <div>
          <label className="block text-sm text-blue-200 mb-1.5">Full Name</label>
          {editing ? (
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              placeholder="Your full name"
            />
          ) : (
            <p className="text-white">{user?.fullName || <span className="text-white/30">Not set</span>}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1.5">Username</label>
          {editing ? (
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              required
            />
          ) : (
            <p className="text-white">@{user?.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1.5">Email</label>
          <p className="text-white/50">{user?.email}</p>
        </div>

        {editing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 h-10 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
