function applySchedulerTranslations() {

  const lang =
    window.APP_CONFIG?.LANGUAGE || "en";

  const t =
    schedulerTranslations[lang] ||
    schedulerTranslations.en;

  document.title =
    t.pageTitle;

  document.getElementById(
    "weeklyScheduleText"
  ).innerText =
    t.weeklySchedule;

  document.getElementById(
    "patientListText"
  ).innerText =
    t.patientList;

  document.getElementById(
    "pairingText"
  ).innerText =
    t.pairing;

  document.getElementById(
    "yourPatientText"
  ).innerText =
    t.yourPatient;

  document.getElementById(
    "schedulerTitle"
  ).innerText =
    t.schedulerTitle;

  document.getElementById(
    "schedulerDescription"
  ).innerText =
    t.schedulerDescription;

  document.getElementById(
    "publishScheduleBtn"
  ).innerText =
    t.publishSchedule;

  document.getElementById(
    "addMedicationTitle"
  ).innerText =
    t.addMedication;

  document.getElementById(
    "medicineInput"
  ).placeholder =
    t.medicinePlaceholder;

  document.getElementById(
    "cancelBtn"
  ).innerText =
    t.cancel;

  document.getElementById(
    "saveBtn"
  ).innerText =
    t.save;
}

document.addEventListener(
  "DOMContentLoaded",
  applySchedulerTranslations
);