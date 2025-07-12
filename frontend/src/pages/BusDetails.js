import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BusDetails = () => {
  const { id } = useParams();
  const [bus, setBus] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bus/${id}`);
        setBus(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching bus details");
      }
    };

    fetchBus();
  }, [id]);

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading bus details...</p>
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
            <span className="font-semibold text-gray-800">Bus Number:</span>{" "}
            {bus.busNumber || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Type:</span>{" "}
            {bus.busType || bus.type || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Capacity:</span>{" "}
            {bus.capacity || "N/A"} seats
          </p>
          <p>
            <span className="font-semibold text-gray-800">Source:</span>{" "}
            {bus.source || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Destination:</span>{" "}
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
