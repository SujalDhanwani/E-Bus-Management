// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // Parses JSON bodies
app.use(cors());         // Enables CORS

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bus", require("./routes/busRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/admin", require("./routes/adminRoutes")); // ✅ ADD admin routes here

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
