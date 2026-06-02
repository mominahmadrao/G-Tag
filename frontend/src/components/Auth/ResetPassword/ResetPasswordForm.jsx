import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "../../../api/auth.js";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, formData.password);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Token is invalid or has expired. Please request another reset link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-30 -right-25 w-112.5 h-112.5 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -left-30 w-112.5 h-112.5 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[40%] w-75 h-75 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        {!success ? (
          <>
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl font-bold text-white">Reset Password</h1>
              <p className="text-white/60 mt-1 ml-1">
                Enter your new password below.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-blue-200">
                  New Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-blue-200">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              {/* Button */}
              <Button className="w-full h-11 text-base font-semibold bg-blue-600 text-white mt-4 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200 ">
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful</h2>
              <p className="text-white/60 text-sm">
                Your password has been successfully updated. You can now log in using your new credentials.
              </p>
            </div>
            <Link to="/login" className="block">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Go to Login
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
