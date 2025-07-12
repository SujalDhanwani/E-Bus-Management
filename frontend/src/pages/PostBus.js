import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostBus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    busNumber: "",
    busType: "",
    capacity: "",
    source: "",
    destination: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    if (
      !formData.busNumber ||
      !formData.busType ||
      !formData.capacity ||
      !formData.source ||
      !formData.destination
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Ensure capacity is a number
    const dataToSubmit = {
      ...formData,
      capacity: Number(formData.capacity)
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/bus",
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("✅ Bus posted successfully!");
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
          <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={formData.busNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="text"
            name="busType"
            placeholder="Bus Type"
            value={formData.busType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          } text-white py-2 rounded transition font-semibold`}
        >
          {loading ? "Posting..." : "Post Bus"}
        </button>
      </form>
    </div>
  );
};

export default PostBus;
