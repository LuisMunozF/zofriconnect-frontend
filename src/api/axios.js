import axios from "axios";

// 1) Si viene desde .env, usamos eso
// 2) Si no, usamos Render por defecto
const RAW_BASE =
  import.meta.env.VITE_API_URL ||
  "https://zofriconnect-backend.onrender.com";

// Quitamos "/" del final si lo hubiera
const NORMALIZED_BASE = RAW_BASE.replace(/\/+$/, "");

console.log("DEBUG BASE_URL =>", NORMALIZED_BASE + "/api");

const api = axios.create({
  // Resultado final:
  //  - si usas .env local → http://127.0.0.1:8000/api
  //  - si no, Render      → https://zofriconnect-backend.onrender.com/api
  baseURL: NORMALIZED_BASE + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token_access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token_access");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

