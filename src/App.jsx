import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BookAppointment from "./pages/BookAppointment";
import Success from "./pages/Success";
import AppointmentTable from "./components/admin/AppointmentTable";
import LoginAdmin from "./components/admin/LoginAdmin";
import AdminLayout from "./components/admin/AdminLayout";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminHome from "./pages/AdminHome";

const App = () => {
  let navigate = useNavigate();
  return (
    <>
      <Routes>
        {/* Wildcard Route */}
        <Route
          path="*"
          element={
            <>
              {" "}
              <div className="text-red-600 font-bold mt-5 text-4xl text-center">
                404 Not Found
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white px-6 text-center py-2 rounded-lg hover:bg-blue-700"
                >
                  Back Home
                </button>{" "}
              </div>
            </>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/booking-successfull" element={<Success />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        {/* <Route path="/admin/dashboard" element={<AppointmentTable />} /> */}

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="appointments" element={<AppointmentTable />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
