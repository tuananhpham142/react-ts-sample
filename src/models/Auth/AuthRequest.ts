export interface LoginRequest {
    Username: string;
    Password: string;
}

export interface RegisterRequest {
    Username: string;
    DisplayName: string;
    Password: string;
    ConfirmPassword: string;
}
