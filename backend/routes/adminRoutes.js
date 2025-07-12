const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const AdminController = require("../controllers/adminController");

router.post("/create-driver", auth, admin, AdminController.createDriver);

module.exports = router;
