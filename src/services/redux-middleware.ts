import removeCookie from '@/utils/cookies/removeCookie';
import setCookie from '@/utils/cookies/setCookie';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginReducer, logoutReducer } from './auth';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: loginReducer,
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
    actionCreator: logoutReducer,
    effect: async (action, api) => {
        removeCookie(import.meta.env.VITE_AUTH_KEY as string);
        removeCookie(import.meta.env.VITE_AUTH_REFRESH as string);
    },
});

export default listenerMiddleware;
