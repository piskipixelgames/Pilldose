function applyTranslations() {

    const lang =
        window.APP_CONFIG?.LANGUAGE || "en";

    const t =
        translations[lang] || translations.en;

    document.title =
        t.pageTitle;

    // Main Dashboard

    document.getElementById("lastDoseLabel").innerText =
        t.lastDose;

    document.getElementById("progressText").innerText =
        t.loadingProgress;

    document.getElementById("clinicalInsightTitle").innerText =
        t.clinicalInsightTitle;

    document.getElementById("clinicalInsightText").innerText =
        t.clinicalInsightLoading;

    // Stats Cards

    document.getElementById("adherenceTodayLabel").innerText =
        t.adherenceToday;

    document.getElementById("adherenceTrend").innerText =
        t.adherenceLoading;

    document.getElementById("nextDoseLabel").innerText =
        t.nextDose;

    document.getElementById("doseStatus").innerText =
        t.checkingSchedule;

    // Mobile Bottom Nav

    document.getElementById("navHome").innerText =
        t.home;

    document.getElementById("navPillbox").innerText =
        t.pillbox;

    document.getElementById("navCaregiver").innerText =
        t.caregiver;

    document.getElementById("navProfile").innerText =
        t.profile;
}

document.addEventListener(
    "DOMContentLoaded",
    applyTranslations
);