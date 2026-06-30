exports.getDashboard =
  async (req, res) => {

    try {

      const Schedule =
        require("../models/Schedule");

      const patientId =
        req.params.patientId;

      const schedules =
        await Schedule.find({
          patientId
        });

      const now =
        new Date();

      let nextDose = null;
      let lastDose = null;

      schedules.forEach(schedule => {

        const doseDateTime =
          new Date(
            `${schedule.date}T${schedule.actualTime}`
          );

        // Next Dose

        if (
          doseDateTime > now &&
          (
            !nextDose ||
            doseDateTime <
            nextDose.dateTime
          )
        ) {
          nextDose = {
            ...schedule.toObject(),
            dateTime: doseDateTime
          };
        }

        // Last Dose

        if (
          doseDateTime <= now &&
          (
            !lastDose ||
            doseDateTime >
            lastDose.dateTime
          )
        ) {
          lastDose = {
            ...schedule.toObject(),
            dateTime: doseDateTime
          };
        }

      });

      const total =
        schedules.length;

      const taken =
        schedules.filter(
          x =>
            x.status === "TAKEN"
        ).length;

      const adherence =
        total === 0
          ? 0
          : Math.round(
              (taken / total) * 100
            );

      res.json({
        success: true,
        adherence,
        lastDose,
        nextDose
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  };