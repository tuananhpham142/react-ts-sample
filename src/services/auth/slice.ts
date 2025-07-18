import { TokenPayloadModel } from '@/models/Auth/AuthModel';
import { LoginResponse } from '@/models/Auth/AuthResponse';
import getCookie from '@/utils/cookies/getCookie';
import parseJwt from '@/utils/jwt';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
const token = getCookie(import.meta.env.VITE_AUTH_KEY as string);
const refreshToken = getCookie(import.meta.env.VITE_AUTH_REFRESH as string);

const initialState: {
    data: {
        AccessToken: string;
        RefreshToken: string;
    };
    tokenPayload: TokenPayloadModel;
} = {
    data: {
        AccessToken: token || '',
        RefreshToken: refreshToken || '',
    },
    tokenPayload: token
        ? parseJwt(token)
        : {
              permission: [],
          },
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginResponse>) => {
            return {
                ...state,
                data: action.payload,
                tokenPayload: jwtDecode(action.payload.AccessToken),
            };
        },
        logout: (state) => {
            return {
                ...state,
                data: {
                    AccessToken: '',
                    Expires: 0,
                    RefreshToken: '',
                },
            };
        },
    },
});

export default slice;
export const { login, logout } = slice.actions;
export const { reducer: authReducer } = slice;
