import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./english/common.json";
import mlTranslations from "./malayalam/common.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en", // default language
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    resources: {
      en: {
        common: enTranslations,
      },
      ml: {
        common: mlTranslations,
      },
    },

    // Namespace configuration
    defaultNS: "common",
    ns: ["common"],
  });

export default i18n;