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
import { Clock } from "lucide-react";

const HourlyForecast = ({ forecastdays, unit }) => {
  const hourlyData = forecastdays?.forecastday?.[0]?.hour || [];

  if (!hourlyData.length) {
    return (
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg text-center text-gray-500">
        No hourly data available
      </div>
    );
  }

  const processedData = hourlyData.map((hour) => ({
    ...hour,
    displayTemp:
      unit === "fahrenheit" ? (hour.temp_c * 9) / 5 + 32 : hour.temp_c,
  }));

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center text-black">
        <Clock size={20} className="mr-2" />
        24-Hour Forecast
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(t) => t.split(" ")[1]}
            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            interval={window.innerWidth < 640 ? 3 : 1}
          />

          <YAxis
            yAxisId="left"
            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            width={window.innerWidth < 640 ? 30 : 40}
            domain={[
              (dataMin) => Math.floor(dataMin - 2),
              (dataMax) => Math.ceil(dataMax + 2),
            ]}
            label={{
              value: unit === "fahrenheit" ? "°F" : "°C",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            label={{
              value: "% Rain",
              angle: -90,
              position: "insideRight",
            }}
          />

          <Tooltip />
          <Legend />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="displayTemp"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 2 }}
            name={`Temperature (°${unit === "fahrenheit" ? "F" : "C"})`}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="chance_of_rain"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 2 }}
            name="Precipitation (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyForecast;
