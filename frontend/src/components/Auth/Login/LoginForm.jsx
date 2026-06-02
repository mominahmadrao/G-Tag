import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../../context/AuthContext/Authcontext.jsx";

const roles = [
  { key: "customer", label: "Customer", gradient: "from-blue-500 to-purple-600" },
  { key: "admin", label: "Admin", gradient: "from-blue-500 to-purple-600" },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginRole, setLoginRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = loginRole === "admin";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const userData = await login(formData.email, formData.password);
      if (isAdmin && userData.role !== "admin") {
        setError("This account does not have admin privileges.");
        setLoading(false);
        return;
      }
      navigate(isAdmin ? "/admin" : "/account");
    } catch (err) {
      if (err.response?.data?.errors?.length > 0) {
        setError(Object.values(err.response.data.errors[0])[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-[50%] w-75 h-75 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-slate-900/60 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <div className="mb-6 space-y-4">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <p className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Login as</p>
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/10">
            {roles.map((r) => {
              const active = loginRole === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setLoginRole(r.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? `bg-gradient-to-r ${r.gradient} text-white shadow-lg`
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-blue-200">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-11 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-blue-200">Password</Label>
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>
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

          <Button className="w-full h-11 text-base font-semibold text-white mt-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200">
            {loading ? "Logging in..." : isAdmin ? "Login as Admin" : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
        </p>
      </Card>
    </div>
  );
}