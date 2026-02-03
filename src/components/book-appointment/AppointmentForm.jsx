import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../services/api";

const AppointmentForm = () => {
  const [IsLoading, setIsLoading] = useState(false);
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
    onSubmit: (values) => {
      setIsLoading(true);
      navigate("/booking-successfull");
      // createAppointment(values)
      //   .then(() => {
      //     navigate("/success");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    },

    validationSchema: yup.object({
      fullname: yup
        .string()
        .required("Name is required")
        .min(3, "Name is too short"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid Email Address"),
      service: yup.string().required("Service is required"),
      appointmentdate: yup.string().required("Date is required"),
      timeslot: yup.string().required("Timeslot is required"),
    }),
  });

  const base =
    "w-full px-4 py-2 border rounded-lg outline-none text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white";

  const valid = "border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white";
  const invalid = "border-red-500 focus:ring-2 focus:ring-red-500 bg-red-50";
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/services")}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Services
        </button>

        <div className="dark:text-white text-gray-800 rounded-lg shadow-md p-8">
          <h2
            className={`text-3xl font-bold mb-6 dark:text-white text-gray-800 `}
          >
            Book Your Appointment
          </h2>
          <form onSubmit={submitForm.handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  className={`block font-medium mb-2 text-gray-700 dark:text-gray-700 `}
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  className={`${base} ${
                    submitForm.touched.fullname && submitForm.errors.fullname
                      ? invalid
                      : valid
                  }`}
                  placeholder="Enter your full name"
                  onChange={submitForm.handleChange}
                  onBlur={submitForm.handleBlur}
                />
                {submitForm.touched.fullname && submitForm.errors.fullname && (
                  <p className="mt-1 text-sm text-red-500">
                    {submitForm.errors.fullname}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block font-medium mb-2 text-gray-700 dark:text-gray-700`}
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`${base} ${
                    submitForm.touched.email && submitForm.errors.email
                      ? invalid
                      : valid
                  }`}
                  placeholder="your.email@example.com"
                  onChange={submitForm.handleChange}
                  onBlur={submitForm.handleBlur}
                />

                {submitForm.touched.email && submitForm.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {submitForm.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block font-medium mb-2 dark:text-gray-700 text-gray-700`}
                >
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue=""
                  onChange={submitForm.handleChange}
                  onBlur={submitForm.handleBlur}
                  name="service"
                  className={`${base} ${
                    submitForm.touched.service && submitForm.errors.service
                      ? invalid
                      : valid
                  }`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>

                {submitForm.touched.service && submitForm.errors.service && (
                  <p className="mt-1 text-sm text-red-500">
                    {submitForm.errors.service}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block font-medium mb-2 text-gray-700 dark:text-gray-700`}
                >
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={submitForm.handleChange}
                  onBlur={submitForm.handleBlur}
                  type="date"
                  name="appointmentdate"
                  min={new Date().toISOString().split("T")[0]}
                  className={`${base} ${
                    submitForm.touched.appointmentdate &&
                    submitForm.errors.appointmentdate
                      ? invalid
                      : valid
                  }`}
                />

                {submitForm.touched.appointmentdate &&
                  submitForm.errors.appointmentdate && (
                    <p className="mt-1 text-sm text-red-500">
                      {submitForm.errors.appointmentdate}
                    </p>
                  )}
              </div>

              <div>
                <label
                  className={`block font-medium mb-2 text-gray-700 dark:text-gray-700`}
                >
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue=""
                  onChange={submitForm.handleChange}
                  onBlur={submitForm.handleBlur}
                  name="timeslot"
                  className={`${base} ${
                    submitForm.touched.timeslot && submitForm.errors.timeslot
                      ? invalid
                      : valid
                  }`}
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {submitForm.touched.timeslot && submitForm.errors.timeslot && (
                  <p className="mt-1 text-sm text-red-500">
                    {submitForm.errors.timeslot}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={IsLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {IsLoading ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
