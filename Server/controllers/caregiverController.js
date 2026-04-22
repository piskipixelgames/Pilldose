const User = require("../models/User");
const mongoose = require("mongoose");

exports.getPatientsForCaregiver = async (req, res) => {
  try {
    const { caregiverId } = req.params;

    console.log("Fetching patients for caregiver:", caregiverId);

    const caregiverObjectId = new mongoose.Types.ObjectId(caregiverId);

    const patients = await User.find({
      caregivers: caregiverObjectId,
      role: "PATIENT"
    }).select("name email caregivers");

    console.log("Patients found:", patients);

    res.json({
      count: patients.length,
      patients
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};