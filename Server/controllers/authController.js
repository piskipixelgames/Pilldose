const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Incoming signup:", { name, email, role });

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    let newUserData = {
      name,
      email,
      password: hashed,
      role
    };

    // 👇 ROLE-BASED LOGIC
    if (role === "PATIENT") {
      newUserData.caregivers = [];
      newUserData.pairingCode = generateCode();
    }

    if (role === "CAREGIVER") {
      newUserData.patients = [];
    }

    const user = await User.create(newUserData);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    console.log("User created:", user.email);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        pairingCode: user.pairingCode || null
      }
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret"
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};