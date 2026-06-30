require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 ADD THIS

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const auth = require("./controllers/authController");
const pairController = require("./controllers/pairController");
const caregiverController = require("./controllers/caregiverController");
const patientController = require("./controllers/patientController");
const scheduleController = require("./controllers/scheduleController");
const statsController = require("./controllers/statsController");
const dashboardController =
  require("./controllers/dashboardController");
const sendPushNotification =
  require("./utils/sendPushNotification");
  
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

  

app.post("/auth/register", auth.register);
app.post("/auth/login", auth.login);
app.post("/api/pair", pairController.pairPatient);
app.get("/api/caregiver/:caregiverId/patients", caregiverController.getPatientsForCaregiver);
app.get("/api/patient/:patientId/caregivers", patientController.getCaregiversForPatient);
app.get("/api/getcode/:id", patientController.getPairingCode);
app.post("/api/schedule", scheduleController.createSchedule);
app.get("/api/schedule/:patientId", scheduleController.getSchedulesForPatient);
app.delete("/schedule/:id", scheduleController.deleteSchedule);
app.get("/api/stats/:userId", statsController.getStats);
app.use("/api/device-token", require("./controllers/deviceToken"));
app.get(
  "/api/patient/:patientId/dashboard",
  dashboardController.getDashboard
);
app.get(
  "/test-push/:userId",
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      await sendPushNotification(
        userId,
        "Medication Reminder",
        "Time to take your medicine",
        {
          type: "MEDICATION_REMINDER",
          screen: "Schedule"
        }
      );

      res.json({
        success: true,
        message:
          "Push notification sent"
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error:
          "Failed to send push"
      });
    }
  }
);
app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);