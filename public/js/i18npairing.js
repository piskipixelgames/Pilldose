function applyTranslations() {

    const lang =
        window.APP_CONFIG?.LANGUAGE || "en";

    const t =
        translations[lang] || translations.en;

    document.title =
        t.pageTitle;

    document.getElementById("roleLabel").innerText =
        t.role;

    document.getElementById("weeklyScheduleText").innerText =
        t.weeklySchedule;

    document.getElementById("patientListText").innerText =
        t.patientList;

    document.getElementById("pairingText").innerText =
        t.pairing;

    document.getElementById("supportText").innerText =
        t.support;

    document.getElementById("archiveText").innerText =
        t.archive;

    document.getElementById("breadcrumbHome").innerText =
        t.breadcrumbHome;

    document.getElementById("breadcrumbPairing").innerText =
        t.breadcrumbPairing;

    document.getElementById("pageHeading").innerText =
        t.heading;

    document.getElementById("pageDescription").innerText =
        t.description;

    document.getElementById("generateCodeTitle").innerText =
        t.generateCode;

    document.getElementById("enterCodeText").innerText =
        t.enterCode;

    document.getElementById("connectBtn").innerText =
        t.connectPatient;

    document.getElementById("encryptionText").innerHTML =
        `<span class="font-bold">${t.encryptedTitle}</span> ${t.encryptedDescription}`;
}

document.addEventListener(
    "DOMContentLoaded",
    applyTranslations
);