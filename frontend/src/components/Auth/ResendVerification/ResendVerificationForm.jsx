import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "../../../context/AuthContext/Authcontext.jsx";
import { resendEmailVerificationApi } from "../../../api/auth.js";

export default function ResendVerificationForm() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResend = async () => {
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      await resendEmailVerificationApi();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to resend email verification. Make sure you are logged in.");
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-30 -right-25 w-112.5 h-112.5 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -left-30 w-112.5 h-112.5 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[40%] w-75 h-75 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Verify Your Email
        </h1>

        {user ? (
          <div className="space-y-6">
            <p className="text-white/70">
              Logged in as <strong className="text-blue-300">@{user.username}</strong> ({user.email}).
            </p>
            
            {user.isEmailVerified ? (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-sm">
                Your email address is already verified!
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-sm">
                Your email is currently unverified. Click below to receive a verification link.
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                A verification link has been sent to your email.
              </div>
            )}

            {!user.isEmailVerified && (
              <Button
                onClick={handleResend}
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {loading ? "Sending..." : "Resend Verification Email"}
              </Button>
            )}

            <div className="flex justify-center gap-4 text-sm mt-4">
              <Link to="/" className="text-white/60 hover:text-white hover:underline">
                Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
              You must be logged in to request a new email verification link.
            </div>
            
            <p className="text-white/60 text-sm">
              Please log in or create an account if you haven't already.
            </p>

            <div className="flex flex-col gap-3">
              <Link to="/login" className="block">
                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Go to Login
                </Button>
              </Link>
              <Link to="/signup" className="block">
                <Button variant="outline" className="w-full h-11 border-white/10 text-white hover:bg-white/5">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
