import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    busNumber: "",
    type: "",
    capacity: "",
    source: "",
    destination: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- Auth + fetch ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    let role = null;
    try {
      role = jwtDecode(token)?.user?.role;
    } catch {
      localStorage.removeItem("token");
      return navigate("/login");
    }
    if (role !== "driver") return navigate("/dashboard");

    const getBus = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/bus/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          busNumber: data.busNumber,
          type: data.type,
          capacity: data.capacity,
          source: data.source,
          destination: data.destination,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to fetch bus details.");
      } finally {
        setLoading(false);
      }
    };

    getBus();
  }, [id, navigate]);

  /* ---------- Handlers ---------- */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/api/bus/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Bus updated successfully!");
      navigate("/view-buses");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error updating bus.");
    }
  };

  /* ---------- Render ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading bus details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 space-y-4"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">
          Edit Bus
        </h2>

        {["busNumber", "type", "capacity", "source", "destination"].map(
          (field) => (
            <input
              key={field}
              type={field === "capacity" ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          )
        )}

        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded hover:from-blue-600 hover:to-blue-700 transition font-semibold"
        >
          Update Bus
        </button>
      </form>
    </div>
  );
};

export default EditBus;
