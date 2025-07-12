// routes/stats.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Bus = require("../models/Bus");

router.get("/", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBuses = await Bus.countDocuments();

    res.json({
      totalBookings,
      totalUsers,
      totalBuses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
