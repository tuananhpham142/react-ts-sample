import Cookies, { CookieSetOptions } from 'universal-cookie';

const removeCookie = (name: string, options?: CookieSetOptions) => {
    const cookies = new Cookies();

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
    cookies.remove(name, cookieOptions);
};
export default removeCookie;
