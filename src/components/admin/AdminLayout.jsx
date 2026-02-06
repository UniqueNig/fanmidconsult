// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { adminLogout } from "../../services/api";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  // ✅ NEW (sidebar toggle)
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* =========================
         Sidebar
      ========================== */}

      {/* overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          w-64 min-h-screen
          bg-white dark:bg-slate-800 shadow-md
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white flex justify-between items-center">
          Admin Panel

          {/* close icon on mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mt-10 dark:text-white">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-6 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition mb-2"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/appointments"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-6 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition mb-2"
          >
            Appointments
          </Link>
        </nav>
      </aside>

      {/* =========================
         Main content
      ========================== */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 shadow">
          <div className="flex items-center gap-3">
            {/* hamburger (mobile only) */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded transition"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
