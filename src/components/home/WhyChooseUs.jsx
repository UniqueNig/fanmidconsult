import {
  Headset,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import React from "react";

const WhyChooseUs = () => {
  const WhyChooseUs = [
    {
      id: 1,
      icon: Users,
      title: "Expert Team",
      description: "Work with experienced professionals in every field.",
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Proven Results",
      description: "We deliver measurable growth and real impact.",
    },
    {
      id: 3,
      icon: HeartHandshake,
      title: "Client Focused",
      description: "Your goals are our priority from day one.",
    },
    {
      id: 4,
      icon: Wrench,
      title: "Innovative Tools",
      description: "We use modern tools to keep you ahead.",
    },
    {
      id: 5,
      icon: ShieldCheck,
      title: "Secure Process",
      description: "Your data and workflows stay protected.",
    },
    {
      id: 6,
      icon: Headset,
      title: "24/7 Support",
      description: "Help is always available when you need it.",
    },
  ];
  return (
    <>
      <div className="mx-auto px-4 bg-gray-100 dark:bg-slate-800 py-10">
        {/* Heading */}
        <div className="flex justify-center items-center mt-7">
          <h1 className="font-bold text-3xl text-center dark:text-white">Why Choose Us</h1>
        </div>
        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cards */}
          {WhyChooseUs.map((item) => (
            <div
              key={item.id}
              className="min-h-[150px] bg-white dark:bg-slate-600 text-gray-600 dark:text-gray-300 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 rounded-lg px-6 py-8 md:px-8 md:py-10 text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <item.icon className="text-blue-600" size={35} />
              </div>
              <h3 className="font-semibold text-xl  dark:text-white">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
