import dayjs from 'dayjs';
import i18n from 'i18next';

function calc(ms: number) {
    return function (amount: number) {
        return Math.round(amount * ms);
    };
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const seconds = calc(1e3);
export const minutes = calc(6e4);
export const hours = calc(36e5);
export const days = calc(864e5);
export const weeks = calc(6048e5);
export const months = calc(26298e5);
export const years = calc(315576e5);

export const changeDayJSLocale = () => {
    const lang = i18n.resolvedLanguage;
    if (lang === dayjs().locale()) return;

    import(`dayjs/locale/${lang}`).then(() => {
        dayjs.locale(lang);
    });
};
