import React from "react";

const HomeHero = () => {
  return (
    <>
      <div
       className="mx-auto min-h-[410px] px-4 bg-blue-700 shadow-md h-80 flex flex-col items-center justify-center pt-10 gap-0 md:gap-7"
      >
        <h1 className="text-5xl font-bold text-center text-white">
          Transform Your Business Today
        </h1>

        <p className="text-center text-lg text-white/90 md:mb-2">
          Expert consulting services to help your business thrive in the digital
          age
        </p>

        <button className="w-40 h-13 bg-white text-blue-700 font-bold py-2 px-6 rounded hover:bg-blue-100 transition md:mb-2 duration-300">
          Get Started
        </button>
      </div>
    </>
  );
};

export default HomeHero;
