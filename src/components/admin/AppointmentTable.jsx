import { useEffect, useState } from "react";
import { getAppointments, adminLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments(); // already res.data
      setAppointments(data);
    } catch (err) {
      console.log(err);
      // if token expired or unauthorized, redirect to login
      if (err.response?.status === 401) {
        adminLogout();
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No appointments yet</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-800">
              {appointments.map((item) => (
                <tr
                  key={item._id}
                  className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="p-3">{item.fullname}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.service}</td>
                  <td className="p-3">{item.appointmentdate}</td>
                  <td className="p-3">{item.timeslot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
