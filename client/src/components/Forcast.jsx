import React from "react";
import { Calendar } from "lucide-react";

const Forecast = ({ forecastdays, unit }) => {
  if (!forecastdays?.forecastday?.length) {
    return (
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg text-center text-gray-600 text-base">
        No forecast data available.
      </div>
    );
  }
  console.log(forecastdays);

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
        <Calendar size={22} className="mr-3 text-blue-600" />
        7-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecastdays.forecastday.map((day, idx) => (
          <div
            key={idx}
            className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm hover:shadow-lg transition duration-200 border border-indigo-200"
          >
            <div className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </div>

            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-12 h-12 sm:w-14 sm:h-14 mx-auto"
            />

            <div className="mt-3">
              <div className="text-lg font-bold text-gray-900">
                {unit === "fahrenheit" ? day.day.maxtemp_f : day.day.maxtemp_c}°
              </div>
              <div className="text-sm text-gray-700">
                {unit === "fahrenheit" ? day.day.mintemp_f : day.day.mintemp_c}°
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-700 font-medium">
              {day.day.condition.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
