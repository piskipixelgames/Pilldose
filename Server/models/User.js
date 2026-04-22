const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: { 
    type: String, 
    unique: true, 
    required: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  role: {
    type: String,
    enum: ["PATIENT", "CAREGIVER"],
    required: true
  },

  // 👨‍⚕️ Caregivers linked to a patient
  caregivers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  // 👥 Patients linked to a caregiver
  patients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  // 🔑 Pairing Code (ONLY for patients)
  pairingCode: {
    type: String,
    unique: false,
    sparse: true,   // allows null for caregivers
    minlength: 6,
    maxlength: 6
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", userSchema);