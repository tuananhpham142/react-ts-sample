const getLanguage = (key: string) => {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : undefined;
};

export default getLanguage;
