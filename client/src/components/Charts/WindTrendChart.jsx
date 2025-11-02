import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Wind } from "lucide-react";

const WindTrendChart = ({ forecastdays, unit }) => {
  const data = forecastdays?.forecastday || [];
  const isLoading = !data.length;

  const convertedData = data.map((d) => ({
    date: d.date,
    wind_speed:
      unit === "fahrenheit"
        ? d.day.maxwind_kph * 0.621371
        : d.day.maxwind_kph,
  }));

  return (
    <div className="bg-white rounded-xl p-6 mb-4 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center text-black">
        <Wind size={20} className="mr-2" />
        7-Day Wind Speed Forecast
      </h3>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600 text-sm">Loading wind data...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={convertedData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(d) =>
                new Date(d).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              label={{
                value: unit === "fahrenheit" ? "Wind (mph)" : "Wind (km/h)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="wind_speed"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={unit === "fahrenheit" ? "Wind Speed (mph)" : "Wind Speed (km/h)"}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WindTrendChart;
