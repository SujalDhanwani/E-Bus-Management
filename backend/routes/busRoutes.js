const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus
} = require("../controllers/busController");

// List all buses
router.get("/", getBuses);

// Get ONE bus by id
router.get("/:id", getBusById);

// Create new bus
router.post("/", auth, createBus);

// Update bus
router.put("/:id", auth, updateBus);

// Delete bus
router.delete("/:id", auth, deleteBus);

module.exports = router;
