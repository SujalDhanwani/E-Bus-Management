import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded?.user?.role || null);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }

    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bus");
        setBuses(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching buses");
      }
    };

    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bus deleted.");
      setBuses(buses.filter((bus) => bus._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting bus");
    }
  };

  const handleEdit = (bus) => {
    navigate(`/edit-bus/${bus._id}`);
  };

  const handleView = (id) => {
    navigate(`/bus/${id}`);
  };

  const filteredBuses = buses.filter((bus) =>
    bus.busNumber?.toLowerCase().includes(search.toLowerCase()) ||
    bus.source?.toLowerCase().includes(search.toLowerCase()) ||
    bus.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          All Buses
        </h2>

        <input
          type="text"
          placeholder="Search by bus number or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-6 focus:outline-none focus:ring focus:border-blue-400"
        />

        {filteredBuses.length === 0 ? (
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
                    {(bus.busType || bus.type || "Type not specified")} • {bus.capacity || "N/A"} seats
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
                        onClick={() => handleEdit(bus)}
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
