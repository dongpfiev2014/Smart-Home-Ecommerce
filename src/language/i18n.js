import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// const getCurrentHost =
//   process.env.REACT_APP_MODE !== "development"
//     ? "http://localhost:3000"
//     : "LINK TO PROD";
const getCurrentHost = window.location.origin;

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: localStorage.getItem("i18nextLng") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
