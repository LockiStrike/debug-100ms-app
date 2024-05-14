import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { changeDayJSLocale } from './time.utils';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        backend: {
            loadPath: '/public/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'en',
        load: 'languageOnly',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            caches: [],
        },
    });

i18n.on('languageChanged', () => {
    changeDayJSLocale();
});

export default i18n;
