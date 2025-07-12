const express = require("express");
const router = express.Router();
const { updateLocation, getAllLocations } = require("../controllers/locationController");
const auth = require("../middleware/authMiddleware"); // ensure you have this middleware

// Save/update current user location
router.post("/", auth, updateLocation);

// Get all drivers' locations
router.get("/", getAllLocations);

module.exports = router;
