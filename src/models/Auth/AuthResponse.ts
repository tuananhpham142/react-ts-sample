export interface LoginResponse {
    AccessToken: string;
    Expires: number;
    RefreshToken: string;
}
export interface RegisterResponse {}

export interface RegisterUnconfirmedInterface {
    username: string;
    confirmed: boolean;
}
