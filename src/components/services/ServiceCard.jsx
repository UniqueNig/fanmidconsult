import {
  BriefcaseBusiness,
  CircleDollarSign,
  LaptopMinimal,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = () => {
  const WhyChooseUs = [
    {
      id: 1,
      icon: BriefcaseBusiness,
      title: "Business Strategy",
      description: "Comprehensive business planning and strategy development",
    },
    {
      id: 2,
      icon: CircleDollarSign,
      title: "Financial Planning",
      description: "Expert financial advice and investment strategies",
    },
    {
      id: 3,
      icon: LaptopMinimal,
      title: "IT Consulting",
      description: "Technology solutions and digital transformation",
    },
    {
      id: 4,
      icon: Users,
      title: "HR Consulting",
      description: "Human resources management and talent acquisition",
    },
  ];
  return (
    <>
      <div className="shadow-md px-4 py-8 bg-gray-200 dark:bg-slate-800">
        <div className="flex flex-col my-5 items-center justify-center">
          <h1 className="font-bold text-3xl mt-5  text-black dark:text-white">
            Our Consulting Services
          </h1>
          <p className="text-gray-800 mt-3 dark:text-gray-300">
            Choose a service and book your appointment today
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {WhyChooseUs.map((item) => (
            <div
              key={item.id}
              className="min-h-[170px] bg-white dark:bg-slate-600 text-gray-600 dark:text-gray-300 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 rounded-lg px-6 py-8 md:px-8 md:py-10 text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <item.icon className="text-blue-600" size={35} />
              </div>
              <h3 className="font-semibold text-xl  dark:text-white">
                {item.title}
              </h3>
              <div className="mt-2 flex justify-center">
                <p className="max-w-xs text-center text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
              </div>

              <Link to="/book-appointment" className=" md:block">
                <button className="h-10 min-w-[150px] px-4 py-2 mt-5 bg-blue-600 border text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  Book Appointment
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
