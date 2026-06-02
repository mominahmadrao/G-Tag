import { useState } from "react";
import { useAuth } from "../../context/AuthContext/Authcontext.jsx";
import { resendEmailVerificationApi } from "../../api/auth.js";

export default function AccountResendVerification() {
  const { user } = useAuth();
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
      setError(err.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Email Verification</h1>
        <p className="text-white/50 mt-1">Verify your email address to access all features</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-6">
        {user?.isEmailVerified ? (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm text-center">
            Your email <strong className="text-green-200">{user.email}</strong> is already verified!
          </div>
        ) : (
          <>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm text-center">
              Your email <strong className="text-yellow-200">{user?.email}</strong> is not yet verified.
              Click below to receive a new verification link.
            </div>

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

            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
