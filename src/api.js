import axios from "axios";

// Create instance
const api = axios.create({
  //baseURL: "http://localhost:5000/api", 
  baseURL: "https://poems-omega.vercel.app/api", 
  headers:{
    "Content-Type": "application/json",
  }
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
