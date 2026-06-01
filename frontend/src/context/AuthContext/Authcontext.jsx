import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getMe, logoutUser } from "../../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check User on every app reload
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login

  const login = async (email, password) => {
    await loginUser({ email, password });
    //  after login fetch user from backend
    const res = await getMe();
    setUser(res.data.user);
  };

  // Register
  const register = async (data) => {
    await registerUser(data);
  };

  // Logout

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {/* compoent that can access above global values */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
