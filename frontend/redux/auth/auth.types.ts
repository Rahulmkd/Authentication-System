export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
}

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
