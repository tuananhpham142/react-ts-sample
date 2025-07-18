import getCookie from '@/utils/cookies/getCookie';
import removeCookie from '@/utils/cookies/removeCookie';
import type { InternalAxiosRequestConfig } from 'axios';
import axiosBase from 'axios';
import { API_URL } from './api';

export type AxiosRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const accessControlAllowOrigin = {
    'Access-Control-Allow-Origin': '*',
};

let axios = axiosBase.create({
    baseURL: API_URL,
    withCredentials: false, // to use cookies
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getCookie(import.meta.env.VITE_AUTH_KEY as string)}`,
        timeout: 30000,
        ...accessControlAllowOrigin,
    },
});

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }

        return { ...config, ...accessControlAllowOrigin };
    },
    (error: any) => Promise.reject(error),
);

axios.interceptors.response.use(undefined, async (err) => {
    const error = err.response;
    // if error is 401
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
        await removeCookie(import.meta.env.VITE_AUTH_KEY as string);
        await removeCookie(import.meta.env.VITE_AUTH_REFRESH as string);
    }
});

export default axios;
