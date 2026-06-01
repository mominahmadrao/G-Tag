import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/Auth/Login/LoginForm";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";
import VerifyEmail from "./components/Auth/VerifyEmail/VerifyEmail";
import LandingPage from "./components/LandinPage";

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
      </Routes>
    </BrowserRouter>
  );
}