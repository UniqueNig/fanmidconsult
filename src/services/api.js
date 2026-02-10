import axios from "axios";

const API = axios.create({
  // baseURL: "https://appointment-backend-q9hx.onrender.com/api",
  baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// 🔐 Attach token automatically
// ===============================
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===============================
// USER (public)
// ===============================
export const createAppointment = (data) =>
  API.post("/appointments", data).then((res) => res.data);

// ===============================
// ADMIN (protected)
// ===============================
export const getAppointments = () =>
  API.get("/appointments").then((res) => res.data);

export const deleteAppointment = (id) =>
  API.delete(`/appointments/${id}`).then((res) => res.data);

// ===============================
// AUTH
// ===============================
export const adminLogin = (data) =>
  API.post("/admin/login", data).then((res) => res.data);

export const getBookedSlots = (date) =>
  API.get(`/appointments/slots/${date}`).then((res) => res.data);

export const adminLogout = () => {
  localStorage.removeItem("token");
};

// ✅ NEW – Paystack initialize
export const initializePayment = (payload) =>
  API.post("/payments/initialize", payload).then((res) => res.data);


// ✅ NEW – Paystack verify
export const verifyPayment = (reference) =>
  API.get(`/payments/verify/${reference}`).then((res) => res.data);
