import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/Auth/Login/LoginForm";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";
import VerifyEmail from "./components/Auth/VerifyEmail/VerifyEmail";
import VerifyEmailSent from "./components/Auth/VerifyEmail/VerifyEmailSent";
import ForgotPasswordForm from "./components/Auth/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "./components/Auth/ResetPassword/ResetPasswordForm";
import ChangePasswordForm from "./components/Auth/ChangePassword/ChangePasswordForm";
import ResendVerificationForm from "./components/Auth/ResendVerification/ResendVerificationForm";
import LandingPage from "./components/LandingPage";
import AccountLayout from "./components/Account/AccountLayout";
import AccountDashboard from "./components/Account/AccountDashboard";
import AccountProfile from "./components/Account/AccountProfile";
import AccountChangePassword from "./components/Account/AccountChangePassword";
import AccountResendVerification from "./components/Account/AccountResendVerification";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminPayments from "./components/Admin/AdminPayments";
import AdminSubscriptionPlans from "./components/Admin/AdminSubscriptionPlans";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={<LoginForm />}
        />

        <Route
          path="/signup"
          element={<SignUpForm />}
        />

        <Route 
          path="/verify-email/:token" 
          element={<VerifyEmail />} 
        />

        <Route 
          path="/verify-email-sent" 
          element={<VerifyEmailSent />} 
        />

        <Route 
          path="/forgot-password" 
          element={<ForgotPasswordForm />} 
        />

        <Route 
          path="/reset-password/:token" 
          element={<ResetPasswordForm />} 
        />

        <Route 
          path="/change-password" 
          element={<ChangePasswordForm />} 
        />

        <Route 
          path="/resend-verification" 
          element={<ResendVerificationForm />} 
        />

        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountDashboard />} />
          <Route path="profile" element={<AccountProfile />} />
          <Route path="change-password" element={<AccountChangePassword />} />
          <Route path="verify-email" element={<AccountResendVerification />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="subscription-plans" element={<AdminSubscriptionPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}