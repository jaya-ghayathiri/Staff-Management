import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const { user, token } = res.data;

      // Save token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      setSuccess("Login successful! Redirecting...");
      setError("");

      // Redirect based on role
      setTimeout(() => {
        if (user.role === "faculty") navigate("/faculty/dashboard");
        else if (user.role === "staff") navigate("/staff/dashboard");
        else if (user.role === "admin") navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center p-6">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/016/900/444/small/online-dating-app-login-illustration-valentine-s-day-love-match-mobile-leaves-gradient-character-illustration-vector.jpg"
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-6">
            Login to access your dashboard
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
              {success}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            New user?{" "}
            <span
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
