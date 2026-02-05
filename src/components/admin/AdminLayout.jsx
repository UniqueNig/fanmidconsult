// src/components/admin/AdminLayout.jsx
import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { adminLogout } from "../../services/api";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout(); // clears token
    navigate("/admin/login"); // redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 shadow-md">
        <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white">
          Admin Panel
        </div>

        <nav className="mt-10">
          <Link
            to="/admin/dashboard"
            className="block py-2.5 px-6 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition mb-2"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/appointments"
            className="block py-2.5 px-6 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition mb-2"
          >
            Appointments
          </Link>
          {/* Add more sidebar links here */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 shadow">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded transition"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Render child routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
