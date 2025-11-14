import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token_access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el backend devuelve 401, limpia token y manda a /login
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token_access");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
