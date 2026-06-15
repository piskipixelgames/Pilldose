const LANG = window.APP_LANG || "en";

const translations = {
  en: {
    pageTitle: "Sign Up | Pill Dose",
    beginJourney: "Begin Your Journey",
    heading: "Smart Patient Medication Management.",
    description:
      "Manage and monitor medication effortlessly. Patients take doses with guided AR, while caregivers stay informed in real-time — ensuring better adherence and peace of mind.",

    hipaaTitle: "HIPAA Compliant",
    hipaaDesc:
      "Your privacy is our baseline. Data encrypted at every touchpoint.",

    insightsTitle: "Precision Insights",
    insightsDesc:
      "Sophisticated tonal layering for clear clinical visualization.",

    personalInfo: "Personal Information",
    fullName: "Full Name",
    emailAddress: "Email Address",

    profileType: "Profile Type",

    patient: "Patient",
    patientDesc:
      "I am seeking care and managing my own health records.",

    caregiver: "Caregiver",
    caregiverDesc:
      "I am a healthcare advocate managing care for others.",

    accountSecurity: "Account Security",
    createPassword: "Create Password",

    ruleLength: "8+ Characters",
    ruleNumber: "One Number",
    ruleSymbol: "One Symbol",

    termsText: "I agree to the",
    terms: "Terms of Service",
    privacy: "HIPAA Privacy Policy",

    completeSignup: "Complete Sign Up",

    alreadyAccount: "Already have an account?",
    login: "Log In",

    privacyPolicy: "Privacy Policy",
    hipaaCompliance: "HIPAA Compliance",
    accessibility: "Accessibility",

    footer:
      "© 2024 The Pill Dose. Empathetic Precision in Healthcare."
  },

  es: {
    pageTitle: "Registro | Pill Dose",
    beginJourney: "Comience su viaje",
    heading: "Gestión Inteligente de Medicación para Pacientes.",
    description:
      "Administre y supervise los medicamentos fácilmente. Los pacientes toman dosis con guía AR mientras los cuidadores reciben información en tiempo real para mejorar la adherencia y brindar tranquilidad.",

    hipaaTitle: "Cumplimiento HIPAA",
    hipaaDesc:
      "Su privacidad es nuestra prioridad. Datos cifrados en cada punto de contacto.",

    insightsTitle: "Información Precisa",
    insightsDesc:
      "Visualización clínica clara mediante sofisticadas capas de información.",

    personalInfo: "Información Personal",
    fullName: "Nombre Completo",
    emailAddress: "Correo Electrónico",

    profileType: "Tipo de Perfil",

    patient: "Paciente",
    patientDesc:
      "Busco atención médica y gestiono mis propios registros de salud.",

    caregiver: "Cuidador",
    caregiverDesc:
      "Soy un defensor de la salud que administra la atención de otras personas.",

    accountSecurity: "Seguridad de la Cuenta",
    createPassword: "Crear Contraseña",

    ruleLength: "8+ Caracteres",
    ruleNumber: "Un Número",
    ruleSymbol: "Un Símbolo",

    termsText: "Acepto los",
    terms: "Términos de Servicio",
    privacy: "Política de Privacidad HIPAA",

    completeSignup: "Completar Registro",

    alreadyAccount: "¿Ya tiene una cuenta?",
    login: "Iniciar Sesión",

    privacyPolicy: "Política de Privacidad",
    hipaaCompliance: "Cumplimiento HIPAA",
    accessibility: "Accesibilidad",

    footer:
      "© 2024 Pill Dose. Precisión empática en la atención médica."
  }
};

const t = translations[LANG];