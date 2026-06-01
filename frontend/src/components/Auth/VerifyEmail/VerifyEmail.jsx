import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyUserEmail } from "../../../api/auth.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [message, setMessage] = useState("Verifying your email...");
  const hasFetched = useRef(false);
  useEffect(() => {
    const verifyEmail = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const res = await verifyUserEmail(token);
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      } catch (err) {
        setStatus("error");
        if (err.response?.data?.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("The verification link is invalid or has expired.");
        }
      }
    };
    if (token) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-30 -right-25 w-112.5 h-112.5 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -left-30 w-112.5 h-112.5 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[40%] w-75 h-75 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>
      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Email Verification
        </h1>

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/70">{message}</p>
          </div>
        )}
        {status === "success" && (
          <div className="space-y-6">
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
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="text-green-200">{message}</p>
            <Link to="/login" className="block">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Go to Login
              </Button>
            </Link>
          </div>
        )}
        {status === "error" && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <p className="text-red-200">{message}</p>
            <Link to="/signup" className="block">
              <Button
                variant="outline"
                className="w-full h-11 border-white/10 text-white hover:bg-white/5"
              >
                Back to Sign Up
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
