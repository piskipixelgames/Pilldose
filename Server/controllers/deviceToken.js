const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {

    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        error: "Missing userId or token"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    user.fcmToken = token;

    await user.save();

    console.log("FCM Token Saved:");

    console.log(token);

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to save token"
    });
  }
});

module.exports = router;