import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // adjust if needed
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Auto-attach token from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
