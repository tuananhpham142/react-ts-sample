import { LoginRequest } from '@/models/Auth/AuthRequest';
import { LoginResponse } from '@/models/Auth/AuthResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from './services';

const login = createAsyncThunk<LoginResponse, LoginRequest, {}>(
    'auth/login',
    async (payload: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await services.login(payload);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
);

const logout = createAsyncThunk('auth/logout', async () => {
    return await services.logout();
});

export { login, logout };
