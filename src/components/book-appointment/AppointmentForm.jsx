import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  createAppointment,
  getBookedSlots,
  initializePayment,
  verifyPayment,
} from "../../services/api";
import { LoaderCircle } from "lucide-react";

const AppointmentForm = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookings, setBookings] = useState([]); // ✅ NEW multiple days
  const pricePerDay = 5000; // ✅ NEW (change your price)

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
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const today = new Date().toLocaleDateString("en-CA");

  // calculate total
  const totalAmount = bookings.length * pricePerDay;

  let submitForm = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      service: "",
      amount: totalAmount, // ✅ NEW
      bookings,
      appointmentdate: "",
      timeslot: "",
    },
    // =========================
    // ✅ NEW PAYSTACK FLOW
    // =========================
    onSubmit: async (values, { resetForm }) => {
      if (bookings.length === 0) {
        setMessage("Please add at least one booking day");
        return;
      }

      try {
        setIsLoading(true);

        // 1️⃣ initialize payment
        const res = await initializePayment({
          fullname: values.fullname,
          email: values.email,
          service: values.service,
          amount: totalAmount,
          bookings, // send all selected days to backend
          callback_url: "https://fanmidconsult.vercel.app/payment/success", // optional
        });

        console.log("Payment initialized:", res);

        // ✅ Redirect user to Paystack checkout page
        if (res.authorization_url) {
          window.location.href = res.authorization_url;
        } else {
          setMessage("Payment initialization failed. Try again.");
        }
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Payment failed");
      } finally {
        setIsLoading(false);
      }
    },

    validationSchema: yup.object({
      fullname: yup.string().required("Name is required").min(3),
      email: yup.string().required("Email is required").email(),
      service: yup.string().required(),
      appointmentdate: yup.string().required(),
      // timeslot: yup.string().required(),
    }),
  });

  // fetch booked slots for selected date
  useEffect(() => {
    if (!submitForm.values.appointmentdate) return;

    getBookedSlots(submitForm.values.appointmentdate)
      .then((data) => {
        const slots = data.map((item) => item.timeslot);
        console.log(slots);
        setBookedSlots(slots);
      })
      .catch(console.log);
  }, [submitForm.values.appointmentdate]);

  // ==========================
  // ✅ NEW VERIFY AFTER PAYMENT
  // ==========================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    if (!reference) return;

    // ✅ call backend verify endpoint via API.js
    verifyPayment(reference)
      .then(() => {
        setSuccess(true);
        setMessage(
          `Payment successful 🎉 Appointment(s) booked for ${res.data.appointment.bookings
            .map((b) => `${b.appointmentdate} at ${b.timeslot}`)
            .join(", ")}`,
        );
        setBookings([]); // clear selected days
        resetForm(); // optional: clear form
        navigate("/"); // redirect to home or success page
      })
      .catch((err) => {
        console.error(err);
        setMessage(
          err.response?.data?.message || "Payment verification failed ❌",
        );
      });
  }, [navigate]);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const reference = params.get("reference");

  //   if (!reference) return; // no payment to verify

  //   const verify = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await API.get(`/payments/verify/${reference}`);

  //       // Payment verified successfully
  //       setSuccess(true);
  //       setMessage(
  //         `Payment successful 🎉 Appointment(s) booked for ${res.data.appointment.bookings
  //           .map((b) => `${b.appointmentdate} at ${b.timeslot}`)
  //           .join(", ")}`,
  //       );

  //       setBookings([]); // clear selected bookings
  //       setTimeout(() => navigate("/"), 5000); // redirect after 5s
  //     } catch (err) {
  //       setSuccess(false);
  //       setMessage(
  //         err.response?.data?.message || "Payment verification failed ❌",
  //       );
  //     } finally {
  //       setIsLoading(false);
  //       // ✅ Remove reference from URL to avoid re-trigger
  //       window.history.replaceState(
  //         {},
  //         document.title,
  //         window.location.pathname,
  //       );
  //     }
  //   };

  //   verify();
  // }, []);

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

        {/* backend message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 p-3 rounded-lg text-sm
        ${
          success
            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
        }`}
            >
              {message}
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
                placeholder="Joe Doe"
                value={submitForm.values.fullname}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.fullname && submitForm.errors.fullname
                    ? invalid
                    : ""
                }`}
              />
              {submitForm.touched.fullname && submitForm.errors.fullname && (
                <p className="mt-1 text-sm text-red-500">
                  {" "}
                  {submitForm.errors.fullname}{" "}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>

              <input
                name="email"
                placeholder="youremail@gmail.com"
                value={submitForm.values.email}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.email && submitForm.errors.email
                    ? invalid
                    : ""
                }`}
              />
              {submitForm.touched.email && submitForm.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {" "}
                  {submitForm.errors.email}{" "}
                </p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="block font-medium mb-2">
                Service <span className="text-red-500">*</span>
              </label>

              <select
                name="service"
                value={submitForm.values.service}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.service && submitForm.errors.service
                    ? invalid
                    : ""
                }`}
              >
                <option value="">Select service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

              {submitForm.touched.service && submitForm.errors.service && (
                <p className="mt-1 text-sm text-red-500">
                  {" "}
                  {submitForm.errors.service}{" "}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium mb-2">
                Appointment Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                min={today}
                name="appointmentdate"
                value={submitForm.values.appointmentdate}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.appointmentdate &&
                  submitForm.errors.appointmentdate
                    ? invalid
                    : ""
                }`}
              />

              {submitForm.touched.appointmentdate &&
                submitForm.errors.appointmentdate && (
                  <p className="mt-1 text-sm text-red-500">
                    {" "}
                    {submitForm.errors.appointmentdate}{" "}
                  </p>
                )}
            </div>

            {/* Time */}
            <div>
              <label className="block font-medium mb-2">
                Time Slot <span className="text-red-500">*</span>
              </label>

              <select
                name="timeslot"
                value={submitForm.values.timeslot}
                onChange={submitForm.handleChange}
                onBlur={submitForm.handleBlur}
                className={`${base} ${
                  submitForm.touched.timeslot && submitForm.errors.timeslot
                    ? invalid
                    : ""
                }`}
              >
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t} disabled={bookedSlots.includes(t)}>
                    {bookedSlots.includes(t)
                      ? `${t} (Booked!!! Pick another Time Slot)`
                      : t}
                  </option>
                ))}
              </select>
              {submitForm.touched.timeslot && submitForm.errors.timeslot && (
                <p className="mt-1 text-sm text-red-500">
                  {" "}
                  {submitForm.errors.timeslot}{" "}
                </p>
              )}
            </div>

            
            {/* ===================== */
            /* ✅ NEW Add day button  */
            /* ===================== */}

            {submitForm.values.appointmentdate &&
              submitForm.values.timeslot && (
                <button
                  type="button"
                  onClick={() => {
                    setBookings((prev) => [
                      ...prev,
                      {
                        appointmentdate: submitForm.values.appointmentdate,
                        timeslot: submitForm.values.timeslot,
                      },
                    ]);

                    submitForm.setFieldValue("timeslot", "");
                  }}
                  className="text-sm font-bold text-blue-800 dark:text-blue-400 underline"
                >
                  + Add this day
                </button>
              )}

            {/* ===================== */
            /* ✅ NEW Selected days   */
            /* ===================== */}

            {bookings.length > 0 && (
              <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg space-y-2">
                <p className="font-medium text-sm">Selected Days:</p>

                {bookings.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {b.appointmentdate} — {b.timeslot}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setBookings(bookings.filter((_, index) => index !== i))
                      }
                      className="text-red-600"
                    >
                      remove
                    </button>
                  </div>
                ))}

                {/* ✅ NEW price */}
                <p className="font-bold mt-2">
                  Total: ₦{bookings.length * pricePerDay}
                </p>
              </div>
            )}

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
              {IsLoading && (
                <LoaderCircle className="animate-spin mr-2 inline-block" />
              )}
              {IsLoading ? "Booking..." : "Book Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AppointmentForm;
