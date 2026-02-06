import { Mail, Phone } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const linkClass = ({ isActive }) =>
    `transition relative block mt-2 ${
      isActive
        ? "text-white dark:text-white after:absolute after:-bottom-1 after:left-0 after:w-15 after:h-0.5 after:bg-white dark:after:bg-white"
        : "text-gray-400 dark:text-gray-300 hover:text-white"
    }`;
  return (
    <>
      <div>
        <footer>
          <div className="shadow-md px-4 bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <div className="flex flex-col my-5 ml-5">
              <h1 className="font-bold text-2xl mt-15  bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FanMid Consult
              </h1>
              <p className="text-gray-400 mt-3 dark:text-gray-300">
                Your trusted partner in business growth and digital
                transformation
              </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-gray-400 dark:text-gray-100">
                <h1 className="font-bold text-white mb-4">Quick Links</h1>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/about-us" className={linkClass}>
                  About Us
                </NavLink>
                <NavLink to="/services" className={linkClass}>
                  Services
                </NavLink>
                <NavLink to="/admin/login" className={linkClass}>
                  Contact
                </NavLink>
              </div>

              <div className="text-gray-400 dark:text-gray-100">
                <h1 className="font-bold text-white">Services</h1>
                <div className="mt-4 text-gray-400 dark:text-gray-300">
                  Consulting
                </div>
                <div className="mt-2 text-gray-400 dark:text-gray-300">
                  Training
                </div>
                <div className="mt-2 text-gray-400 dark:text-gray-300">
                  Support
                </div>
              </div>
              <div className="text-gray-400 dark:text-gray-100">
                <h1 className="font-bold text-white">Contact Info</h1>
                <div className="flex text-center items-center gap-2 mt-4 text-gray-400 dark:text-gray-300">
                  {" "}
                  <Mail className="text-white" size={17} />{" "}
                  Info@fanmidconsult.com
                </div>
                <div className="flex text-center items-center gap-2 mt-2 text-gray-400 dark:text-gray-300">
                  <Phone className="text-white" size={17} /> +234 (813) 487-9924
                </div>
              </div>
              
            </div>
            <div className="border-t border-gray-700 pt-6 text-center text-gray-400 dark:text-gray-300"></div>
            <div className="text-center text-gray-400 dark:text-gray-300 py-4">
              {" "}
              &copy; {new Date().getFullYear()} FanMid Consult. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
