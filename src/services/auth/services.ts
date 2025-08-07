import { LoginRequest } from '@/models/Auth/AuthRequest';
import { LoginResponse } from '@/models/Auth/AuthResponse';
import axios from '../axios';

const login = async (body: LoginRequest): Promise<LoginResponse> =>
    axios.post<LoginResponse>('/auth/login', body).then((res) => res.data);

const logout = async (): Promise<LoginResponse> => axios.post<LoginResponse>('/auth/logout').then((res) => res.data);

export { login, logout };
