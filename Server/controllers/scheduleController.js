const Schedule = require("../models/Schedule");

exports.createSchedule = async (req, res) => {
  try {
    const { schedules } = req.body;

    if (!schedules || schedules.length === 0) {
      return res.status(400).json({ message: "No schedules provided" });
    }

    console.log("📥 Incoming schedules:", schedules);

    const savedSchedules = await Schedule.insertMany(schedules);

    // ✅ Log what was actually saved in DB
    console.log("✅ Saved schedules:");
    savedSchedules.forEach(s => {
      console.log({
        id: s._id,
        patientId: s.patientId,
        date: s.date,
        timeSlot: s.timeSlot,
        actualTime: s.actualTime,
        medicine: s.medicine,
        status: s.status
      });
    });

    res.json({
      message: "Schedules saved successfully",
      count: savedSchedules.length
    });

  } catch (err) {
    console.error("❌ ERROR saving schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};