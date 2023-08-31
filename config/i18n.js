import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // your config options here
    resources: {
        en: {
            translation: {
                "menu": {
                    "about": "About",
                    "services": "Services",
                    "blog": "Blog",
                    "contact": "Contact"
                }
            },
        },
        ru : {
            translation: {
                "menu": 
                    {
                        "about": "О нас",
                        "services": "Услуги",
                        "blog": "Блог",
                        "contact": "Контакты"
                    }
                
            },
        },

    },
    lng: "en", // default language
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

export default i18n;