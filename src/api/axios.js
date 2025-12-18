import axios from "axios";

// 1) Si viene desde .env, usamos eso
// 2) Si no, usamos local por defecto
const RAW_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Quitamos "/" del final si lo hubiera
const BASE_URL = RAW_BASE.replace(/\/+$/, "") + "/api";

console.log("DEBUG BASE_URL =>", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token de autenticación automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token_access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos 401, borramos token y redirigimos al login
    if (error?.response?.status === 401) {
      localStorage.removeItem("token_access");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
