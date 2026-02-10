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
    const now = new Date();

    let todayBookings = 0;
    let revenue = 0;
    let pending = 0;

    // ✅ NEW
    let weeklyRevenue = 0;
    let monthlyRevenue = 0;
    let yearlyRevenue = 0;

    const upcomingToday = [];

    appointments.forEach((a) => {
      const created = new Date(a.createdAt);
      const amount = a.amountPaid || 0;

      // ---------- existing ----------
      revenue += amount;
      if (a.paymentStatus === "pending") pending++;

      // ---------- weekly ----------
      const diffDays =
        (now - created) / (1000 * 60 * 60 * 24);

      if (diffDays <= 7) weeklyRevenue += amount;

      // ---------- monthly ----------
      if (
        created.getFullYear() === now.getFullYear() &&
        created.getMonth() === now.getMonth()
      ) {
        monthlyRevenue += amount;
      }

      // ---------- yearly ----------
      if (created.getFullYear() === now.getFullYear()) {
        yearlyRevenue += amount;
      }

      // ---------- today bookings ----------
      a.bookings?.forEach((b) => {
        if (b.appointmentdate === today) {
          todayBookings++;

          upcomingToday.push({
            fullname: a.fullname,
            timeslot: b.timeslot,
          });
        }
      });
    });

    return {
      total: appointments.length,
      today: todayBookings,
      revenue,
      pending,
      weeklyRevenue,
      monthlyRevenue,
      yearlyRevenue,
      upcomingToday: upcomingToday.sort((a, b) =>
        a.timeslot.localeCompare(b.timeslot)
      ),
    };
  }, [appointments, today]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-200 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h2>

      {/* =============================
         ✅ ORIGINAL CARDS (unchanged)
      ============================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminStatCard title="Total Appointments" value={stats.total} />

        <AdminStatCard title="Today's Bookings" value={stats.today} />

        <AdminStatCard
          title="Total Revenue"
          value={`₦${stats.revenue.toLocaleString()}`}
        />

        <AdminStatCard title="Pending Payments" value={stats.pending} />
      </div>

      {/* =============================
         ✅ NEW REVENUE CARDS
      ============================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminStatCard
          title="This Week Revenue"
          value={`₦${stats.weeklyRevenue.toLocaleString()}`}
        />

        <AdminStatCard
          title="This Month Revenue"
          value={`₦${stats.monthlyRevenue.toLocaleString()}`}
        />

        <AdminStatCard
          title="This Year Revenue"
          value={`₦${stats.yearlyRevenue.toLocaleString()}`}
        />
      </div>

      {/* =============================
         ✅ TODAY UPCOMING LIST
      ============================= */}
      <div className="rounded-2xl shadow-md bg-white dark:bg-slate-800 p-5">
        <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
          Today's Upcoming Appointments
        </h3>

        {stats.upcomingToday.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-200">No appointments today 🎉</p>
        ) : (
          <div className="space-y-2 text-sm">
            {stats.upcomingToday.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2 last:border-none"
              >
                <span className="font-medium dark:text-white">{item.fullname}</span>
                <span className="text-gray-600 dark:text-white">{item.timeslot}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
