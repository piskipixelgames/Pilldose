const User = require("../models/User");
const mongoose = require("mongoose");

exports.getCaregiversForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    console.log("Fetching caregivers for patient:", patientId);

    const patientObjectId = new mongoose.Types.ObjectId(patientId);

    const caregivers = await User.find({
      patients: patientObjectId,
      role: "CAREGIVER"
    }).select("name email patients");

    console.log("Caregivers found:", caregivers);

    res.json({
      count: caregivers.length,
      caregivers
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPairingCode = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("pairingCode role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "PATIENT") {
      return res.status(403).json({ error: "Not a patient account" });
    }

    // ✅ ensure pairing code exists
    if (!user.pairingCode) {
      user.pairingCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await user.save();
    }

    res.json({
      pairingCode: user.pairingCode
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};