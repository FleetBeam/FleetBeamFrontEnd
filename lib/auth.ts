import api from "./api";
import Cookies from "js-cookie";

interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { username, password });
    const token = response.data.token;

    Cookies.set("jwt", token, { expires: 7, secure: true, sameSite: "Lax" });

    return token;
  } catch (error) {
    // Add your error handling here
    throw error;
  }
}
