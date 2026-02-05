import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { adminLogin } from "../../services/api";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      setError("");

      adminLogin(values)
        .then((res) => {
            console.log(res);
          // save token
          localStorage.setItem("token", res.token);

          navigate("/admin/dashboard"); // dashboard
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Login failed");
        })
        .finally(() => setLoading(false));
    },
  });

  const inputBase =
    "w-full px-4 py-2 rounded-lg border outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Admin Login
        </h2>

        {/* error message */}
        {error && (
          <div className="mb-4 text-sm p-3 rounded bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`${inputBase} border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white`}
              placeholder="admin@email.com"
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`${inputBase} border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white`}
              placeholder="••••••••"
            />

            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;
