import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translatiionEN from "../../locales/en/translation.json";
import translatiionRU from "../../locales/ru/translation.json";
import translatiionAM from "../../locales/am/translation.json";

const resources = {
    en: {
        translation: translatiionEN
    },
    ru: {
        translation: translatiionRU
    },
    am: {
        translation: translatiionAM
    },
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        debug: false,
        fallbackLang: "am",
    });

i18n.changeLanguage("am");

export default i18n;