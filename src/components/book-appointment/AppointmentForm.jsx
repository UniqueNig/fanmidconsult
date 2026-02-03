import React from "react";

const AppointmentForm = () => {
    const services = [
    { id: 1, name: "General Consultation" },
    { id: 2, name: "Specialist Consultation" },
    { id: 3, name: "Follow-up Appointment" },
    { id: 4, name: "Telehealth Consultation" },
  ];

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
  ]
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentView("services")}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Back to Services
        </button>

        <div className="dark:text-white text-gray-800 rounded-lg shadow-md p-8">
          <h2
            className={`text-3xl font-bold mb-6 dark:text-white text-gray-800 `}
          >
            Book Your Appointment
          </h2>

          <div className="space-y-6">
            <div>
              <label
                className={`block font-medium mb-2 text-gray-700 dark:text-gray-300 `}
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 border-gray-600 text-white`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className={`block font-medium mb-2 text-gray-700 dark:text-gray-300`}
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-2 border bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                className={`block font-medium mb-2 dark:text-gray-300 text-gray-700`}
              >
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block font-medium mb-2 text-gray-700 dark:text-gray-300`}
              >
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
            </div>

            <div>
              <label
                className={`block font-medium mb-2 text-gray-700 dark:text-gray-300`}
              >
                Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                name="time"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
