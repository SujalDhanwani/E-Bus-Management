import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded?.user?.role;
  }

  // Redirect if not admin
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 p-8 transition hover:shadow-3xl">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700">
            Admin Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/view-users")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition text-lg font-semibold"
            >
              View All Users
            </button>

            <button
              onClick={() => navigate("/view-buses")}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition text-lg font-semibold"
            >
              View All Buses
            </button>

            <button
              onClick={() => navigate("/create-driver")}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition text-lg font-semibold"
            >
              Create Driver
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} E-Bus Management • Built by Sujal Dhanwani
      </footer>
    </div>
  );
};

export default AdminDashboard;
