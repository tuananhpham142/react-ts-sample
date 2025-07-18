const date = new Date();

export const today = () => new Date();

export const firstDayOfMonth = () => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};
export const sameDateLastMonth = () => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
export const sameDateLastYear = () => {
    return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
};
