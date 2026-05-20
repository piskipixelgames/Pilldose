const admin = require("firebase-admin");

const User = require("../models/User");

// ✅ Initialize Firebase Admin once

if (!admin.apps.length) {

  const serviceAccount =
    require("../firebase-service-account.json");

  admin.initializeApp({
    credential:
      admin.credential.cert(
        serviceAccount
      )
  });
}

async function sendPushNotification(
  userId,
  title,
  body,
  data = {}
) {
  try {

    const user =
      await User.findById(userId);

    if (!user) {
      console.log("User not found");

      return;
    }

    if (!user.fcmToken) {
      console.log(
        "User has no FCM token"
      );

      return;
    }

    const message = {

      token: user.fcmToken,

      notification: {
        title,
        body
      },

      data
    };

    const response =
      await admin.messaging()
        .send(message);

    console.log(
      "Push notification sent"
    );

    console.log(response);

  } catch (err) {

    console.error(
      "Push notification failed"
    );

    console.error(err);
  }
}

module.exports =
  sendPushNotification;