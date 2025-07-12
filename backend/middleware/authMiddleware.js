const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // Must be in format "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ msg: "Token format is invalid." });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid." });
  }
};
