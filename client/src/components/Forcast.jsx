import React from "react";
import { Calendar } from "lucide-react";

const Forecast = ({ forecastdays, unit }) => {
  if (!forecastdays?.forecastday?.length) {
    return (
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg text-center text-gray-500">
        No forecast data available.
      </div>
    );
  }
  console.log(forecastdays)

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center text-black">
        <Calendar size={20} className="mr-2" />
        7-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecastdays.forecastday.map((day, idx) => (
          <div
            key={idx}
            className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </div>

            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-10 h-10 mx-auto"
            />

            <div className="mt-2 text-xs">
              <div className="font-bold text-gray-800">
                {unit === "fahrenheit" ? day.day.maxtemp_f : day.day.maxtemp_c}°
              </div>
              <div className="text-gray-600">
                {unit === "fahrenheit" ? day.day.mintemp_f : day.day.mintemp_c}°
              </div>
            </div>

            <div className="mt-1 text-[10px] text-gray-500">
              {day.day.condition.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
