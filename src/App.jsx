import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BookAppointment from "./pages/BookAppointment";

const App = () => {
  return (
    <>
      <Routes>
        {/* Wildcard Route */}
        <Route path="*" element={<div>404 Not Found</div>} />

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </>
  );
};

export default App;
