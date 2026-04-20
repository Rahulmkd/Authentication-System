let accessToken: string | null = null;

const TOKEN_KEY = "accessToken";

export const tokenService = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;

    // Always sync from localStorage if memory is empty
    if (!accessToken) {
      accessToken = localStorage.getItem(TOKEN_KEY);
    }

    return accessToken;
  },

  setToken: (token: string) => {
    accessToken = token;

    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  clearToken: () => {
    accessToken = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
};
