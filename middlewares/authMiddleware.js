const jwt = require("jsonwebtoken");
require("dotenv").config(); // Add this line

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET.trim()); // Add .trim()
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  };
};
