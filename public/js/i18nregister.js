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

   // const lang =
       // window.APP_CONFIG?.LANGUAGE || "en";

           const lang =

        localStorage.getItem("language") ||

        window.APP_CONFIG?.LANGUAGE ||

        "en";


    const t =
        translations[lang] || translations.en;

    document.title = t.pageTitle;

    document.getElementById("beginJourney").innerText =
        t.beginJourney;

    document.getElementById("heading").innerText =
        t.heading;

    document.getElementById("description").innerText =
        t.description;

    document.getElementById("hipaaTitle").innerText =
        t.hipaaTitle;

    document.getElementById("hipaaDesc").innerText =
        t.hipaaDesc;

    document.getElementById("insightsTitle").innerText =
        t.insightsTitle;

    document.getElementById("insightsDesc").innerText =
        t.insightsDesc;

    document.getElementById("personalInfo").innerText =
        t.personalInfo;

    document.getElementById("fullNameLabel").innerText =
        t.fullName;

    document.getElementById("emailAddressLabel").innerText =
        t.emailAddress;

    document.getElementById("profileType").innerText =
        t.profileType;

    document.getElementById("patientTitle").innerText =
        t.patient;

    document.getElementById("patientDesc").innerText =
        t.patientDesc;

    document.getElementById("caregiverTitle").innerText =
        t.caregiver;

    document.getElementById("caregiverDesc").innerText =
        t.caregiverDesc;

    document.getElementById("accountSecurity").innerText =
        t.accountSecurity;

    document.getElementById("createPassword").innerText =
        t.createPassword;

    //document.getElementById("rule-length-text").innerText =
      //  t.ruleLength;

    document.getElementById("rule-number-text").innerText =
        t.ruleNumber;

    document.getElementById("rule-symbol-text").innerText =
        t.ruleSymbol;

    document.getElementById("completeSignupBtn").innerText =
        t.completeSignup;

    document.getElementById("alreadyAccount").innerText =
        t.alreadyAccount;

    document.getElementById("loginLink").innerText =
        t.login;

    document.getElementById("privacyPolicyLink").innerText =
        t.privacyPolicy;

    document.getElementById("termsLink").innerText =
        t.terms;

    document.getElementById("hipaaComplianceLink").innerText =
        t.hipaaCompliance;

    document.getElementById("accessibilityLink").innerText =
        t.accessibility;

    document.getElementById("footerText").innerText =
        t.footer;
}

document.addEventListener(
    "DOMContentLoaded",
    applyTranslations
);
