const Bus = require("../models/Bus");

// CREATE NEW BUS
exports.createBus = async (req, res) => {
  try {
    const { busNumber, busType, capacity, source, destination } = req.body;

    if (!busNumber || !busType || !capacity || !source || !destination) {
      return res.status(400).json({ msg: "Please enter all required fields." });
    }

    const newBus = new Bus({
      busNumber,
      busType,           // Correct field name here
      capacity,
      source,
      destination,
      owner: req.user?.id // optional: if you track who created
    });

    await newBus.save();

    res.status(201).json(newBus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("driver", "name email");
    res.json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// UPDATE BUS BY ID
exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ msg: "Bus not found" });
    }

    // Update fields
    bus.busNumber = req.body.busNumber || bus.busNumber;
    bus.type = req.body.type || bus.type;
    bus.capacity = req.body.capacity || bus.capacity;
    bus.source = req.body.source || bus.source;
    bus.destination = req.body.destination || bus.destination;

    await bus.save();
    res.json(bus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// DELETE BUS BY ID
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ msg: "Bus not found" });
    }

    await bus.deleteOne();
    res.json({ msg: "Bus removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// GET /api/bus/:id
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ msg: "Bus not found" });
    }
    res.json(bus);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


