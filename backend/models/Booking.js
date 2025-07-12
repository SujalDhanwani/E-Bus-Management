const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    passengerName: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
