import React from "react";
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
  const convertedData = historyData.map((d) => ({
    date: d.date,
    max: tempUnits(d.max, unit),
    min: tempUnits(d.min, unit),
  }));
const isLoading = !historyData || historyData.length === 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      
      <h3 className="text-xl font-bold mb-4 flex items-center text-black">
        <TrendingUp size={20} className="mr-2" />
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
  <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 220 : 300}>
    <BarChart
      data={convertedData}
      margin={{
        top: 10,
        right: window.innerWidth < 640 ? 5 : 20,
        left: window.innerWidth < 640 ? 5 : 20,
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
        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
      />
      <YAxis
        label={{
          value: unit === "celsius" ? "°C" : "°F",
          angle: -90,
          position: "insideLeft",
        }}
        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="max"
        fill="#f59e0b"
        name={`Max Temp (${unit === "celsius" ? "°C" : "°F"})`}
      />
      <Bar
        dataKey="min"
        fill="#3b82f6"
        name={`Min Temp (${unit === "celsius" ? "°C" : "°F"})`}
      />
    </BarChart>
  </ResponsiveContainer>
)}
    </div>
  );
};

export default TempTrendChart;
