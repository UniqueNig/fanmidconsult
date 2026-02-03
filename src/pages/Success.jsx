import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Appointment Booked!
        </h2>

        <p className="text-gray-600 mb-6">
          Your appointment has been submitted successfully.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Services
        </button>
      </div>
    </div>
  );
};

export default Success;
