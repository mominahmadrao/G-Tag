import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext/Authcontext";
import { CartProvider } from "./context/CartContext/CartContext";

import LandingPage from "./components/LandingPage";
import LoginForm from "./components/Auth/Login/LoginForm";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";
import ForgotPasswordForm from "./components/Auth/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "./components/Auth/ResetPassword/ResetPasswordForm";
import VerifyEmailSent from "./components/Auth/VerifyEmail/VerifyEmailSent";
import VerifyEmail from "./components/Auth/VerifyEmail/VerifyEmail";
import ProfilePage from "./components/Profile/ProfilePage";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AccountLayout from "./components/Account/AccountLayout";
import AccountProfile from "./components/Account/AccountProfile";
import AccountChangePassword from "./components/Account/AccountChangePassword";
import AccountResendVerification from "./components/Account/AccountResendVerification";
import AccountDashboard from "./components/Account/AccountDashboard";
// Admin Interface Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminPayments from "./components/Admin/AdminPayments";
import AdminSubscriptionPlans from "./components/Admin/AdminSubscriptionPlans";

import { CartDrawer } from "./components/Cart/CartDrawer";
import { CheckoutPage } from "./components/Cart/CheckoutPage";
import { SubscriptionPage } from "./components/Subscription/SubscriptionPage";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-slate-400">
        Loading G-TAG System Subsystems...
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        {/* GLOBAL NAVIGATION LAYER UTILITY BAR */}
        <header className="bg-slate-950 border-b border-slate-900 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-black tracking-tighter bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent"
          >
            G-TAG MARKETPLACE
          </a>

          <nav className="flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a
              href="/subscriptions"
              className="hover:text-emerald-400 transition-colors"
            >
              Premium SaaS
            </a>
            {user && (
              <a href="/account" className="hover:text-white transition-colors">
                My Dashboard
              </a>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Mount your interactive Cart Drawer directly on the Navbar */}
                <CartDrawer />
                <a
                  href="/account"
                  className="text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-800"
                >
                  {user.email}
                </a>
              </>
            ) : (
              <a
                href="/login"
                className="text-xs font-bold bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg hover:bg-emerald-400 transition-all"
              >
                Login
              </a>
            )}
          </div>
        </header>

        {/* APPLICATION MAIN ROUTING MESH */}
        <main className="bg-slate-950 min-h-[calc(100vh-73px)]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                !user ? <LoginForm /> : <Navigate to="/account" replace />
              }
            />
            <Route
              path="/register"
              element={
                !user ? <SignUpForm /> : <Navigate to="/account" replace />
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordForm />}
            />
            <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            {/* Uzair's Core Customer Commerce Routes */}
            <Route
              path="/checkout"
              element={
                user ? <CheckoutPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/subscriptions"
              element={
                user ? <SubscriptionPage /> : <Navigate to="/login" replace />
              }
            />

            {/* Authenticated Customer Account Dashboard Nesting */}
            <Route
              path="/account"
              element={
                user ? <AccountLayout /> : <Navigate to="/login" replace />
              }
            >
              <Route index element={<AccountDashboard />} />
              <Route path="profile" element={<AccountProfile />} />
              <Route
                path="change-password"
                element={<AccountChangePassword />}
              />
              <Route
                path="resend-verification"
                element={<AccountResendVerification />}
              />
            </Route>

            {/* Privileged Role-Based Administrative Console Nesting */}
            <Route
              path="/admin"
              element={
                user && user.role === "admin" ? (
                  <AdminLayout />
                ) : (
                  <Navigate to="/account" replace />
                )
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route
                path="subscription-plans"
                element={<AdminSubscriptionPlans />}
              />
            </Route>

            {/* Fallback Catch-All Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
