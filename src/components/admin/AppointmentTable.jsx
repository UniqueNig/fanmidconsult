import { useEffect, useState, useMemo } from "react";
import { getAppointments, adminLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.log(data);
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

  // =========================
  // ✅ FILTER (search across fullname, email, service, bookings)
  // =========================
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const bookingsStr =
        item.bookings
          ?.map((b) => `${b.appointmentdate} ${b.timeslot}`)
          .join(" ") || "";

      return `${item.fullname} ${item.email} ${item.service} ${bookingsStr}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [appointments, searchTerm]);

  // =========================
  // ✅ PAGINATION
  // =========================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-100 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
<div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
    Appointments
  </h2>

  {/* SEARCH BAR */}
  <div className="mb-4">
    <input
      type="text"
      placeholder="name, email, service, date or time..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full md:w-72 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-600"
    />
  </div>

  {/* TOTAL REVENUE */}
  <p className="font-bold mb-3">
    Total Revenue: ₦
    {appointments.reduce((a, b) => a + (b.amountPaid || 0), 0).toLocaleString()}
  </p>

  {filteredAppointments.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">No appointments yet</p>
  ) : (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block w-full overflow-x-auto rounded-xl shadow-md bg-white dark:bg-slate-800">
        <table className="min-w-[900px] table-auto text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 w-6">S/N</th>
              <th className="p-3 w-25">Name</th>
              <th className="p-3 w-50">Email</th>
              <th className="p-3 w-25">Service</th>
              <th className="p-3 w-60 text-center" colSpan={3}>Date & Time</th>
              <th className="p-3 w-20">Amount</th>
              <th className="p-3 w-15">Status</th>
              <th className="p-3 w-35">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:text-white dark:bg-slate-800">
            {currentItems.map((item, index) => (
              <tr
                key={item._id}
                className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                <td className="p-3 font-medium">{indexOfFirst + index + 1}</td>
                <td className="p-3">{item.fullname}</td>
                <td className="p-3 text-center">{item.email}</td>
                <td className="p-3 text-center">{item.service}</td>
                <td className="p-5 text-xs text-center" colSpan={3}>
                  {item.bookings?.map((b, i) => (
                    <div key={i}>{b.appointmentdate} at {b.timeslot}</div>
                  ))}
                </td>
                <td className="p-3 font-semibold">₦{item.amountPaid?.toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      item.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : item.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-xs text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {currentItems.map((item, index) => (
          <div
            key={item._id}
            className="p-4 rounded-xl shadow-md bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">S/N: {indexOfFirst + index + 1}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm"><strong>Name:</strong> {item.fullname}</p>
            <p className="text-sm"><strong>Email:</strong> {item.email}</p>
            <p className="text-sm"><strong>Service:</strong> {item.service}</p>

            <div className="mt-2">
              <strong>Date & Time:</strong>
              <ul className="list-disc list-inside text-sm">
                {item.bookings?.map((b, i) => (
                  <li key={i}>{b.appointmentdate} at {b.timeslot}</li>
                ))}
              </ul>
            </div>

            <p className="mt-2 text-sm font-semibold">
              Amount: ₦{item.amountPaid?.toLocaleString()}
            </p>

            <p className="mt-1 text-sm">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  item.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : item.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.paymentStatus}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
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
