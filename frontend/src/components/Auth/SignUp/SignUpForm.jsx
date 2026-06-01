import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../../context/AuthContext/Authcontext.jsx";

export default function SignUpForm() {
  const navigate = useNavigate();

  // take  function from global auth context
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);

      await register(formData);
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.errors?.length > 0) {
        setError(Object.values(err.response.data.errors[0])[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during registration. Please verify your inputs.");
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
      <Card className="w-full max-w-lg relative z-10 bg-late-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <div className="mb-6">
          <h1 className="text-3xl text-white font-bold">Create Account</h1>
          <p className="text-white/60 ml-1 mt-5">Join GTAG Marketplace</p>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-3">
            <Label htmlFor="username" className="text-blue-200">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="John"
              value={formData.username}
              onChange={handleChange}
              className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-blue-200">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-blue-200">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          {/* Button */}
          <Button className="w-full h-11 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 ease-in-out">
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
