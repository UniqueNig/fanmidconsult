// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// POST → create appointment
export const createAppointment = (data) => {
  return API.post("/appointments", data);
};

// GET → fetch appointments
export const getAppointments = () => {
  return API.get("/appointments");
};
