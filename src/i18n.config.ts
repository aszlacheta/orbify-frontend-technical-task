import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';

const DEFAULT_LANGUAGE_CODE = 'en';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en
            }
        },
        lng: DEFAULT_LANGUAGE_CODE,
        fallbackLng: DEFAULT_LANGUAGE_CODE,

        interpolation: {
            escapeValue: false
        }
    });
