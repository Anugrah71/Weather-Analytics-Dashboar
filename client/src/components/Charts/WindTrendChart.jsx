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
import { Wind } from "lucide-react";

const WindTrendChart = ({ forecastdays, unit }) => {
  const data = forecastdays?.forecastday || [];
  const isLoading = !data.length;

  const convertedData = data.map((d) => ({
    date: d.date,
    wind_speed:
      unit === "fahrenheit" ? d.day.maxwind_kph * 0.621371 : d.day.maxwind_kph,
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

  const chartHeight = isMobile ? 220 : isTablet ? 260 : 300;
  const tickFontSize = isMobile ? 9 : isTablet ? 11 : 12;
  const marginX = isMobile ? 5 : isTablet ? 15 : 25;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center text-black">
        <Wind size={18} className="mr-2" />
        7-Day Wind Speed Forecast
      </h3>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600 text-sm">Loading wind data...</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={convertedData}
              margin={{ top: 10, right: marginX, left: marginX, bottom: 10 }}
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
                tick={{ fontSize: tickFontSize }}
              />
              <YAxis
                label={{
                  value: unit === "fahrenheit" ? "Wind (mph)" : "Wind (km/h)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: tickFontSize },
                }}
                tick={{ fontSize: tickFontSize }}
              />
              <Tooltip />
              {!isMobile && <Legend />}

              <Line
                type="monotone"
                dataKey="wind_speed"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name={
                  unit === "fahrenheit"
                    ? "Wind Speed (mph)"
                    : "Wind Speed (km/h)"
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WindTrendChart;
