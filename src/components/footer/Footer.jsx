import React from "react";

const Footer = () => {
  return (
    <>
      <div>
        <footer>
          <div className="shadow-md px-4 h-100 bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <div className="flex flex-col my-5">
              <h1 className="font-bold text-2xl mt-15  bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FanMid Consult
              </h1>
              <p className="text-gray-400 mt-3 dark:text-gray-300">
                Your trusted partner in business growth and digital
                transformation
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-gray-400 dark:text-gray-100">23</div>
              <div className="text-gray-400 dark:text-gray-100">23</div>
              <div className="text-gray-400 dark:text-gray-100">23</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
