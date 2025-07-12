import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    busNumber: "",
    type: "",
    capacity: "",
    source: "",
    destination: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let role = null;
    try {
      const decoded = jwtDecode(token);
      role = decoded?.user?.role;
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (role !== "driver") {
      navigate("/dashboard");
      return;
    }

    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bus`);
        const bus = res.data.find((b) => b._id === id);
        if (!bus) {
          alert("Bus not found");
          navigate("/view-buses");
          return;
        }
        setFormData({
          busNumber: bus.busNumber,
          type: bus.type,
          capacity: bus.capacity,
          source: bus.source,
          destination: bus.destination
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error fetching bus data");
        navigate("/view-buses");
      }
    };

    fetchBus();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/bus/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Bus updated successfully!");
      navigate("/view-buses");
    } catch (err) {
      console.error(err);
      alert("Error updating bus");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading bus details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Edit Bus
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={formData.busNumber}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded hover:from-blue-600 hover:to-blue-700 transition font-semibold"
        >
          Update Bus
        </button>
      </form>
    </div>
  );
};

export default EditBus;
