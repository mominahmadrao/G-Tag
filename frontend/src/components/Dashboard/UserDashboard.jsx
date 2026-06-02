import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "../../context/AuthContext/Authcontext.jsx";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
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
          <p className="text-white/60 mb-6">You must be logged in to view this page.</p>
          <Link to="/login" className="block">
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const links = [
    {
      to: "/profile",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "My Profile",
      desc: "View and edit your personal information",
    },
    {
      to: "/change-password",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Change Password",
      desc: "Update your account password",
    },
    {
      to: "/orders",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "My Orders",
      desc: "Track and review your orders",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-[50%] w-75 h-75 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl relative z-10 space-y-6">
        {/* Welcome Header */}
        <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {(user.fullName || user.username).charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user.fullName || user.username}
              </h1>
              <p className="text-white/50 text-sm mt-1">{user.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${user.isEmailVerified ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}>
                  {user.isEmailVerified ? "Verified" : "Unverified"}
                </span>
                <span className="text-xs text-white/30 capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.disabled ? "#" : link.to}
              className={`block p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-200 ${link.disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500/50 hover:bg-slate-800/60 hover:scale-[1.02] group"}`}
              onClick={link.disabled ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl ${link.disabled ? "bg-white/5 text-white/30" : "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30"} transition-colors`}>
                  {link.icon}
                </div>
                <div>
                  <h3 className={`font-semibold ${link.disabled ? "text-white/40" : "text-white"}`}>
                    {link.title}
                  </h3>
                  <p className="text-sm text-white/40 mt-0.5">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-11 border-white/10 text-white hover:bg-white/5">
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            className="flex-1 h-11 bg-red-600/80 hover:bg-red-600 text-white font-semibold"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
