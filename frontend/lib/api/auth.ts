import { api } from "../axios";
import { RegisterUserFormData } from "../validators/auth";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
}

export const authApi = {
  register: async (data: RegisterUserFormData) => {
    const res = await api.post("/auth/register", data);
    return res.data.data as AuthResponse;
  },
};
