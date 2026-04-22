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