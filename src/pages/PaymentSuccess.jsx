import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { verifyPayment } from "../services/api";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      setMessage("No payment reference found.");
      setLoading(false);
      return;
    }

    // verify payment with backend
    verifyPayment(reference)
      .then((res) => {
        const bookingsList = res.appointment.bookings
          .map((b) => `${b.appointmentdate} at ${b.timeslot}`)
          .join(", ");
        setMessage(`Payment successful 🎉 Appointment(s) booked for ${bookingsList}`);
        setLoading(false);

        // optionally redirect after a few seconds
        setTimeout(() => navigate("/"), 10000);
      })
      .catch(() => {
        setMessage("Payment verification failed. Please contact support.");
        setLoading(false);
      });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-slate-900 px-4">
      {loading ? (
        <div className="flex items-center space-x-2 text-gray-700 dark:text-white">
          <LoaderCircle className="animate-spin" />
          <span>Verifying your payment...</span>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
            🎉 Payment Success
          </h1>
          <p className="text-gray-700 dark:text-gray-200">{message}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
