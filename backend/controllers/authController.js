const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: Sign JWT
const signToken = (user, res) => {
  const payload = {
    user: {
      id: user._id,
      role: user.role,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) {
        console.error("JWT Error:", err.message);
        return res.status(500).json({ msg: "Token generation failed" });
      }
      res.json({ token });
    }
  );
};

// ✅ REGISTER Controller
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user", // Only allow 'user' during registration
    });

    await user.save();

    // Return JWT token
    signToken(user, res);
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ msg: "Server error during registration." });
  }
};

// ✅ LOGIN Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    signToken(user, res);
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error during login." });
  }
};
