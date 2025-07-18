import getLanguage from './i18n/getLanguage';
import i18nConfig from './i18n/i18nConfig';
import * as resources from './resources';
export const initLangKeyStorage = import.meta.env.VITE_LANGUAGE as string;
export const initLang = getLanguage(initLangKeyStorage);
export const paramsUrl = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop: string) => searchParams.get(prop),
});
// const ns = Object.keys(Object.values(resources)[0]);
// export const defaultNS = ns[0];

const i18n = i18nConfig({
    resources: {
        ...Object.entries(resources).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value,
            }),
            {},
        ),
    },
    // resourceUrl: `https://cdn.digiticket.vn/Content/JsFile?url=/Tickets/sagacom-${initLang?.toLowerCase() || 'vi-vn'}.json`,
    fallbackLng: 'vi-VN',
    namespace: 'common',
    i18nKey: initLangKeyStorage,
});
//@ts-ignore
if (paramsUrl?.lang) {
    //@ts-ignore
    i18n.changeLanguage(paramsUrl?.lang as string);
}

export { i18n };
