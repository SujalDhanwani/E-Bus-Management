// server.js
const express = require("express");
const dotenv  = require("dotenv");
const connectDB = require("./config/db");
const cors    = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health‑check route
app.get("/", (_req, res) => res.send("🚍 E‑Bus API is running"));

// API routes
app.use("/api/auth",      require("./routes/authRoutes"));
app.use("/api/bus",       require("./routes/busRoutes"));
app.use("/api/location",  require("./routes/locationRoutes"));
app.use("/api/bookings",  require("./routes/bookingRoutes"));
app.use("/api/stats",     require("./routes/stats"));
app.use("/api/admin",     require("./routes/adminRoutes"));

// Start server (Render injects PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
