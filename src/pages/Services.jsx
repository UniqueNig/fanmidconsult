import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ServiceCard from "../components/services/ServiceCard";

const Services = () => {
  return (
    <>
      <Navbar />
      <ServiceCard />
      <div>Services</div>
      <Footer />
    </>
  );
};

export default Services;
