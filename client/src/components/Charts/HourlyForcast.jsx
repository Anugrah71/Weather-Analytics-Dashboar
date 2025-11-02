import React, { useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tickFontSize = isMobile ? 9 : isTablet ? 11 : 12;
  const tickInterval = isMobile ? 3 : isTablet ? 2 : 1;
  const yAxisWidth = isMobile ? 25 : isTablet ? 35 : 40;
  const chartHeight = isMobile ? 220 : isTablet ? 260 : 300;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center text-black">
        <Clock size={18} className="mr-2" />
        24-Hour Forecast
      </h3>

      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              tickFormatter={(t) => t.split(" ")[1]}
              tick={{ fontSize: tickFontSize }}
              interval={tickInterval}
            />

            <YAxis
              yAxisId="left"
              tick={{ fontSize: tickFontSize }}
              width={yAxisWidth}
              domain={[
                (dataMin) => Math.floor(dataMin - 2),
                (dataMax) => Math.ceil(dataMax + 2),
              ]}
              label={{
                value: unit === "fahrenheit" ? "°F" : "°C",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: tickFontSize },
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
                style: { fontSize: tickFontSize },
              }}
            />

            <Tooltip />
            {!isMobile && <Legend />}

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
    </div>
  );
};

export default HourlyForecast;
