import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { tempUnits } from "../../utils/tempUtils";

const TempTrendChart = ({ historyData, unit }) => {
  const isLoading = !historyData || historyData.length === 0;

  const convertedData =
    historyData?.map((d) => ({
      date: d.date,
      max: tempUnits(d.max, unit),
      min: tempUnits(d.min, unit),
    })) || [];

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
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center text-black">
        <TrendingUp size={18} className="mr-2" />
        Historical Temperature Trends
      </h3>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600 text-sm">Loading temperature trends...</p>
        </div>
      ) : convertedData.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No historical data available.
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={convertedData}
              margin={{
                top: 10,
                right: marginX,
                left: marginX,
                bottom: 5,
              }}
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
                  value: unit === "celsius" ? "°C" : "°F",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: tickFontSize },
                }}
                tick={{ fontSize: tickFontSize }}
              />

              <Tooltip />
              {!isMobile && <Legend />}

              <Bar
                dataKey="max"
                fill="#f59e0b"
                name={`Max Temp (${unit === "celsius" ? "°C" : "°F"})`}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="min"
                fill="#3b82f6"
                name={`Min Temp (${unit === "celsius" ? "°C" : "°F"})`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TempTrendChart;
