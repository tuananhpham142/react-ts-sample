import i18n, { InitOptions, LanguageDetectorModule, Resource } from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import getLanguage from './getLanguage';
import setLanguage from './setLanguage';

const LANG_COOKIE_NAME = 'i18nInitLanguage';

const i18nConfig = ({
    resources,
    fallbackLng,
    namespace,
    i18nKey = LANG_COOKIE_NAME,
    backendOptions,
}: {
    resources: Resource;
    fallbackLng: string;
    namespace: string;
    i18nKey: string;
    backendOptions?: HttpBackendOptions;
}) => {
    const getLanguageDetector = getLanguage(i18nKey);

    getLanguageDetector ?? setLanguage(i18nKey, fallbackLng);

    const languageDetector: LanguageDetectorModule = {
        type: 'languageDetector',
        detect: () => {
            const lang = getLanguageDetector ? getLanguageDetector : fallbackLng;
            return lang;
        },
        cacheUserLanguage: () => {},
    };
    i18n.init({ resources: {} });

    const i18nOptions: InitOptions = {
        debug: false,
        resources,
        ns: [namespace],
        defaultNS: namespace,
        interpolation: {
            escapeValue: false,
        },
        fallbackLng: fallbackLng,
        load: 'all',
        react: {
            useSuspense: false,
        },
        backend: {
            backends: [
                LocalStorageBackend, // primary backend
                HttpApi, // fallback backend
            ],
            backendOptions: [
                {
                    /* options for primary backend */
                    prefix: 'i18next_cache_',
                },
                {
                    /* options for fallback backend */
                    ...backendOptions,
                },
            ],
        },
    };

    i18n.use(ChainedBackend).use(intervalPlural).use(initReactI18next).use(languageDetector).init(i18nOptions);

    i18n.addResourceBundle(
        'vi',
        namespace,
        {
            ...resources?.['vi'],
        },
        false,
        true,
    );
    i18n.addResourceBundle(
        'en',
        namespace,
        {
            ...resources?.['en'],
        },
        false,
        true,
    );

    return i18n;
};

export default i18nConfig;
