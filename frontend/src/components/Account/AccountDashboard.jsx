import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/Authcontext.jsx";

const quickLinks = [
  {
    to: "/account/profile",
    title: "My Profile",
    desc: "View and edit your personal information",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    to: "/account/change-password",
    title: "Change Password",
    desc: "Update your account password",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function AccountDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.fullName || user?.username}
        </h1>
        <p className="text-white/50 mt-1">Here's an overview of your account.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <p className="text-sm text-white/40">Status</p>
          <p className={`text-lg font-semibold mt-1 ${user?.isEmailVerified ? "text-green-400" : "text-yellow-400"}`}>
            {user?.isEmailVerified ? "Verified" : "Unverified"}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <p className="text-sm text-white/40">Role</p>
          <p className="text-lg font-semibold mt-1 text-white capitalize">{user?.role}</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          <p className="text-sm text-white/40">Member Since</p>
          <p className="text-lg font-semibold mt-1 text-white">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-200 group"
          >
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30 transition-colors">
              {link.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white">{link.title}</h3>
              <p className="text-sm text-white/40 mt-0.5">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
