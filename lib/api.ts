import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import  Cookies  from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || /*"http://localhost:8080"*/"https://fleetbeambackend.onrender.com",
  // withCredentials: true, // uncomment if your API requires sending cookies on cross-origin requests
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get("jwt");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default api;
