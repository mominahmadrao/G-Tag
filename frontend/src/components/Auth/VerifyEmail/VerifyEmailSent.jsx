import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkEmailVerifiedStatus, resendVerificationPublic } from "../../../api/auth.js";

export default function VerifyEmailSent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(null);
  const [verified, setVerified] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => {
    if (!email) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await checkEmailVerifiedStatus(email);
        if (res.data.data.isVerified) {
          setVerified(true);
          clearInterval(pollRef.current);
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch {
        // ignore polling errors
      }
    }, 3000);

    return () => clearInterval(pollRef.current);
  }, [email, navigate]);

  const handleResend = async () => {
    if (!email) return;
    setResendError(null);
    setResendSuccess(false);
    try {
      setResending(true);
      await resendVerificationPublic(email);
      setResendSuccess(true);
    } catch (err) {
      setResendError(err.response?.data?.message || "Failed to resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950 text-white">
        <Card className="w-full max-w-md bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
          <p className="text-white/70">No email provided.</p>
          <Link to="/signup" className="block mt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Back to Sign Up</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-30 -right-25 w-112.5 h-112.5 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -left-30 w-112.5 h-112.5 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
        {verified ? (
          <>
            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
            <p className="text-green-200 text-sm">Redirecting you to login...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50 mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-white/60 text-sm mb-1">
              We sent a verification link to
            </p>
            <p className="text-blue-300 font-semibold mb-6">{email}</p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-white/40 text-xs">Waiting for verification...</span>
            </div>

            {resendError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                {resendError}
              </div>
            )}

            {resendSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                Verification email resent! Check your inbox.
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleResend}
                disabled={resending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {resending ? "Sending..." : "Resend Verification Email"}
              </Button>

              <Link to="/login" className="block">
                <Button
                  variant="outline"
                  className="w-full h-11 border-white/10 text-white hover:bg-white/5"
                >
                  Go to Login
                </Button>
              </Link>
            </div>

            <p className="text-white/30 text-xs mt-6">
              Didn't receive the email? Check your spam folder or try a different email address.
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
