import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/Auth/Login/LoginForm";
import SignUpForm from "./components/Auth/SignUp/SignUpForm";

import VerifyEmail from "./components/Auth/VerifyEmail/VerifyEmail";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
      GTAG Marketplace
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

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