const setLanguage = (key: string, lang: string, reload: boolean = true) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, lang);
        if (reload) window.location.reload();
    }
};

export default setLanguage;
