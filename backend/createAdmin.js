const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

// Load your User model
const User = require("./models/User");

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@ebus.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists.");
      process.exit();
    }

    // Hash a password
    const hashedPassword = await bcrypt.hash("AdminPassword123", 10);

    // Create admin user
   const admin = new User({
  firstName: "Super",
  lastName: "Admin",
  email: "admin@ebus.com",
  password: hashedPassword,
  role: "admin"
});

    await admin.save();
    console.log("✅ Admin user created successfully:");
    console.log("   Email: admin@ebus.com");
    console.log("   Password: AdminPassword123");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
})();
