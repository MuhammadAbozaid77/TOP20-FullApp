import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧠 Request Interceptor
axiosWithConfig.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚙️ Response Interceptor
axiosWithConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⛔ Unauthorized: Token expired or invalid.");
      // تقدر تعمل redirect هنا أو dispatch لعملية logout
      // window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export default axiosWithConfig;
