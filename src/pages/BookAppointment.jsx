import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AppointmentForm from "../components/book-appointment/AppointmentForm";

const BookAppointment = () => {
  return (
    <>
     <Navbar/>
     <AppointmentForm/>
     <Footer/>
    </>
  );
};

export default BookAppointment;
