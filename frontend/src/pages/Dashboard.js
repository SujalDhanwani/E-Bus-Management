import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LiveLocationMap from "../components/LiveLocationMap";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if no token
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode token and extract role
    try {
      const decoded = jwtDecode(token);
      const userRole = decoded?.user?.role;
      setRole(userRole);

      // Optional: handle unknown role
      if (!userRole) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          {role === "driver" ? "Driver Dashboard" : "User Dashboard"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/view-buses"
            className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition text-center font-semibold"
          >
            View All Buses
          </Link>

          {role === "driver" && (
            <Link
              to="/post-bus"
              className="block bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition text-center font-semibold"
            >
              Post New Bus
            </Link>
          )}

          {role === "user" && (
            <Link
              to="/book-ticket"
              className="block bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow hover:from-purple-600 hover:to-purple-700 transition text-center font-semibold"
            >
              Book a Ticket
            </Link>
          )}
        </div>

        {role === "driver" && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Live Location
            </h3>
            <LiveLocationMap />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
