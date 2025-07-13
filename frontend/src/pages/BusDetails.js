import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const BusDetails = () => {
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/bus/${id}`);
        setBus(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching bus details");
      } finally {
        setLoading(false);
      }
    };
    fetchBus();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading bus details…</p>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">Bus not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-lg space-y-4">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Bus Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Bus Number:</span>{" "}
            {bus.busNumber || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {bus.busType || bus.type || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Capacity:</span>{" "}
            {bus.capacity || "N/A"} seats
          </p>
          <p>
            <span className="font-semibold">Source:</span>{" "}
            {bus.source || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Destination:</span>{" "}
            {bus.destination || "N/A"}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/view-buses"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-blue-700 transition font-medium"
          >
            ← Back to Buses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
