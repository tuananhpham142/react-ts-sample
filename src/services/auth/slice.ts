import { LoginResponse } from '@/models/Auth/AuthResponse';
import parseJwt from '@/utils/jwt';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as thunk from './thunk';
interface State {
    token: LoginResponse;
    isLoading: boolean;
    isLogin: boolean;
    user: {
        id: string;
        avatar: string;
        firstName: string;
        lastName: string;
    };
}

const initialStateLogin: State = {
    isLoading: false,
    isLogin: false,
    token: {
        AccessToken: '',
        Expires: 0,
        RefreshToken: '',
    },
    user: {
        id: '',
        avatar: '',
        firstName: '',
        lastName: '',
    },
};

const auth = createSlice({
    name: 'auth',
    initialState: initialStateLogin,
    reducers: {
        loginReducer: (state, action: PayloadAction<LoginResponse>) => {
            return {
                ...state,
                data: action.payload,
                tokenPayload: parseJwt(action.payload.AccessToken),
            };
        },
        logoutReducer: (state) => {
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
    extraReducers: (builder) => {
        builder.addCase(thunk.login.pending, (state, action) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunk.login.fulfilled, (state, action) => {
            return {
                ...state,
                isLogin: true,
                isLoading: false,
                ...action.payload,
            };
        });
        builder.addCase(thunk.login.rejected, (state, action) => {
            return { ...state, isLoading: false, isLogin: false };
        });
        // Logout
        builder.addCase(thunk.logout.pending, (state, action) => {
            return { ...state };
        });
        builder.addCase(thunk.logout.fulfilled, (state, action) => {
            return {
                ...state,
                ...initialStateLogin,
            };
        });
        builder.addCase(thunk.logout.rejected, (state, action) => {
            return { ...state };
        });
    },
});

export default auth;
