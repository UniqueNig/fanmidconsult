import { useEffect, useState, useMemo } from "react";
import { getAppointments, adminLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        adminLogout();
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ✅ FILTER (date + time)
  ========================== */
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) =>
      `${item.appointmentdate} ${item.timeslot} ${item.fullname} ${item.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [appointments, searchTerm]);

  /* =========================
     ✅ PAGINATION
  ========================== */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div
      className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6
"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Appointments
      </h2>

      {/* =========================
         ✅ SEARCH BAR (NEW)
      ========================== */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, date or time..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-72 px-3 py-2 border rounded-lg 
                     bg-white dark:bg-slate-800 dark:border-slate-600"
        />
      </div>

      <p className="font-bold mb-3">
        Total Revenue: ₦
        {appointments.reduce((a, b) => a + (b.amount || 0), 0).toLocaleString()}
      </p>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No appointments yet</p>
      ) : (
        <>
          <div className="w-full overflow-x-auto rounded-xl shadow-md bg-white dark:bg-slate-800">
            <table className="min-w-[700px] w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3">S/N</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Created</th>
                </tr>
              </thead>

              <tbody className="bg-white dark:text-white dark:bg-slate-800">
                {currentItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  >
                    <td className="p-3 font-medium">
                      {indexOfFirst + index + 1}
                    </td>

                    <td className="p-3">{item.fullname}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.service}</td>
                    <td className="p-3 text-xs">
                      {item.bookings?.map((b, i) => (
                        <div key={i}>{b.appointmentdate}</div>
                      ))}
                    </td>

                    <td className="p-3 text-xs">
                      {item.bookings?.map((b, i) => (
                        <div key={i}>{b.timeslot}</div>
                      ))}
                    </td>

                    {/* ✅ NEW */}
                    <td className="p-3 font-semibold">
                      ₦{item.amount?.toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold
            ${
              item.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : item.paymentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>

                    <td className="p-3 text-xs break-all">
                      {item.paymentReference}
                    </td>

                    <td className="p-3 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
             ✅ PAGINATION BUTTONS
          ========================== */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentTable;
