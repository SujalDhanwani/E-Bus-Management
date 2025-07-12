const Booking = require("../models/Booking");
const Bus = require("../models/Bus");

// Create a booking
exports.createBooking = async (req, res) => {
  const { busId, passengerName, seats } = req.body;

  if (!busId || !passengerName || !seats) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ msg: "Bus not found." });
    }

    const booking = new Booking({
      busId,
      passengerName,
      seats,
      user: req.user.id, // Comes from authMiddleware
    });

    await booking.save();

    res.json({ msg: "Booking created successfully.", booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

// Get all bookings (optional)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("busId").populate("user");
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};
