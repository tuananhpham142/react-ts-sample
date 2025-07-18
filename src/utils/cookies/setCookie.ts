import Cookies, { CookieSetOptions } from 'universal-cookie';

const setCookie = ({
    name,
    encrypt,
    value,
    options,
}: {
    name: string;
    encrypt?: Function;
    value: string;
    options?: CookieSetOptions;
}) => {
    let cookieOptions: CookieSetOptions = {
        secure: true,
        sameSite: true,
        path: '/',
    };

    if (options) {
        cookieOptions = {
            ...cookieOptions,
            ...options,
        };
    }
    const cookies = new Cookies();
    const cookieValue = encrypt ? encrypt(value) : value;
    cookies.set(name, cookieValue, cookieOptions);
};
export default setCookie;
