import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogout, getAppointments } from "../services/api";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ sorting
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getAppointments();

      // ✅ extract only payment info
      const formatted = data.map((a) => ({
        id: a._id,
        fullname: a.fullname,
        amount: a.amountPaid || 0,
        status: a.paymentStatus,
        reference: a.paymentReference,
        createdAt: a.createdAt,
      }));

      setPayments(formatted);
    } catch (err) {
      if (err.response?.status === 401) {
        adminLogout();
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEARCH
  ========================= */
  const filtered = useMemo(() => {
    return payments.filter((p) =>
      `${p.fullname} ${p.reference}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [payments, searchTerm]);

  /* =========================
     SORT
  ========================= */
  const sorted = useMemo(() => {
    const arr = [...filtered];

    arr.sort((a, b) => {
      let A, B;

      if (sortField === "amount") {
        A = a.amount;
        B = b.amount;
      }

      if (sortField === "date") {
        A = new Date(a.createdAt);
        B = new Date(b.createdAt);
      }

      return sortOrder === "asc" ? A - B : B - A;
    });

    return arr;
  }, [filtered, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Payments</h2>

      {/* =========================
         SEARCH
      ========================= */}
      <input
        type="text"
        placeholder="search name or reference..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-72 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:text-white"
      />

      {/* =========================
         TABLE
      ========================= */}
      <div className="hidden md:block w-full overflow-x-auto rounded-xl shadow-md bg-white dark:bg-slate-800">
        <table className="min-w-[1040px] table-auto text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>

              <th
                className="p-3 cursor-pointer text-left"
                onClick={() => handleSort("amount")}
              >
                Amount ↕
              </th>

              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Reference</th>

              <th
                className="p-3 cursor-pointer text-left"
                onClick={() => handleSort("date")}
              >
                Date ↕
              </th>
            </tr>
          </thead>

          <tbody className="dark:text-white">
            {sorted.map((p) => (
              <tr
                key={p.id}
                className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td className="p-3 font-medium">{p.fullname}</td>

                <td className="p-3 font-semibold">
                  ₦{p.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      p.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="p-3 text-xs break-all">{p.reference}</td>

                <td className="p-3 text-xs">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {/* MOBILE CARDS */}
        {sorted.map((item, index) => (
          <div
            key={item._id}
            className="p-4 rounded-xl shadow-md bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
          >
            <span className="font-medium">
              Date: {new Date(item.createdAt).toLocaleDateString()}
            </span>

            <p className="text-sm">
              <strong>Name:</strong> {item.fullname}
            </p>

            <p className="mt-2 text-sm font-semibold">
              Amount: ₦{item.amount.toLocaleString()}
            </p>

            <p className="mt-1 text-sm">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  item.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </p>
            <p className="mt-2 text-sm">Reference: {item.reference}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
