import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookTicket = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    busId: "",
    passengerName: "",
    seats: 1,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingBuses, setFetchingBuses] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/bus`
        );
        setBuses(res.data);
      } catch (err) {
        console.error(err);
        setError("❌ Error fetching buses");
      } finally {
        setFetchingBuses(false);
      }
    };
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.busId || !formData.passengerName || formData.seats < 1) {
      setError("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/bookings`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("✅ Ticket booked successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error booking ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4 border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">
          Book a Ticket
        </h2>

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-center">
            {error}
          </div>
        )}

        <label className="block">
          <span className="text-gray-700">Select Bus</span>
          {fetchingBuses ? (
            <div className="text-sm text-gray-500 mt-2">Loading buses...</div>
          ) : (
            <select
              name="busId"
              value={formData.busId}
              onChange={handleChange}
              className="border p-2 w-full mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">-- Choose a Bus --</option>
              {buses.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus.busNumber} ({bus.source} ➡ {bus.destination})
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Passenger Name</span>
          <input
            type="text"
            name="passengerName"
            value={formData.passengerName}
            onChange={handleChange}
            className="border p-2 w-full mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Number of Seats</span>
          <input
            type="number"
            name="seats"
            min="1"
            value={formData.seats}
            onChange={handleChange}
            className="border p-2 w-full mt-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading || fetchingBuses}
          className={`w-full text-white py-2 rounded-lg font-semibold transition ${
            loading || fetchingBuses
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }`}
        >
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </form>
    </div>
  );
};

export default BookTicket;
