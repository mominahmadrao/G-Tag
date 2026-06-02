import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../../context/AuthContext/Authcontext.jsx";
import { changePassword } from "../../../api/auth.js";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(formData.oldPassword, formData.newPassword);
      setSuccess(true);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to change password. Please verify your old password.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
          <p className="text-white/60 mb-6">
            You must be logged in to change your password.
          </p>
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
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-[50%] w-75 h-75 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-white">Change Password</h1>
          <p className="text-white/60">
            Set a new password for your account, <span className="text-blue-300">@{user.username}</span>.
          </p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword" className="text-blue-200 text-sm">
              Current Password
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="••••••••"
              value={formData.oldPassword}
              onChange={handleChange}
              className="h-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-blue-200 text-sm">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              value={formData.newPassword}
              onChange={handleChange}
              className="h-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword" className="text-blue-200 text-sm">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="h-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          {/* Button */}
          <Button className="w-full h-11 text-base font-semibold bg-blue-600 text-white mt-4 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200 ">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>

        <div className="mt-6 flex justify-between items-center text-sm">
          <Link to="/dashboard" className="text-white/60 hover:text-white hover:underline">
            ← Dashboard
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/login" className="text-white/60 hover:text-white hover:underline">
            Sign out / Re-login
          </Link>
        </div>
      </Card>
    </div>
  );
}
