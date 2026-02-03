import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AppointmentForm = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  const services = [
    { id: 1, name: "General Consultation" },
    { id: 2, name: "Specialist Consultation" },
    { id: 3, name: "Follow-up Appointment" },
    { id: 4, name: "Telehealth Consultation" },
  ];

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
  ];

  let submitForm = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      service: "",
      appointmentdate: "",
      timeslot: "",
    },
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);

      setTimeout(() => {
        setSuccess(true);
        resetForm();
        setIsLoading(false);

        setTimeout(() => setSuccess(false), 3000);
      }, 800);
    },

    validationSchema: yup.object({
      fullname: yup.string().required("Name is required").min(3),
      email: yup.string().required("Email is required").email(),
      service: yup.string().required(),
      appointmentdate: yup.string().required(),
      timeslot: yup.string().required(),
    }),
  });

  /* 🎨 Dark mode friendly styles */
  const base =
    "w-full px-4 py-2 border rounded-lg outline-none transition text-gray-900 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 " +
    "dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:focus:ring-blue-400";

  const invalid =
    "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/services")}
        className="text-blue-600 dark:text-blue-400 hover:underline mb-4"
      >
        ← Back to Services
      </button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl shadow-lg p-8 
                   bg-white text-gray-800
                   dark:bg-slate-900 dark:text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Book Your Appointment</h2>

        {/* Success message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-lg text-sm
                         bg-green-100 text-green-700
                         dark:bg-green-900/40 dark:text-green-300"
            >
              Appointment submitted successfully 🎉
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={submitForm.handleSubmit}>
          <div className="space-y-6">
            {/* Fullname */}
            <div>
              <label className="block font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>

              <input
                name="fullname"
                value={submitForm.values.fullname}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.fullname && submitForm.errors.fullname
                    ? invalid
                    : ""
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email Address *</label>

              <input
                name="email"
                value={submitForm.values.email}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.email && submitForm.errors.email
                    ? invalid
                    : ""
                }`}
              />
            </div>

            {/* Service */}
            <select
              name="service"
              value={submitForm.values.service}
              onChange={submitForm.handleChange}
              className={base}
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              name="appointmentdate"
              value={submitForm.values.appointmentdate}
              onChange={submitForm.handleChange}
              className={base}
            />

            {/* Time */}
            <select
              name="timeslot"
              value={submitForm.values.timeslot}
              onChange={submitForm.handleChange}
              className={base}
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={IsLoading}
              className="w-full py-3 rounded-lg font-medium
                         bg-blue-600 text-white
                         hover:bg-blue-700
                         dark:bg-blue-500 dark:border dark:hover:bg-blue-600
                         disabled:bg-gray-400"
            >
              {IsLoading ? "Booking..." : "Book Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AppointmentForm;
