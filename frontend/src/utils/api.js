import axios from "axios";
import store from "../app/store";
import { logout } from "../features/auth/authSlice";

// Ensure the environment variable is loaded correctly
const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If token is expired or invalid, trigger logout action
      store.dispatch(logout());
      alert("Session expired. Please login again."); // Optional: Alert user
    }
    return Promise.reject(error);
  }
);

export default api;
