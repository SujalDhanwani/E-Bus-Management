import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const PostBus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    busNumber: "",
    busType: "",
    capacity: "",
    source: "",
    destination: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    if (Object.values(formData).some((v) => v === "")) {
      return setError("Please fill in all fields.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/bus`,
        { ...formData, capacity: Number(formData.capacity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Bus posted successfully!");
      setFormData({
        busNumber: "",
        busType: "",
        capacity: "",
        source: "",
        destination: "",
      });
      navigate("/view-buses");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error posting bus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Post Bus Information
        </h2>

        {error && (
          <div className="mb-4 text-center text-sm text-red-600">{error}</div>
        )}

        {["busNumber", "busType", "capacity", "source", "destination"].map(
          (field) => (
            <input
              key={field}
              type={field === "capacity" ? "number" : "text"}
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={handleChange}
              min={field === "capacity" ? "1" : undefined}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 mt-4 first:mt-0"
              required
            />
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 text-white py-2 rounded font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post Bus"}
        </button>
      </form>
    </div>
  );
};

export default PostBus;
