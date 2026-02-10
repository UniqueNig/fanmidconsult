import { useEffect, useState, useMemo } from "react";
import { getAppointments } from "../services/api";
import AdminStatCard from "../components/admin/AdminStatCard";

const AdminHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     📊 CALCULATIONS
  ============================= */

  const today = new Date().toLocaleDateString("en-CA");

  const stats = useMemo(() => {
    let todayBookings = 0;
    let revenue = 0;
    let pending = 0;

    appointments.forEach((a) => {
      // total revenue
      revenue += a.amountPaid || 0;

      // pending
      if (a.paymentStatus === "pending") pending++;

      // today's bookings
      a.bookings?.forEach((b) => {
        if (b.appointmentdate === today) todayBookings++;
      });
    });

    return {
      total: appointments.length,
      today: todayBookings,
      revenue,
      pending,
    };
  }, [appointments, today]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-200 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h2>

      {/* =============================
         ✅ STAT CARDS
      ============================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Appointments"
          value={stats.total}
        />

        <AdminStatCard
          title="Today's Bookings"
          value={stats.today}
        />

        <AdminStatCard
          title="Total Revenue"
          value={`₦${stats.revenue.toLocaleString()}`}
        />

        <AdminStatCard
          title="Pending Payments"
          value={stats.pending}
        />
      </div>
    </div>
  );
};

export default AdminHome;
