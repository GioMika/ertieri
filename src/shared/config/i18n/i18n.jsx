import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "ru",
      debug: false,

      // ✅ чтобы ru-RU / en-US не ломали загрузку файлов
      supportedLngs: ["ru", "en", "ge"],
      nonExplicitSupportedLngs: true,
      load: "languageOnly",

      ns: ["header", "services", "contact", "about", "blog", "excursions", "beachRelax", "mountainRelax", "casinoTour", "weddingTour","main"],
      defaultNS: "header",

      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },

      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },

      interpolation: { escapeValue: false },
    });

export default i18n;
