export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface User {
  email: string;
  token: string;
}