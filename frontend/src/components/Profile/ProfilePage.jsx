import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../context/AuthContext/Authcontext.jsx";
import { updateProfile } from "../../api/auth.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setSaving(true);
      await updateProfile(formData);
      setSuccess(true);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-30 -right-25 w-112.5 h-112.5 bg-indigo-600/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-30 -left-30 w-112.5 h-112.5 bg-pink-600/20 rounded-full blur-3xl" />
        </div>
        <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Access Denied</h1>
          <p className="text-white/60 mb-6">You must be logged in to view your profile.</p>
          <Link to="/login" className="block">
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-[50%] w-75 h-75 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-lg relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-white/60">
            Logged in as <span className="text-blue-300">@{user.username}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 mb-6 bg-white/5 rounded-xl border border-white/5">
          <div className="w-14 h-14 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-xl font-bold text-blue-300">
            {(user.fullName || user.username).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-medium">{user.fullName || user.username}</p>
            <p className="text-white/50 text-sm">{user.email}</p>
            {user.isEmailVerified ? (
              <span className="text-xs text-green-400">Verified</span>
            ) : (
              <span className="text-xs text-yellow-400">Unverified</span>
            )}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-blue-200 text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="h-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-blue-200 text-sm">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="yourusername"
              value={formData.username}
              onChange={handleChange}
              className="h-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-blue-200 text-sm">Email</Label>
            <Input
              type="email"
              value={user.email}
              disabled
              className="h-10 bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
            />
          </div>

          <Button className="w-full h-11 text-base font-semibold bg-blue-600 text-white mt-4 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>

        <div className="mt-6 flex justify-between items-center text-sm">
          <Link to="/dashboard" className="text-white/60 hover:text-white hover:underline">
            ← Dashboard
          </Link>
          <Link to="/change-password" className="text-white/60 hover:text-white hover:underline">
            Change Password
          </Link>
        </div>
      </Card>
    </div>
  );
}
