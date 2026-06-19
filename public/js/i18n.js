function toggleLanguage() {

    const current =
        localStorage.getItem("language") || "en";

    const next =
        current === "en"
            ? "es"
            : "en";

    localStorage.setItem(
        "language",
        next
    );

    window.APP_CONFIG.LANGUAGE =
        next;

    applyTranslations();
}

function applyTranslations() {

    //const lang =
      //  window.APP_CONFIG?.LANGUAGE || "en";

      const lang =

        localStorage.getItem("language") ||

        window.APP_CONFIG?.LANGUAGE ||

        "en";

    const t =
        translations[lang] || translations.en;

    document.title = t.pageTitle;

    document.getElementById("smartMedication").innerHTML =
        lang === "es"
            ? "Gestión Inteligente <br> de Medicación"
            : "Smart Medication <br> Simplified";

    document.getElementById("description").innerText =
        t.description;

    document.getElementById("hipaa").innerText =
        t.hipaa;

    document.getElementById("encryption").innerText =
        t.encryption;

    document.getElementById("welcomeBack").innerText =
        t.welcomeBack;

    document.getElementById("workspace").innerText =
        t.workspace;

    document.getElementById("emailLabel").innerText =
        t.email;

    document.getElementById("passwordLabel").innerText =
        t.password;

    document.getElementById("forgotPassword").innerText =
        t.forgotPassword;

    document.getElementById("signInBtn").innerText =
        t.signIn;

    document.getElementById("newUser").innerText =
        t.newUser;

    document.getElementById("createAccount").innerText =
        t.createAccount;

    document.getElementById("privacy").innerText =
        t.privacy;

    document.getElementById("terms").innerText =
        t.terms;

    document.getElementById("accessibility").innerText =
        t.accessibility;

    document.getElementById("footerText").innerText =
        t.footer;
}

document.addEventListener(
    "DOMContentLoaded",
    applyTranslations
);