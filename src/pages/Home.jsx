import React from "react";
import Navbar from "../components/navbar/Navbar";
import HomeHero from "../components/home/HomeHero";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <>
    <Navbar/>
    <HomeHero/>
    <WhyChooseUs/>
      <div>This is home page</div>
      <Footer/>
    </>
  );
};

export default Home;
