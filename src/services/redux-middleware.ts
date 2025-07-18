import removeCookie from '@/utils/cookies/removeCookie';
import setCookie from '@/utils/cookies/setCookie';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { login, logout } from './auth/slice'; // Action cần lắng nghe

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: login,
    effect: async (action, api) => {
        setCookie({
            name: import.meta.env.VITE_AUTH_KEY as string,
            value: action.payload.AccessToken,
            options: {
                maxAge: action.payload.Expires,
            },
        });
        setCookie({
            name: import.meta.env.VITE_AUTH_REFRESH as string,
            value: action.payload.RefreshToken,
            options: {
                maxAge: action.payload.Expires,
            },
        });
    },
});

listenerMiddleware.startListening({
    actionCreator: logout,
    effect: async (action, api) => {
        removeCookie(import.meta.env.VITE_AUTH_KEY as string);
        removeCookie(import.meta.env.VITE_AUTH_REFRESH as string);
    },
});

export default listenerMiddleware;
