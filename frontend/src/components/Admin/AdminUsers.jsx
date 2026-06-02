import { useState, useEffect } from "react";
import { adminGetUsers, adminDeleteUser } from "../../api/admin.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await adminGetUsers();
      setUsers(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await adminDeleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {}
  };

  if (loading) return <div className="p-8 text-white/50">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-white/50 mt-1">{users.length} total users</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-4">User</th>
              <th className="text-left px-5 py-4">Email</th>
              <th className="text-left px-5 py-4">Role</th>
              <th className="text-left px-5 py-4">Verified</th>
              <th className="text-left px-5 py-4">Joined</th>
              <th className="text-right px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                      {(u.fullName || u.username).charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{u.fullName || u.username}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/60">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {u.isEmailVerified ? (
                    <span className="text-green-400 text-xs">Yes</span>
                  ) : (
                    <span className="text-yellow-400 text-xs">No</span>
                  )}
                </td>
                <td className="px-5 py-4 text-white/40 text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => handleDelete(u._id)}
                    disabled={u.role === "admin"}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="6" className="px-5 py-10 text-center text-white/30">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
