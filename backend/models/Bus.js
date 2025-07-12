const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  busType: { type: String, required: true },
  capacity: { type: Number },
  source: { type: String, required: true },
  destination: { type: String, required: true },
});

module.exports = mongoose.model("Bus", BusSchema);
