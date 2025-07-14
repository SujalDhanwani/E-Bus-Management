import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------- Fetch buses & decode role ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setRole(jwtDecode(token)?.user?.role || null);
      } catch {
        localStorage.removeItem("token");
      }
    }

    const fetchBuses = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/bus`);
        setBuses(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching buses");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  /* ---------- Handlers ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/bus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bus deleted.");
      setBuses((prev) => prev.filter((bus) => bus._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting bus");
    }
  };

  const handleEdit = (id) => navigate(`/edit-bus/${id}`);
  const handleView = (id) => navigate(`/bus/${id}`);

  /* ---------- Filter ---------- */
  const filteredBuses = buses.filter((bus) =>
    [bus.busNumber, bus.source, bus.destination]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          All Buses
        </h2>

        <input
          type="text"
          placeholder="Search by bus number or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-6 focus:outline-none focus:ring focus:border-blue-400"
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading buses…</p>
        ) : filteredBuses.length === 0 ? (
          <p className="text-center text-gray-500">No buses found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredBuses.map((bus) => (
              <li
                key={bus._id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {bus.busNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(bus.busType || bus.type || "Type N/A")} • {bus.capacity || "N/A"} seats
                  </p>
                  <p className="text-sm text-gray-600">
                    {bus.source} ➡ {bus.destination}
                  </p>
                </div>

                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleView(bus._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>

                  {role === "driver" && (
                    <>
                      <button
                        onClick={() => handleEdit(bus._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bus._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewBuses;
