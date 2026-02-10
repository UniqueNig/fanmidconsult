import React from 'react'
import { motion } from "framer-motion";

const AdminStatCard = ({ title, value, subtitle }) => {
  return (
   <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl shadow-md
                 bg-white dark:bg-slate-800
                 border border-gray-100 dark:border-slate-700"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </h3>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </motion.div>
   </>
  )
}

export default AdminStatCard