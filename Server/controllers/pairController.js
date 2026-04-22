const User = require("../models/User");

exports.pairPatient = async (req, res) => {
  try {


  const { code, caregiverId } = req.body;

const cleanCode = String(code).trim();
console.log("Received code:", cleanCode);

    if (!code || !caregiverId) {
      return res.status(400).json({ message: "Code and caregiverId required" });
    }
const allPatients = await User.find({ role: "PATIENT" });
console.log("All patients pairing codes:", allPatients.map(p => p.pairingCode));
    // 🔍 Find patient with this pairing code
const patient = await User.findOne({ pairingCode: cleanCode });

    if (!patient) {
      return res.status(404).json({ message: "Invalid pairing code" });
    }

    if (patient.role !== "PATIENT") {
      return res.status(400).json({ message: "Invalid patient" });
    }

    // 🔍 Find caregiver
    const caregiver = await User.findById(caregiverId);

    if (!caregiver || caregiver.role !== "CAREGIVER") {
      return res.status(400).json({ message: "Invalid caregiver" });
    }

    // ❌ Prevent duplicate pairing
    if (patient.caregivers.includes(caregiver._id)) {
      return res.status(400).json({ message: "Already paired" });
    }

    // 🔗 Link both sides
    patient.caregivers.push(caregiver._id);
    caregiver.patients.push(patient._id);

    await patient.save();
    await caregiver.save();



console.log("✅ SAVED PAIRING:");
console.log("Patient caregivers:", patient.caregivers);
console.log("Caregiver patients:", caregiver.patients);

    // (Optional) invalidate code after use
    patient.pairingCode = null;
    await patient.save();

    res.json({
      message: "Patient paired successfully",
      patient: {
        id: patient._id,
        name: patient.name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};