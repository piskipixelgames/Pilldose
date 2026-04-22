const Schedule = require("../models/Schedule");
const mongoose = require("mongoose");

exports.getStats = async (req, res) => {
  try {
    const patientId = new mongoose.Types.ObjectId(req.params.userId);

    // 🔥 ALL schedules
    const total = await Schedule.countDocuments({ patientId });

    // ✅ TAKEN schedules
    const taken = await Schedule.countDocuments({
      patientId,
      status: "TAKEN"
    });

    // ❌ MISSED (optional)
    const missed = await Schedule.countDocuments({
      patientId,
      status: "MISSED"
    });

    const adherence =
      total === 0 ? 0 : Math.round((taken / total) * 100);

    res.json({
      total,
      taken,
      missed,
      adherence
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching stats" });
  }
};