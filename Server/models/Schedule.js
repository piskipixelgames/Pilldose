const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String, // or Date (better option below)
    required: true
  },

  timeSlot: {
    type: String, // MORNING / MIDDAY / EVENING
    enum: ["MORNING", "MIDDAY", "EVENING"],
    required: true
  },

  actualTime: {
    type: String, // "08:30"
    required: true
  },

  medicine: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "TAKEN", "MISSED"],
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);