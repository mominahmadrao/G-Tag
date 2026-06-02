import { useState } from "react";
import { changePassword } from "../../api/auth.js";

export default function AccountChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(formData.oldPassword, formData.newPassword);
      setSuccess(true);
      setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Change Password</h1>
        <p className="text-white/50 mt-1">Set a new password for your account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
          Password changed successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-5">
        <div>
          <label className="block text-sm text-blue-200 mb-1.5">Current Password</label>
          <input
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1.5">New Password</label>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1.5">Confirm New Password</label>
          <input
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
