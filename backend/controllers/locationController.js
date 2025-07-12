const Location = require("../models/Location");

exports.updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    let location = await Location.findOne({ bus: req.params.busId });
    if (location) {
      location.latitude = latitude;
      location.longitude = longitude;
      location.updatedAt = Date.now();
      await location.save();
    } else {
      location = new Location({
        bus: req.params.busId,
        latitude,
        longitude,
      });
      await location.save();
    }
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ bus: req.params.busId });
    if (!location) return res.status(404).json({ msg: "Location not found" });
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("userId", "name email");
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error fetching locations" });
  }
};
