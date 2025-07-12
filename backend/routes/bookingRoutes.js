const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

// Create a booking
router.post("/", auth, createBooking);

// (Optional) Get all bookings
router.get("/", auth, getAllBookings);

module.exports = router;
