import Cookies from 'universal-cookie';

const getCookie = (name: string, decrypt?: Function) => {
    const cookies = new Cookies();
    const value = cookies.get(name);
    return value ? (decrypt ? decrypt(value) : value) : undefined;
};
export default getCookie;
