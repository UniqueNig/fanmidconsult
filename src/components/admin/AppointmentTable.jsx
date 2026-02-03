import { useEffect, useState } from "react";
import { getAppointments } from "../../services/api";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Email</th>
          <th>Service</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {appointments.map((item, index) => (
          <tr key={index} className="border-t">
            <td>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{item.service}</td>
            <td>{item.appointmentdate}</td>
            <td>{item.timeslot}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
