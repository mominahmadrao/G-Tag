import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "../../../api/auth.js";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Could not request password reset. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
        {!success ? (
          <>
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
              <p className="text-white/60 mt-1 ml-1">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              {/* Button */}
              <Button className="w-full h-11 text-base font-semibold bg-blue-600 text-white mt-4 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200 ">
                {loading ? "Sending link..." : "Send Reset Link"}
              </Button>
            </form>

            <p className="text-center text-sm text-white/60 mt-6">
              Remember your password?{" "}
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </p>
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
                  d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-white/60 text-sm">
                We've sent a password reset link to <strong className="text-blue-200">{email}</strong>.
              </p>
            </div>
            <Link to="/login" className="block">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
