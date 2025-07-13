import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import busBg from "../assets/bus-bg.jpg";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${busBg})`,
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-14 z-10 text-center text-white"
      >
        <h1 className="text-4xl font-bold drop-shadow-md">
          Get Started with E‑Bus
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Create your account and book your seat in seconds!
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 text-gray-600 hover:text-blue-600"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold text-white transition duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
