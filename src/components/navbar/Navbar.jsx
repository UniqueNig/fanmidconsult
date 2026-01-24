import React, { useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-medium transition relative ${
      isActive
        ? "text-blue-600 dark:text-blue-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
    }`;

  return (
    <nav className="shadow-md sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="ml-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ConsultPro
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-7 items-center">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about-us" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex gap-3 items-center">
            <button
              className="shadow w-7 h-7 flex items-center justify-center border rounded-md text-gray-700 dark:text-white dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition
"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="bg-yellow-950" size={18} /> : <Moon size={18} />}
            </button>

            <Link to="/book-appointment" className="hidden md:block">
              <button className="h-10 min-w-[190px] px-4 py-2 bg-blue-600 border text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                Book Appointment
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700">
          <div className="flex flex-col gap-4 px-6 py-4">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

            <Link to="/book-appointment" onClick={() => setOpen(false)}>
              <button className="border h-10 mb-4 w-full ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
