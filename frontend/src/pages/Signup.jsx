import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        department,
      });

      setSuccess("Account created successfully! Please login.");
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 1500);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Registration failed. Email may already exist.");
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
            alt="Signup Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create Account 🚀
          </h2>

          <p className="text-gray-500 mb-6">
            Register to access the staff management system
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
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

            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="staff">Staff</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>

            <input
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <button
              onClick={handleSignup}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
