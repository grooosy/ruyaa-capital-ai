
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import arCommon from "./locales/ar/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    ar: { common: arCommon },
  },
  lng: localStorage.getItem("ruyaa-lang") || (navigator.language.split('-')[0].includes("ar") ? "ar" : "en"),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["common"],
  defaultNS: "common",
});

export default i18n;
