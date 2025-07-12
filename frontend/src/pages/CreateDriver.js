import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateDriver = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/create-driver",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage("✅ Driver created and email sent successfully.");
      setFormData({ firstName: "", lastName: "", email: "" });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "❌ Error creating driver.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Driver</h2>
        {message && (
          <div className="mb-4 text-sm text-green-600 break-words">{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Create Driver
          </button>
        </form>

        <button
          onClick={() => navigate("/admin-dashboard")}
          className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateDriver;
